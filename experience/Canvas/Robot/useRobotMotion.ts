"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, type RefObject } from "react";
import type * as THREE from "three";
import { prefersReducedMotion } from "@/lib/quality";
import { soundEngine } from "@/experience/sound/engine";
import { useRobotStore } from "@/store/useRobotStore";
import { useScrollStore } from "@/store/useScrollStore";
import type { RobotMaterials } from "./materials";

interface ExplodeRefs {
  armL: RefObject<THREE.Group | null>;
  armR: RefObject<THREE.Group | null>;
  legL: RefObject<THREE.Group | null>;
  legR: RefObject<THREE.Group | null>;
  chestPanel: RefObject<THREE.Mesh | null>;
  spine: RefObject<THREE.Mesh | null>;
}

interface MotionRefs {
  rootRef: RefObject<THREE.Group | null>;
  torsoRef: RefObject<THREE.Group | null>;
  headRef: RefObject<THREE.Group | null>;
  scanRef: RefObject<THREE.Mesh | null>;
  materials: RobotMaterials;
  explodeRefs: ExplodeRefs;
}

/* ---------- boot timeline (seconds from bootStartedAt) ---------- */
const BOOT = {
  ledBlinkEnd: 0.7, //  0.0–0.7  darkness, chest LED blinks alone
  eyesOn: [0.7, 1.2], //          visor + LEDs ramp on
  calibration: [1.4, 2.6], //     head sweep, servo test
  complete: 2.8,
} as const;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (v: number) => v * v * (3 - 2 * v); // smoothstep

/** Phase ramp helper: 0→1 across [start, end]. */
const ramp = (t: number, [start, end]: readonly [number, number]) =>
  smooth(clamp01((t - start) / (end - start)));

/* ---------- idle constants ---------- */
const BREATH_SPEED = 1.45; // ~4.3 s cycle — hydraulic compensation
const BREATH_AMPLITUDE = 0.004;
const HEAD_TRACK_LERP = 0.045; // lag = weight
const HEAD_YAW_LIMIT = 0.38;
const HEAD_PITCH_LIMIT = 0.18;
const DRAG_FOLLOW = 0.07; // resistance while dragging
const DRAG_SETTLE = 0.02; // slow self-centering — 380 kg on a stand
const SCAN_PERIOD = 20; // diagnostic sweep every ~20 s
const SCAN_DURATION = 1.4;

/**
 * The robot's entire behavior: boot power-on, hydraulic breathing,
 * cursor head-tracking, servo micro-twitches, periodic diagnostic
 * scan, weighted drag. One useFrame, refs only — zero React renders.
 */
export function useRobotMotion({
  rootRef,
  torsoRef,
  headRef,
  scanRef,
  materials,
  explodeRefs,
}: MotionRefs) {
  const reduced = useRef<boolean | null>(null);
  const twitch = useRef({ nextAt: 3.5, value: 0, target: 0 });

  useFrame((state) => {
    if (reduced.current === null) reduced.current = prefersReducedMotion();

    const root = rootRef.current;
    const torso = torsoRef.current;
    const head = headRef.current;
    if (!root || !torso || !head) return;

    // Canvas hidden by choreography — skip all motion work.
    if (useScrollStore.getState().canvasOpacity === 0) return;

    const store = useRobotStore.getState();
    const now = performance.now();
    const t = state.clock.elapsedTime;

    /* ================= BOOT ================= */
    if (!reduced.current && store.bootStartedAt !== null) {
      const bt = (now - store.bootStartedAt) / 1000;

      // Chest LED: lone blink in the void, then solid.
      const blinking = bt < BOOT.ledBlinkEnd;
      const chestPulse = blinking ? (Math.sin(bt * 14) > 0 ? 1 : 0.05) : 1;

      // Eyes/LEDs ramp.
      const eyes = ramp(bt, BOOT.eyesOn);
      materials.visor.emissiveIntensity = eyes * 1.7;
      materials.led.emissiveIntensity =
        Math.max(chestPulse * 0.9, eyes * 1.3);

      // Calibration: head yaw sweep left → right → center + torso micro.
      const cal = ramp(bt, BOOT.calibration);
      if (cal > 0 && cal < 1) {
        head.rotation.y = Math.sin(cal * Math.PI * 2) * 0.3 * (1 - cal);
        torso.rotation.z = Math.sin(cal * Math.PI * 3) * 0.012 * (1 - cal);
      }

      if (bt >= BOOT.complete && store.phase === "BOOTING") {
        store.setOnline();
      }
      if (store.phase === "BOOTING") return; // idle starts when online
    } else if (reduced.current) {
      // Reduced motion: dignified final state, no choreography.
      materials.visor.emissiveIntensity = 1.7;
      materials.led.emissiveIntensity = 1.3;
      if (store.phase === "BOOTING") store.setOnline();
      return;
    }

    /* ================= IDLE (ONLINE) ================= */

    // Hydraulic breathing — micro vertical compensation.
    root.position.y = Math.sin(t * BREATH_SPEED) * BREATH_AMPLITUDE;
    torso.rotation.x = Math.sin(t * BREATH_SPEED + 0.6) * 0.0035;

    // Servo micro-twitches: irregular corrective impulses.
    const tw = twitch.current;
    if (t > tw.nextAt) {
      tw.target = (Math.random() - 0.5) * 0.02;
      tw.nextAt = t + 3.5 + Math.random() * 5;
      soundEngine.servo();
    }
    tw.value += (tw.target - tw.value) * 0.04;
    tw.target *= 0.96; // settle back
    torso.rotation.y = tw.value;

    // Head tracking: follows cursor with lag and clamped arc.
    const yawTarget = store.cursor.x * HEAD_YAW_LIMIT;
    const pitchTarget = -store.cursor.y * HEAD_PITCH_LIMIT;
    head.rotation.y += (yawTarget - head.rotation.y) * HEAD_TRACK_LERP;
    head.rotation.x += (pitchTarget - head.rotation.x) * HEAD_TRACK_LERP;

    /* ================= EXPLODED VIEW (SEC.05) ================= */
    // Scroll-scrubbed part separation. Deterministic: base + offset.
    const e = useScrollStore.getState().explode;
    head.position.y = 1.675 + e * 0.3;
    const { armL, armR, legL, legR, chestPanel, spine } = explodeRefs;
    if (armL.current) armL.current.position.x = -e * 0.34;
    if (armR.current) armR.current.position.x = e * 0.34;
    if (legL.current) {
      legL.current.position.x = -e * 0.13;
      legL.current.position.y = -e * 0.16;
    }
    if (legR.current) {
      legR.current.position.x = e * 0.13;
      legR.current.position.y = -e * 0.16;
    }
    if (chestPanel.current) chestPanel.current.position.z = 0.115 + e * 0.34;
    if (spine.current) spine.current.position.z = -0.1 - e * 0.26;

    // Eye focus: subtle aperture flicker.
    materials.visor.emissiveIntensity =
      1.7 + Math.sin(t * 0.7) * 0.12 + Math.sin(t * 7.3) * 0.04;

    // Weighted drag: resists, then slowly self-centers.
    const followRate = store.dragging ? DRAG_FOLLOW : DRAG_SETTLE;
    const rotationTarget = store.dragging ? store.dragTarget : 0;
    root.rotation.y += (rotationTarget - root.rotation.y) * followRate;
    if (!store.dragging && Math.abs(store.dragTarget) > 0.001) {
      store.setDragTarget(store.dragTarget * 0.98);
    }

    /* ================= DIAGNOSTIC SCAN ================= */
    const scan = scanRef.current;
    if (scan) {
      const cyclePos = t % SCAN_PERIOD;
      if (cyclePos < SCAN_DURATION) {
        const p = cyclePos / SCAN_DURATION;
        scan.visible = true;
        scan.position.y = 1.95 - p * 2.0; // head → platform
        const mat = scan.material as THREE.MeshBasicMaterial;
        mat.opacity = Math.sin(p * Math.PI) * 0.5;
      } else if (scan.visible) {
        scan.visible = false;
      }
    }
  });
}

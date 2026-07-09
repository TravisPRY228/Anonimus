"use client";

import { Environment, Lightformer } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";
import { prefersReducedMotion } from "@/lib/quality";
import { useRobotStore } from "@/store/useRobotStore";

/**
 * Cinematic studio setup, boot-aware:
 * — hard key light (high side) that "switches on" mid-boot
 * — minimal cold fill so blacks stay black
 * — signal-green rim from behind — the only color in the frame
 * — generated environment (Lightformers) for metal reflections;
 *   zero network dependency, tiny res.
 */

const KEY_ON = [1.0, 1.8] as const; // boot seconds
const KEY_INTENSITY = 22;
const FILL_INTENSITY = 0.35;
const RIM_INTENSITY = 2.0;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (v: number) => v * v * (3 - 2 * v);

export function Lighting() {
  const keyRef = useRef<THREE.SpotLight>(null);
  const rimRef = useRef<THREE.SpotLight>(null);
  const reduced = useRef<boolean | null>(null);

  useFrame(() => {
    if (reduced.current === null) reduced.current = prefersReducedMotion();
    const key = keyRef.current;
    const rim = rimRef.current;
    if (!key || !rim) return;

    if (reduced.current) {
      key.intensity = KEY_INTENSITY;
      rim.intensity = RIM_INTENSITY;
      return;
    }

    const { bootStartedAt } = useRobotStore.getState();
    if (bootStartedAt === null) {
      key.intensity = 0;
      rim.intensity = 0;
      return;
    }

    const bt = (performance.now() - bootStartedAt) / 1000;
    const p = smooth(clamp01((bt - KEY_ON[0]) / (KEY_ON[1] - KEY_ON[0])));

    // Slight flicker at onset — a work lamp being switched on.
    const flicker =
      p > 0 && p < 0.35 ? (Math.sin(bt * 47) > -0.2 ? 1 : 0.55) : 1;

    key.intensity = KEY_INTENSITY * p * flicker;
    rim.intensity = RIM_INTENSITY * p;
  });

  return (
    <>
      {/* hard key — high side, deep shadows */}
      <spotLight
        ref={keyRef}
        position={[3.2, 3.6, 2.2]}
        angle={0.5}
        penumbra={0.4}
        intensity={0}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0002}
      />
      {/* minimal cold fill */}
      <ambientLight intensity={FILL_INTENSITY} color="#8a95a3" />
      {/* signal-green rim — the only color */}
      <spotLight
        ref={rimRef}
        position={[-2.6, 1.8, -2.8]}
        angle={0.6}
        penumbra={0.6}
        intensity={0}
        color="#00ff66"
      />
      {/* reflection environment — generated, no network */}
      <Environment resolution={256} frames={1}>
        <Lightformer
          form="rect"
          intensity={2.2}
          position={[0, 4, 2]}
          scale={[6, 3, 1]}
          color="#dfe3e8"
        />
        <Lightformer
          form="rect"
          intensity={0.4}
          position={[-4, 1.5, -1]}
          rotation-y={Math.PI / 2}
          scale={[4, 2, 1]}
          color="#5a6570"
        />
        <Lightformer
          form="rect"
          intensity={0.25}
          position={[-2.5, 1.6, -2.6]}
          scale={[2, 1.2, 1]}
          color="#00ff66"
        />
      </Environment>
    </>
  );
}

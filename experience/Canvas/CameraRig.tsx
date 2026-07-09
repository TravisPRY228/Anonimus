"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { prefersReducedMotion } from "@/lib/quality";
import { useRobotStore } from "@/store/useRobotStore";
import { useScrollStore } from "@/store/useScrollStore";

/**
 * Inspection-arm camera.
 * The Choreographer interpolates the dock rail into the scroll store;
 * this rig applies it with heavy damping, layers the idle drift and
 * cursor parallax on top, and plays the boot pull-in once.
 */

/** Boot start: tight and low, as if the rig is still waking. */
const BOOT_POSITION = new THREE.Vector3(1.1, 0.85, 3.0);

const DRIFT_AMPLITUDE = 0.035;
const PARALLAX = 0.09;
const BOOT_CAMERA_SECONDS = 3.2;
const DAMPING = 0.055;

export function CameraRig() {
  const camera = useThree((s) => s.camera);
  const lookTarget = useRef(new THREE.Vector3(0.28, 1.0, 0));
  const reduced = useRef<boolean | null>(null);

  useFrame((state) => {
    if (reduced.current === null) reduced.current = prefersReducedMotion();

    const robot = useRobotStore.getState();
    const { pose, canvasOpacity } = useScrollStore.getState();
    const t = state.clock.elapsedTime;

    // Canvas hidden by choreography — skip camera work.
    if (canvasOpacity === 0) return;

    if (reduced.current) {
      camera.position.set(...pose.position);
      camera.lookAt(...pose.target);
      return;
    }

    // Boot pull: tight/low → dock, servo-eased. One-time overlay.
    let bootBlend = 1;
    if (robot.bootStartedAt !== null) {
      const bt = (performance.now() - robot.bootStartedAt) / 1000;
      const p = Math.min(1, bt / BOOT_CAMERA_SECONDS);
      bootBlend = p * p * (3 - 2 * p);
    }

    // Idle drift: micro-corrections of the inspection rig.
    const driftX = Math.sin(t * 0.11) * DRIFT_AMPLITUDE;
    const driftY = Math.cos(t * 0.07) * DRIFT_AMPLITUDE * 0.6;

    // Cursor parallax, damped.
    const px = robot.cursor.x * PARALLAX;
    const py = robot.cursor.y * PARALLAX * 0.5;

    const targetX =
      THREE.MathUtils.lerp(BOOT_POSITION.x, pose.position[0], bootBlend) +
      driftX +
      px;
    const targetY =
      THREE.MathUtils.lerp(BOOT_POSITION.y, pose.position[1], bootBlend) +
      driftY -
      py;
    const targetZ = THREE.MathUtils.lerp(
      BOOT_POSITION.z,
      pose.position[2],
      bootBlend,
    );

    // Heavy damping — mounted on a machine, not a drone.
    camera.position.x += (targetX - camera.position.x) * DAMPING;
    camera.position.y += (targetY - camera.position.y) * DAMPING;
    camera.position.z += (targetZ - camera.position.z) * DAMPING;

    lookTarget.current.x +=
      (pose.target[0] - lookTarget.current.x) * DAMPING;
    lookTarget.current.y +=
      (pose.target[1] - lookTarget.current.y) * DAMPING;
    lookTarget.current.z +=
      (pose.target[2] - lookTarget.current.z) * DAMPING;
    camera.lookAt(lookTarget.current);
  });

  return null;
}

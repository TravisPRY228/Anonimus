"use client";

import { RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useRobotStore } from "@/store/useRobotStore";
import {
  createRobotMaterials,
  disposeRobotMaterials,
} from "./materials";
import { useRobotMotion } from "./useRobotMotion";

/**
 * NEXUS-M — procedural industrial humanoid.
 * Built from primitives with a strict finish language: off-white
 * shell panels over anodized alloy structure, carbon limb segments,
 * matte actuator joints, signal-green status LEDs.
 * ~50 meshes, shared materials, zero external assets.
 */

/** One articulated arm. Mirrored via side = 1 | -1. */
function Arm({
  side,
  materials,
}: {
  side: 1 | -1;
  materials: ReturnType<typeof createRobotMaterials>;
}) {
  return (
    <group position={[side * 0.255, 1.47, 0]} rotation={[0, 0, side * -0.09]}>
      {/* shoulder actuator */}
      <mesh material={materials.joint} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.075, 0.075, 0.11, 24]} />
      </mesh>
      <mesh material={materials.alloy} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.075, 0.014, 12, 32]} />
      </mesh>
      {/* shoulder cap panel */}
      <RoundedBox
        args={[0.11, 0.14, 0.16]}
        radius={0.022}
        position={[side * 0.03, 0.045, 0]}
        material={materials.shell}
      />
      {/* upper arm */}
      <mesh material={materials.carbon} position={[0, -0.17, 0]}>
        <cylinderGeometry args={[0.052, 0.058, 0.28, 20]} />
      </mesh>
      {/* elbow */}
      <group position={[0, -0.34, 0]} rotation={[0.22, 0, 0]}>
        <mesh material={materials.joint} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.055, 0.055, 0.09, 20]} />
        </mesh>
        {/* joint status LED */}
        <mesh material={materials.led} position={[side * 0.05, 0, 0.03]}>
          <sphereGeometry args={[0.008, 8, 8]} />
        </mesh>
        {/* forearm */}
        <mesh material={materials.carbon} position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.04, 0.048, 0.26, 20]} />
        </mesh>
        {/* wrist + hand */}
        <mesh material={materials.alloy} position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.04, 16]} />
        </mesh>
        <RoundedBox
          args={[0.07, 0.12, 0.045]}
          radius={0.015}
          position={[0, -0.38, 0.005]}
          material={materials.joint}
        />
      </group>
    </group>
  );
}

/** One leg. Mirrored via side = 1 | -1. */
function Leg({
  side,
  materials,
}: {
  side: 1 | -1;
  materials: ReturnType<typeof createRobotMaterials>;
}) {
  return (
    <group position={[side * 0.11, 0.88, 0]}>
      {/* hip actuator */}
      <mesh material={materials.joint} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.068, 0.068, 0.1, 22]} />
      </mesh>
      <mesh material={materials.alloy} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.068, 0.013, 12, 32]} />
      </mesh>
      {/* thigh with front shell plate */}
      <mesh material={materials.carbon} position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.065, 0.072, 0.34, 20]} />
      </mesh>
      <RoundedBox
        args={[0.11, 0.28, 0.05]}
        radius={0.02}
        position={[0, -0.2, 0.06]}
        material={materials.shell}
      />
      {/* knee */}
      <group position={[0, -0.41, 0]}>
        <mesh material={materials.joint} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 0.09, 20]} />
        </mesh>
        <mesh material={materials.led} position={[side * 0.052, 0, 0.025]}>
          <sphereGeometry args={[0.008, 8, 8]} />
        </mesh>
        {/* shin */}
        <mesh material={materials.carbon} position={[0, -0.18, 0]}>
          <cylinderGeometry args={[0.05, 0.06, 0.32, 20]} />
        </mesh>
        <RoundedBox
          args={[0.09, 0.24, 0.045]}
          radius={0.018}
          position={[0, -0.17, 0.055]}
          material={materials.shell}
        />
        {/* ankle + foot */}
        <mesh material={materials.alloy} position={[0, -0.37, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.08, 16]} />
        </mesh>
        <RoundedBox
          args={[0.11, 0.06, 0.24]}
          radius={0.02}
          position={[0, -0.43, 0.04]}
          material={materials.joint}
        />
      </group>
    </group>
  );
}

export function Robot() {
  const materials = useMemo(() => createRobotMaterials(), []);
  useEffect(() => {
    return () => disposeRobotMaterials(materials);
  }, [materials]);

  const rootRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const scanRef = useRef<THREE.Mesh>(null);

  // Exploded-view part groups (scroll-scrubbed in SEC.05).
  const armLRef = useRef<THREE.Group>(null);
  const armRRef = useRef<THREE.Group>(null);
  const legLRef = useRef<THREE.Group>(null);
  const legRRef = useRef<THREE.Group>(null);
  const chestPanelRef = useRef<THREE.Mesh>(null);
  const spineRef = useRef<THREE.Mesh>(null);

  // Boot + idle + tracking + drag + explode — imperative, zero re-renders.
  useRobotMotion({
    rootRef,
    torsoRef,
    headRef,
    scanRef,
    materials,
    explodeRefs: {
      armL: armLRef,
      armR: armRRef,
      legL: legLRef,
      legR: legRRef,
      chestPanel: chestPanelRef,
      spine: spineRef,
    },
  });

  // Start the boot clock on mount.
  const startBoot = useRobotStore((s) => s.startBoot);
  useEffect(() => {
    startBoot();
  }, [startBoot]);

  return (
    <group ref={rootRef}>
      {/* ============ PELVIS ============ */}
      <RoundedBox
        args={[0.3, 0.16, 0.2]}
        radius={0.03}
        position={[0, 0.95, 0]}
        material={materials.alloy}
      />

      {/* ============ TORSO ============ */}
      <group ref={torsoRef}>
        {/* abdomen segment */}
        <RoundedBox
          args={[0.24, 0.16, 0.17]}
          radius={0.03}
          position={[0, 1.12, 0]}
          material={materials.carbon}
        />
        {/* chest core */}
        <RoundedBox
          args={[0.37, 0.32, 0.22]}
          radius={0.04}
          position={[0, 1.38, 0]}
          material={materials.alloy}
        />
        {/* chest front shell panel */}
        <RoundedBox
          ref={chestPanelRef}
          args={[0.31, 0.26, 0.03]}
          radius={0.02}
          position={[0, 1.39, 0.115]}
          material={materials.shell}
        />
        {/* chest status LED (the blinking one during boot) */}
        <mesh material={materials.led} position={[-0.11, 1.47, 0.135]}>
          <boxGeometry args={[0.018, 0.018, 0.008]} />
        </mesh>
        {/* carbon spine */}
        <mesh
          ref={spineRef}
          material={materials.carbon}
          position={[0, 1.22, -0.1]}
        >
          <cylinderGeometry args={[0.035, 0.035, 0.52, 16]} />
        </mesh>
        {/* spine vertebrae detail */}
        {[1.06, 1.16, 1.26, 1.36].map((y) => (
          <mesh key={y} material={materials.alloy} position={[0, y, -0.1]}>
            <cylinderGeometry args={[0.045, 0.045, 0.02, 12]} />
          </mesh>
        ))}

        {/* shoulder connectors (trapezius struts) */}
        <RoundedBox
          args={[0.09, 0.07, 0.15]}
          radius={0.02}
          position={[0.2, 1.51, 0]}
          material={materials.alloy}
        />
        <RoundedBox
          args={[0.09, 0.07, 0.15]}
          radius={0.02}
          position={[-0.2, 1.51, 0]}
          material={materials.alloy}
        />

        {/* ============ ARMS ============ */}
        <group ref={armRRef}>
          <Arm side={1} materials={materials} />
        </group>
        <group ref={armLRef}>
          <Arm side={-1} materials={materials} />
        </group>

        {/* ============ NECK + HEAD ============ */}
        <mesh material={materials.joint} position={[0, 1.575, 0]}>
          <cylinderGeometry args={[0.04, 0.05, 0.06, 16]} />
        </mesh>
        <group ref={headRef} position={[0, 1.675, 0]}>
          {/* instrument head — not a face */}
          <RoundedBox
            args={[0.16, 0.16, 0.2]}
            radius={0.03}
            material={materials.shell}
          />
          {/* sensor visor slot — thin instrument slit */}
          <mesh material={materials.visor} position={[0, 0.012, 0.096]}>
            <boxGeometry args={[0.11, 0.026, 0.014]} />
          </mesh>
          {/* aperture cameras */}
          <mesh material={materials.joint} position={[-0.038, -0.045, 0.096]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.013, 0.013, 0.016, 16]} />
          </mesh>
          <mesh material={materials.joint} position={[0.038, -0.045, 0.096]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.013, 0.013, 0.016, 16]} />
          </mesh>
          {/* LIDAR puck */}
          <mesh material={materials.joint} position={[0, 0.095, 0]}>
            <cylinderGeometry args={[0.042, 0.048, 0.024, 24]} />
          </mesh>
          <mesh material={materials.led} position={[0, 0.095, 0]}>
            <torusGeometry args={[0.044, 0.003, 8, 32]} />
          </mesh>
          {/* ear housings */}
          <mesh material={materials.alloy} position={[-0.085, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.032, 0.032, 0.018, 16]} />
          </mesh>
          <mesh material={materials.alloy} position={[0.085, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.032, 0.032, 0.018, 16]} />
          </mesh>
        </group>
      </group>

      {/* ============ LEGS ============ */}
      <group ref={legRRef}>
        <Leg side={1} materials={materials} />
      </group>
      <group ref={legLRef}>
        <Leg side={-1} materials={materials} />
      </group>

      {/* ============ DIAGNOSTIC SCAN SWEEP ============ */}
      <mesh ref={scanRef} position={[0, 2, 0]} visible={false}>
        <planeGeometry args={[1.4, 0.012]} />
        <meshBasicMaterial
          color="#00ff66"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ============ PLATFORM DISC ============ */}
      <mesh material={materials.joint} position={[0, -0.02, 0]}>
        <cylinderGeometry args={[0.58, 0.62, 0.04, 48]} />
      </mesh>
      <mesh material={materials.led} position={[0, -0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.59, 0.6, 64]} />
      </mesh>
    </group>
  );
}

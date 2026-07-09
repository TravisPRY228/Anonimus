import * as THREE from "three";

/**
 * Shared material instances for the procedural humanoid.
 * One instance per finish — created once, reused by every mesh
 * (draw-call/state-change hygiene).
 *
 * Finish language (industrial humanoid, not sci-fi):
 * — shell:   warm off-white panels, like Figure/ABB industrial shells
 * — alloy:   anodized aluminum under-structure
 * — carbon:  filament-wound dark segments (spine, limbs)
 * — joint:   matte near-black actuator housings
 * — led:     signal-green emissives (status, eyes) — boot-animated
 */
export interface RobotMaterials {
  shell: THREE.MeshStandardMaterial;
  alloy: THREE.MeshStandardMaterial;
  carbon: THREE.MeshStandardMaterial;
  joint: THREE.MeshStandardMaterial;
  led: THREE.MeshStandardMaterial;
  visor: THREE.MeshStandardMaterial;
}

export const SIGNAL_GREEN = new THREE.Color("#00ff66");

export function createRobotMaterials(): RobotMaterials {
  return {
    shell: new THREE.MeshStandardMaterial({
      color: "#d6d6d0",
      metalness: 0.15,
      roughness: 0.5,
    }),
    alloy: new THREE.MeshStandardMaterial({
      color: "#3a3e44",
      metalness: 0.9,
      roughness: 0.38,
    }),
    carbon: new THREE.MeshStandardMaterial({
      color: "#1a1c1f",
      metalness: 0.35,
      roughness: 0.62,
    }),
    joint: new THREE.MeshStandardMaterial({
      color: "#0e0f11",
      metalness: 0.2,
      roughness: 0.85,
    }),
    led: new THREE.MeshStandardMaterial({
      color: "#031008",
      emissive: SIGNAL_GREEN,
      emissiveIntensity: 0, // ramped by the boot sequence
      toneMapped: false,
    }),
    visor: new THREE.MeshStandardMaterial({
      color: "#050607",
      metalness: 0.6,
      roughness: 0.25,
      emissive: SIGNAL_GREEN,
      emissiveIntensity: 0, // eyes power on during boot
      toneMapped: false,
    }),
  };
}

export function disposeRobotMaterials(materials: RobotMaterials): void {
  for (const material of Object.values(materials)) {
    material.dispose();
  }
}

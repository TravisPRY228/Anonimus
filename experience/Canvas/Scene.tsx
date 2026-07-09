"use client";

import { ContactShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { QualityTier } from "@/lib/quality";
import { CameraRig } from "./CameraRig";
import { Effects } from "./effects/Effects";
import { Lighting } from "./Lighting";
import { Robot } from "./Robot/Robot";

/**
 * The single persistent WebGL scene.
 * Content scrolls over it as DOM; the scene reacts through stores.
 */
export function Scene({ tier }: { tier: QualityTier }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ fov: 34, position: [0.9, 0.7, 2.2], near: 0.1, far: 30 }}
      gl={{
        antialias: tier !== "high", // high tier uses composer MSAA
        powerPreference: "high-performance",
      }}
      shadows
      style={{ background: "transparent" }}
    >
      <CameraRig />
      <Lighting />
      {/* off-axis composition: robot right-of-center, headline clear */}
      <group position={[0.8, 0, 0]}>
        <Robot />
        {/* grounded, baked-cheap contact shadow */}
        <ContactShadows
          position={[0, 0.001, 0]}
          opacity={0.55}
          scale={4}
          blur={2.2}
          far={2}
          frames={1}
          resolution={512}
        />
      </group>
      {tier === "high" ? <Effects /> : null}
    </Canvas>
  );
}

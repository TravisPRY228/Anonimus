"use client";

import {
  Bloom,
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing";

/**
 * Single merged post pass — high tier only.
 * Bloom is threshold-gated so ONLY emissives glow (LEDs, visor,
 * platform ring). No neon wash: the green law survives grading.
 */
export function Effects() {
  return (
    <EffectComposer multisampling={4}>
      <Bloom
        intensity={0.5}
        luminanceThreshold={1.1}
        luminanceSmoothing={0.25}
        mipmapBlur
      />
      <Vignette eskil={false} offset={0.28} darkness={0.72} />
    </EffectComposer>
  );
}

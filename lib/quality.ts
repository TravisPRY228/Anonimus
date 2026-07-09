export type QualityTier = "high" | "mid" | "low";

/**
 * Device capability heuristic, evaluated once on the client.
 * — "low": no live 3D (static hero). Small screens, coarse pointers
 *   without hover, or missing WebGL2.
 * — "mid": live 3D, no post-processing.
 * — "high": full pipeline (bloom, vignette).
 *
 * Never ship a stuttering canvas: when in doubt, go down a tier.
 */
export function detectQualityTier(): QualityTier {
  if (typeof window === "undefined") return "low";

  // Touch-only small devices: static hero (re-choreographed in Stage 5).
  const smallScreen = window.matchMedia("(max-width: 48rem)").matches;
  const coarseOnly = window.matchMedia(
    "(pointer: coarse) and (hover: none)",
  ).matches;
  if (smallScreen && coarseOnly) return "low";

  // WebGL2 support check.
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2");
    if (!gl) return "low";
  } catch {
    return "low";
  }

  const cores = navigator.hardwareConcurrency ?? 4;
  const memory =
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;

  if (cores <= 4 || memory <= 4) return "mid";
  return "high";
}

/** True when the user asked for reduced motion — honored fully. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

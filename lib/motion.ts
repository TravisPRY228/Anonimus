/**
 * NEXUS ROBOTICS — MOTION TOKENS
 * The single "servo" motion signature shared by GSAP (3D/scroll)
 * and Framer Motion (DOM). Machines don't wobble: no bounce,
 * no elastic, no overshoot — sharp intent, precise lock.
 */

/** One mechanical curve everywhere. */
export const SERVO_BEZIER = [0.83, 0, 0.17, 1] as const;

/** CSS string form — matches --ease-servo in tokens.css. */
export const SERVO_CSS = `cubic-bezier(${SERVO_BEZIER.join(", ")})`;

/** GSAP custom ease string (same curve). */
export const SERVO_GSAP = `cubic-bezier(${SERVO_BEZIER.join(",")})`;

/** Durations in seconds (GSAP) — mirror --duration-* tokens. */
export const DURATION = {
  /** Hovers, presses, status flips. */
  micro: 0.12,
  /** Cards, panels, scan-wipes. */
  component: 0.32,
  /** Dock-to-dock camera moves. */
  camera: 1.6,
} as const;

/** Durations in ms (Framer Motion / CSS). */
export const DURATION_MS = {
  micro: 120,
  component: 320,
  camera: 1600,
} as const;

/** Framer Motion transition presets. */
export const servoTransition = {
  micro: { duration: DURATION.micro, ease: SERVO_BEZIER },
  component: { duration: DURATION.component, ease: SERVO_BEZIER },
  camera: { duration: DURATION.camera, ease: SERVO_BEZIER },
} as const;

/** Stagger interval for sequenced "power-on" reveals (s). */
export const BOOT_STAGGER = 0.08;

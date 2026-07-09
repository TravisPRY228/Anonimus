import type { CameraPose } from "@/store/useScrollStore";

/**
 * Camera dock system — pre-choreographed inspection stations.
 * The camera only ever travels between these docks; scroll position
 * interpolates along the rail. Opacity rations where the machine
 * is visible at all: the robot appears when it has a narrative job.
 */

export interface Dock extends CameraPose {
  /** Section element id this dock is anchored to. */
  sectionId: string;
  /** Canvas opacity at this dock. */
  opacity: number;
}

/** Robot root sits at world x = +0.8 (off-axis hero composition). */
export const DOCKS: Dock[] = [
  {
    // SEC.01 — hero: 3/4 inspection view, robot right-of-center
    sectionId: "hero",
    position: [1.35, 1.5, 4.5],
    target: [0.28, 1.0, 0],
    opacity: 1,
  },
  {
    // SEC.02 — about: rig pulls wide; machine dims to the right periphery
    sectionId: "about",
    position: [-1.6, 1.6, 5.8],
    target: [0.2, 1.15, 0],
    opacity: 0.3,
  },
  {
    // SEC.03 — mission: the void. No machine during the creed.
    sectionId: "mission",
    position: [-1.6, 1.6, 6.0],
    target: [0.2, 1.15, 0],
    opacity: 0,
  },
  {
    // SEC.04 — technology: still dark (the diagram is the subject)
    sectionId: "technology",
    position: [1.0, 1.35, 4.6],
    target: [0.8, 1.05, 0],
    opacity: 0,
  },
  {
    // SEC.05 — platform: close inspection + exploded view
    sectionId: "platform",
    position: [1.0, 1.35, 4.3],
    target: [0.8, 1.05, 0],
    opacity: 1,
  },
  {
    // SEC.06 — industries and below: session moves to documents
    sectionId: "industries",
    position: [1.4, 1.5, 4.8],
    target: [0.8, 1.0, 0],
    opacity: 0,
  },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => t * t * (3 - 2 * t);

/**
 * Interpolate the camera pose + opacity for a scroll position.
 * `anchors` are the document Y offsets of each dock's section.
 */
export function poseAt(
  scrollY: number,
  anchors: number[],
): { pose: CameraPose; opacity: number } {
  // Before the first anchor — hold the hero dock.
  if (scrollY <= anchors[0]) {
    const d = DOCKS[0];
    return {
      pose: { position: [...d.position], target: [...d.target] },
      opacity: d.opacity,
    };
  }

  // Find the active segment.
  for (let i = 0; i < anchors.length - 1; i++) {
    if (scrollY < anchors[i + 1]) {
      const t = smooth(
        (scrollY - anchors[i]) / Math.max(1, anchors[i + 1] - anchors[i]),
      );
      const a = DOCKS[i];
      const b = DOCKS[i + 1];
      return {
        pose: {
          position: [
            lerp(a.position[0], b.position[0], t),
            lerp(a.position[1], b.position[1], t),
            lerp(a.position[2], b.position[2], t),
          ],
          target: [
            lerp(a.target[0], b.target[0], t),
            lerp(a.target[1], b.target[1], t),
            lerp(a.target[2], b.target[2], t),
          ],
        },
        opacity: lerp(a.opacity, b.opacity, t),
      };
    }
  }

  // Past the last anchor.
  const last = DOCKS[DOCKS.length - 1];
  return {
    pose: { position: [...last.position], target: [...last.target] },
    opacity: last.opacity,
  };
}

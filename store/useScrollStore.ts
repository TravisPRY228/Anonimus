import { create } from "zustand";

export interface CameraPose {
  /** Camera world position [x, y, z]. */
  position: [number, number, number];
  /** Look-at target [x, y, z]. */
  target: [number, number, number];
}

interface ScrollState {
  /** Normalized page progress 0..1. */
  progress: number;
  /** Interpolated camera pose for the current scroll position. */
  pose: CameraPose;
  /** Canvas visibility 0..1 for the current scroll position. */
  canvasOpacity: number;
  /** Exploded-view progress 0..1 (peaks mid-Platform section). */
  explode: number;

  setProgress: (progress: number) => void;
  setPose: (pose: CameraPose, canvasOpacity: number) => void;
  setExplode: (explode: number) => void;
}

/**
 * Scroll-choreography signals shared DOM ↔ canvas.
 * Written each scroll frame by the Choreographer (GSAP ScrollTrigger),
 * read via getState() inside useFrame — no React re-renders.
 */
export const useScrollStore = create<ScrollState>((set) => ({
  progress: 0,
  pose: {
    position: [1.35, 1.5, 4.5],
    target: [0.28, 1.0, 0],
  },
  canvasOpacity: 1,
  explode: 0,

  setProgress: (progress) => set({ progress }),
  setPose: (pose, canvasOpacity) => set({ pose, canvasOpacity }),
  setExplode: (explode) => set({ explode }),
}));

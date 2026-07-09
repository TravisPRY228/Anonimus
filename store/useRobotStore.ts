import { create } from "zustand";

export type RobotPhase = "BOOTING" | "ONLINE";

interface RobotState {
  /** Boot state machine. BOOTING plays the power-on sequence once. */
  phase: RobotPhase;
  /** Timestamp (performance.now, ms) when the boot began. */
  bootStartedAt: number | null;
  /** Cursor position in NDC (−1..1) — drives head tracking. */
  cursor: { x: number; y: number };
  /** Weighted drag rotation target (radians, clamped) from the hero surface. */
  dragTarget: number;
  /** Whether the user is actively dragging the robot. */
  dragging: boolean;

  startBoot: () => void;
  setOnline: () => void;
  setCursor: (x: number, y: number) => void;
  setDragTarget: (value: number) => void;
  setDragging: (value: boolean) => void;
}

/** Max weighted-rotate arc: ±25° — the machine resists. */
export const DRAG_LIMIT = 0.44;

/**
 * Robot state — written by DOM interactions, read imperatively
 * inside useFrame via useRobotStore.getState() (no React re-renders
 * on the hot path).
 */
export const useRobotStore = create<RobotState>((set) => ({
  phase: "BOOTING",
  bootStartedAt: null,
  cursor: { x: 0, y: 0 },
  dragTarget: 0,
  dragging: false,

  startBoot: () =>
    set((state) =>
      state.bootStartedAt === null
        ? { bootStartedAt: performance.now(), phase: "BOOTING" }
        : state,
    ),
  setOnline: () => set({ phase: "ONLINE" }),
  setCursor: (x, y) => set({ cursor: { x, y } }),
  setDragTarget: (value) =>
    set({ dragTarget: Math.max(-DRAG_LIMIT, Math.min(DRAG_LIMIT, value)) }),
  setDragging: (value) => set({ dragging: value }),
}));

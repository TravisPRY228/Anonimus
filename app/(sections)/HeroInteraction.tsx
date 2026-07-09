"use client";

import { useRef } from "react";
import { soundEngine } from "@/experience/sound/engine";
import { DRAG_LIMIT, useRobotStore } from "@/store/useRobotStore";
import styles from "./sections.module.css";

/**
 * Invisible drag surface over the hero stage.
 * Horizontal drag rotates the robot with resistance and weight —
 * writes only to the store; the canvas reads it. DOM ↔ 3D stay
 * decoupled per the architecture contract.
 */
export function HeroInteraction() {
  const dragState = useRef({ active: false, startX: 0, startRotation: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const store = useRobotStore.getState();
    dragState.current = {
      active: true,
      startX: e.clientX,
      startRotation: store.dragTarget,
    };
    store.setDragging(true);
    soundEngine.servo(); // the machine resists — audibly
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragState.current;
    if (!drag.active) return;
    const deltaX = (e.clientX - drag.startX) / window.innerWidth;
    // Full viewport width ≈ full arc — heavy, resistive mapping.
    useRobotStore
      .getState()
      .setDragTarget(drag.startRotation + deltaX * DRAG_LIMIT * 2);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active) return;
    dragState.current.active = false;
    useRobotStore.getState().setDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      className={styles.heroDrag}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      aria-hidden="true"
    />
  );
}

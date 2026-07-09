"use client";

import { useEffect, useRef, useState } from "react";
import { detectQualityTier, type QualityTier } from "@/lib/quality";
import { useRobotStore } from "@/store/useRobotStore";
import { useScrollStore } from "@/store/useScrollStore";
import { Scene } from "./Canvas/Scene";
import styles from "./ExperienceProvider.module.css";
import { Choreographer } from "./orchestration/Choreographer";

/*
 * NOTE: Scene is imported statically. next/dynamic + the three.js
 * chunk triggers a Turbopack dev-runtime bug ("chunk path empty but
 * not in a worker") that leaves the Suspense boundary hanging.
 * Rendering is still hard-gated by quality tier — the canvas never
 * mounts on the server, on low-tier devices, or before detection.
 */

/**
 * Client boundary for the whole experience layer.
 * — detects the quality tier once
 * — bridges cursor into the robot store
 * — applies choreographed canvas opacity from the scroll store
 * Low tier / no-JS: only the Choreographer's reveal classes matter;
 * the site remains complete without the canvas.
 */
export function ExperienceProvider() {
  const [tier, setTier] = useState<QualityTier | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect once on the client. The data attribute lets CSS swap the
  // static hero schematic for the live canvas (and back).
  useEffect(() => {
    // setTimeout, not rAF: rAF never fires in a backgrounded tab,
    // which would leave the experience unmounted until refocus.
    const id = window.setTimeout(() => {
      const detected = detectQualityTier();
      document.documentElement.dataset.tier = detected;
      setTier(detected);
    }, 0);
    return () => clearTimeout(id);
  }, []);

  // Cursor → store (NDC), passive.
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      useRobotStore
        .getState()
        .setCursor(
          (e.clientX / window.innerWidth) * 2 - 1,
          (e.clientY / window.innerHeight) * 2 - 1,
        );
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  // Choreographed canvas opacity → container style (no re-renders).
  useEffect(() => {
    const unsubscribe = useScrollStore.subscribe((state) => {
      const el = containerRef.current;
      if (!el) return;
      el.style.opacity = String(state.canvasOpacity);
      el.style.visibility = state.canvasOpacity === 0 ? "hidden" : "visible";
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <Choreographer />
      {tier !== null && tier !== "low" ? (
        <div
          ref={containerRef}
          className={styles.canvasHost}
          aria-hidden="true"
        >
          <Scene tier={tier} />
        </div>
      ) : null}
    </>
  );
}

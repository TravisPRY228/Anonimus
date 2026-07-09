"use client";

import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const LenisContext = createContext<Lenis | null>(null);

/** Access the live Lenis instance (null before mount / reduced-motion). */
export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

/**
 * Weighted, damped inertial scroll — the "servo" feel.
 * Fully skipped for prefers-reduced-motion users: they get native scroll.
 * Manual rAF loop for compatibility across Lenis versions.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const instance = new Lenis({ lerp: 0.09 });

    let rafId = 0;
    let published = false;
    const loop = (time: number) => {
      if (!published) {
        // Publish the instance from the first frame (async — avoids
        // a synchronous setState cascade inside the effect body).
        published = true;
        setLenis(instance);
      }
      instance.raf(time);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}

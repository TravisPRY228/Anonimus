"use client";

import { useEffect, useState } from "react";
import { HERO } from "@/content/company";
import { prefersReducedMotion } from "@/lib/quality";
import styles from "./sections.module.css";

/** Boot-log line timings (seconds), matched to the 3D power-on. */
const LINE_AT = [0.35, 0.8, 1.25, 1.8, 2.6];

/**
 * The hero diagnostic log, printed line-by-line in sync with the
 * robot's boot sequence. SSR renders every line (no-JS complete);
 * with motion allowed, the log replays once on mount.
 */
export function HeroBootLog() {
  const [visibleCount, setVisibleCount] = useState<number>(
    HERO.bootSequence.length,
  );

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const timers = [
      // hide all lines asynchronously, then replay the log
      window.setTimeout(() => setVisibleCount(0), 0),
      ...LINE_AT.map((at, i) =>
        window.setTimeout(() => setVisibleCount(i + 1), at * 1000),
      ),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className={`mono ${styles.heroBootLog}`} aria-hidden="true">
      {HERO.bootSequence.map((line, i) => (
        <span
          key={line}
          className={i < visibleCount ? undefined : styles.bootLinePending}
        >
          {line}
        </span>
      ))}
    </div>
  );
}

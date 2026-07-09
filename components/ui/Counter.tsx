"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/quality";

/**
 * Odometer metric: counts from 0 to the target when it enters view,
 * settling on the servo curve. SSR renders the final value — crawlers
 * and no-JS users always see truth; the count-up is enhancement only.
 *
 * Handles values like "−38%", "0.1 mm", "99.998%", "1,900 km²",
 * "21 days", "+12%": the numeric token animates, prefix/suffix hold.
 */
export function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    // Split into prefix / number / suffix.
    const match = value.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
    if (!match) return;
    const [, prefix, numToken, suffix] = match;
    const target = Number(numToken.replace(/,/g, ""));
    if (!Number.isFinite(target)) return;
    const decimals = numToken.includes(".")
      ? numToken.split(".")[1].length
      : 0;
    const grouped = numToken.includes(",");

    const format = (n: number) =>
      prefix +
      n.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping: grouped,
      }) +
      suffix;

    let rafId = 0;
    const DURATION = 900;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / DURATION);
          const eased = 1 - Math.pow(1 - p, 3); // sharp attack, precise lock
          el.textContent = format(target * eased);
          if (p < 1) rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [value]);

  return <span ref={ref}>{value}</span>;
}

"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/quality";
import { useScrollStore } from "@/store/useScrollStore";
import { useLenis } from "@/experience/scroll/LenisProvider";
import { soundEngine } from "@/experience/sound/engine";
import { DOCKS, poseAt } from "./docks";
import styles from "./Choreographer.module.css";

/**
 * The master choreography controller.
 * — binds GSAP ScrollTrigger to Lenis
 * — interpolates camera docks per scroll frame → store
 * — scrubs the exploded view across SEC.05
 * — fires scan-wipe + reveal classes as sections come online
 * All section content is server-rendered and fully readable without
 * this component; choreography is presentation only.
 */
export function Choreographer() {
  const lenis = useLenis();
  const scanRef = useRef<HTMLDivElement>(null);

  // Keep ScrollTrigger in sync with Lenis frames.
  useEffect(() => {
    if (!lenis) return;
    const sync = () => ScrollTrigger.update();
    lenis.on("scroll", sync);
    return () => lenis.off("scroll", sync);
  }, [lenis]);

  useEffect(() => {
    // Signal that choreography is active — gates the hidden state in CSS.
    document.documentElement.classList.add("js-choreo");

    if (prefersReducedMotion()) {
      // Reduced motion: everything visible, no choreography.
      document
        .querySelectorAll("main > section")
        .forEach((s) => s.classList.add("is-live"));
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const store = useScrollStore.getState();

    /* ---------- camera dock rail ---------- */
    let anchors: number[] = [];
    const measure = () => {
      anchors = DOCKS.map((dock) => {
        const el = document.getElementById(dock.sectionId);
        return el ? el.offsetTop : 0;
      });
    };
    measure();

    const onScroll = () => {
      const y = window.scrollY;
      const { pose, opacity } = poseAt(y, anchors);
      store.setPose(pose, opacity);
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      store.setProgress(max > 0 ? y / max : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    onScroll();

    /* ---------- exploded view scrub (SEC.05) ---------- */
    const explodeTrigger = ScrollTrigger.create({
      trigger: "#platform",
      start: "top 65%",
      end: "bottom 60%",
      scrub: true,
      onUpdate: (self) => {
        // Peaks mid-section: assemble in, explode, re-assemble out.
        store.setExplode(Math.sin(self.progress * Math.PI));
      },
      onLeave: () => store.setExplode(0),
      onLeaveBack: () => store.setExplode(0),
    });

    /* ---------- section reveals + scan wipe ---------- */
    const scan = scanRef.current;
    const revealTriggers = Array.from(
      document.querySelectorAll<HTMLElement>("main > section"),
    ).map((section) =>
      ScrollTrigger.create({
        trigger: section,
        start: "top 78%",
        once: true,
        onEnter: () => {
          section.classList.add("is-live");
          if (scan && section.id !== "hero") {
            scan.classList.remove(styles.scanPlay);
            // restart the sweep animation
            void scan.offsetWidth;
            scan.classList.add(styles.scanPlay);
            soundEngine.sweep();
          }
        },
      }),
    );

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      explodeTrigger.kill();
      revealTriggers.forEach((t) => t.kill());
    };
  }, []);

  return <div ref={scanRef} className={styles.scanline} aria-hidden="true" />;
}

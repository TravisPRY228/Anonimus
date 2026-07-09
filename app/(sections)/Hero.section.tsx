import { HERO } from "@/content/company";
import { HeroBootLog } from "./HeroBootLog";
import { HeroInteraction } from "./HeroInteraction";
import { HeroSchematic } from "./HeroSchematic";
import styles from "./sections.module.css";

/**
 * SEC.01 — HERO · "ACCESS GRANTED"
 * The 3D stage mounts behind this DOM in Stage 3; the markup below
 * is the full semantic content (crawler- and no-JS-complete).
 */
export function HeroSection() {
  return (
    <section id="hero" aria-label="NEXUS Robotics" className={styles.hero}>
      {/* Static schematic — replaced by the live scene on capable devices */}
      <HeroSchematic />

      {/* Weighted-rotate drag surface over the 3D stage */}
      <HeroInteraction />

      <div className={styles.heroContent}>
        <p className={`label ${styles.heroStatus}`}>
          <span className={styles.statusDot} aria-hidden="true" />
          {HERO.statusLine}
        </p>

        <h1 className={styles.heroHeadline}>
          {HERO.headline[0]}
          <br />
          {HERO.headline[1]}
        </h1>

        <p className={styles.heroSub}>{HERO.sub}</p>
      </div>

      <HeroBootLog />

      <p className={`mono ${styles.heroTelemetry}`} aria-hidden="true">
        {HERO.telemetry.map((t) => (
          <span key={t.key}>
            {t.key} <b>{t.value}</b>
          </span>
        ))}
      </p>
    </section>
  );
}

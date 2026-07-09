import { MISSION } from "@/content/company";
import styles from "./sections.module.css";

/**
 * SEC.03 — MISSION · "THE CREED".
 * Deliberately not using the Section shell: this screen is a held breath —
 * no sector label, no rule, just the manifesto in the void.
 */
export function MissionSection() {
  return (
    <section
      id="mission"
      aria-labelledby="mission-title"
      className={styles.mission}
    >
      <h2 id="mission-title" className={styles.manifesto}>
        {MISSION.manifesto}
      </h2>
      <ul className={styles.principles} aria-label="Engineering principles">
        {MISSION.principles.map((principle, i) => (
          <li key={principle} className={`mono ${styles.principle}`}>
            <span className={styles.principleNum} aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            {principle}
          </li>
        ))}
      </ul>
    </section>
  );
}

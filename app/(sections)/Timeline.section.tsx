import { Section } from "@/components/section/Section";
import { MILESTONES } from "@/content/updates";
import styles from "./sections.module.css";

/**
 * SEC.09 — TIMELINE · "TRAJECTORY".
 * Semantic ordered list; the horizontal measurement-rule choreography
 * is layered on in Stage 4 (vertical list remains the mobile layout).
 */
export function TimelineSection() {
  return (
    <Section
      index={9}
      id="timeline"
      codename="TRAJECTORY"
      title="2019 → 2026"
    >
      <ol className={styles.timeline} aria-label="Company milestones">
        {MILESTONES.map((milestone) => (
          <li key={milestone.year} className={styles.milestone}>
            <p className={`display ${styles.milestoneYear}`}>
              {milestone.year}
            </p>
            <p className={`mono ${styles.milestoneTitle}`}>{milestone.title}</p>
            <p className={styles.milestoneDetail}>{milestone.detail}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

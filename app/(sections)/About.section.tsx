import { Section } from "@/components/section/Section";
import { ORIGIN_LOG } from "@/content/company";
import styles from "./sections.module.css";

/** SEC.02 — ABOUT · "THE LOG". Origin story as field records. */
export function AboutSection() {
  return (
    <Section index={2} id="about" codename="THE LOG" title="Built in silence">
      <p className={styles.framing}>
        NEXUS was founded by engineers who left aerospace, surgical and
        automotive robotics in the same quarter — tired of demos that never
        shipped. The first three years produced no press releases. They
        produced the following records.
      </p>

      <ol className={styles.log} aria-label="Company history log">
        {ORIGIN_LOG.map((record) => (
          <li key={record.date} className={styles.logRecord}>
            <span className={`mono ${styles.logDate}`}>{record.date}</span>
            <div>
              <p className={`mono ${styles.logText}`}>{record.text}</p>
              {record.detail ? (
                <p className={styles.logDetail}>{record.detail}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

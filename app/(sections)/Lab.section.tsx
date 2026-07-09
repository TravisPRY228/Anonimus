import { Section } from "@/components/section/Section";
import { LAB_NOTES } from "@/content/operations";
import styles from "./sections.module.css";

/**
 * SEC.07 — RESEARCH LAB · "OPEN NOTES".
 * Failures are rendered on purpose — the site's honesty payoff.
 */
export function LabSection() {
  return (
    <Section
      index={7}
      id="lab"
      codename="OPEN NOTES"
      title="The failure log is public"
    >
      <p className={styles.framing}>
        Current experiments, including the ones that did not work. A company
        that hides its failures is asking you to trust its adjectives.
      </p>

      <ul className={styles.labGrid} aria-label="Research notes">
        {LAB_NOTES.map((note) => (
          <li
            key={note.id}
            className={styles.labCard}
            data-status={note.status}
          >
            <p className={`mono ${styles.labStatus}`}>{note.status}</p>
            <h3 className={styles.labTitle}>{note.title}</h3>
            <p className={styles.labMethod}>{note.method}</p>
            <p className={`mono ${styles.labResult}`}>{note.result}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

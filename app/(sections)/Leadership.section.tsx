import { Section } from "@/components/section/Section";
import { LEADERSHIP } from "@/content/people";
import styles from "./sections.module.css";

/** SEC.11 — LEADERSHIP · "BY EXPERTISE". Credentials, not headshots. */
export function LeadershipSection() {
  return (
    <Section
      index={11}
      id="leadership"
      codename="BY EXPERTISE"
      title="The people who built it"
    >
      <ul className={styles.team} aria-label="Leadership team">
        {LEADERSHIP.map((person) => (
          <li key={person.id} className={styles.person}>
            <h3 className={styles.personName}>{person.name}</h3>
            <p className={`mono ${styles.personRole}`}>{person.role}</p>
            <p className={`mono ${styles.personBackground}`}>
              {person.background}
            </p>
            <p className={styles.personCredential}>{person.credential}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

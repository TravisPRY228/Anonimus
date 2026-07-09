import { Section } from "@/components/section/Section";
import { CULTURE_PRINCIPLES, ROLES } from "@/content/people";
import styles from "./sections.module.css";

/** SEC.12 — CAREERS · "WHO SHIPS HERE". */
export function CareersSection() {
  return (
    <Section
      index={12}
      id="careers"
      codename="WHO SHIPS HERE"
      title="No perks section"
    >
      <p className={`mono ${styles.culture}`}>
        {CULTURE_PRINCIPLES.join(" ")}
      </p>

      <ul className={styles.roles} aria-label="Open roles">
        {ROLES.map((role) => (
          <li key={role.id} className={styles.role}>
            <details className={styles.roleDetails}>
              <summary className={`mono ${styles.roleSummary}`}>
                <span className={styles.roleMarker} aria-hidden="true">
                  ▸
                </span>
                <span className={styles.roleTitle}>{role.title}</span>
                <span className={`label ${styles.roleLocation}`}>
                  {role.location}
                </span>
              </summary>
              <ul className={styles.roleResponsibilities}>
                {role.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ul>
    </Section>
  );
}

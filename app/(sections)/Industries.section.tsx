import { Section } from "@/components/section/Section";
import { Counter } from "@/components/ui/Counter";
import { INDUSTRIES } from "@/content/operations";
import styles from "./sections.module.css";

/** SEC.06 — INDUSTRIES · "FOUR WORLDS". */
export function IndustriesSection() {
  return (
    <Section
      index={6}
      id="industries"
      codename="FOUR WORLDS"
      title="From the operating room to orbit"
    >
      <ul className={styles.industries} aria-label="Deployment industries">
        {INDUSTRIES.map((industry) => (
          <li key={industry.id} className={styles.industryTile}>
            <h3 className={styles.industryName}>{industry.name}</h3>
            <p className={styles.industryContext}>{industry.context}</p>
            <p className={`mono ${styles.industryMetric}`}>
              <span className="label">{industry.metricKey}</span>
              <b>
                <Counter value={industry.metricValue} />
              </b>
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

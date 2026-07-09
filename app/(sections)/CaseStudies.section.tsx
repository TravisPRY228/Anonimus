import { Section } from "@/components/section/Section";
import { Counter } from "@/components/ui/Counter";
import { CASE_STUDIES } from "@/content/operations";
import styles from "./sections.module.css";

/** SEC.10 — CASE STUDIES · "FIELD REPORTS". */
export function CaseStudiesSection() {
  return (
    <Section
      index={10}
      id="cases"
      codename="FIELD REPORTS"
      title="Numbers from the field"
    >
      <div className={styles.cases}>
        {CASE_STUDIES.map((cs) => (
          <article
            key={cs.id}
            className={styles.case}
            aria-labelledby={`${cs.id}-title`}
          >
            <header className={styles.caseHeader}>
              <p className="label">{cs.index}</p>
              <h3 id={`${cs.id}-title`} className={styles.caseTitle}>
                {cs.title}
              </h3>
              <p className={`mono ${styles.caseClient}`}>{cs.client}</p>
            </header>

            <dl className={styles.caseBody}>
              <dt className="label">Context</dt>
              <dd>{cs.context}</dd>
              <dt className="label">Task</dt>
              <dd>{cs.task}</dd>
              <dt className="label">Deployment</dt>
              <dd>{cs.deployment}</dd>
            </dl>

            <div className={styles.caseMetrics}>
              <p className={`mono ${styles.caseHeadline}`}>
                <span className="label">{cs.headline.key}</span>
                <b>
                  <Counter value={cs.headline.value} />
                </b>
              </p>
              <ul aria-label="Result metrics">
                {cs.metrics.map((m) => (
                  <li key={m.key} className={`mono ${styles.caseMetric}`}>
                    <span className="label">{m.key}</span>
                    <b>
                      <Counter value={m.value} />
                    </b>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

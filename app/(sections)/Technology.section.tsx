import { Section } from "@/components/section/Section";
import { DECISION_GRAPH, TECHNOLOGY_STATEMENT } from "@/content/systems";
import styles from "./sections.module.css";

/** SEC.04 — AI TECHNOLOGY · "TRACE A DECISION". */
export function TechnologySection() {
  return (
    <Section
      index={4}
      id="technology"
      codename="TRACE A DECISION"
      title="No black box on this diagram"
    >
      <p className={styles.framing}>{TECHNOLOGY_STATEMENT}</p>

      <ol className={styles.graph} aria-label="Decision pipeline">
        {DECISION_GRAPH.map((node, i) => (
          <li key={node.id} className={styles.node}>
            <p className="label">{node.label}</p>
            <p className={styles.nodeSpec}>{node.spec}</p>
            <p className={`mono ${styles.nodeLatency}`}>
              t+{node.latency}
            </p>
            {i < DECISION_GRAPH.length - 1 ? (
              <span className={styles.nodeArrow} aria-hidden="true">
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </Section>
  );
}

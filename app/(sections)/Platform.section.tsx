import { Section } from "@/components/section/Section";
import { PLATFORM_PARTS, PLATFORM_STATEMENT } from "@/content/systems";
import styles from "./sections.module.css";

/**
 * SEC.05 — ROBOTICS PLATFORM · "EXPLODED VIEW".
 * The exploded 3D set-piece mounts into the stage in Stage 3/4;
 * callouts below are the semantic source of truth.
 */
export function PlatformSection() {
  return (
    <Section
      index={5}
      id="platform"
      codename="EXPLODED VIEW"
      title="One platform, four environments"
    >
      <p className={styles.framing}>{PLATFORM_STATEMENT}</p>

      {/* Reserved stage for the exploded-view choreography */}
      <div className={styles.platformStage} aria-hidden="true" data-platform-stage />

      <ul className={styles.callouts} aria-label="Platform components">
        {PLATFORM_PARTS.map((part) => (
          <li key={part.id} className={styles.callout}>
            <p className={`mono ${styles.calloutCode}`}>{part.code}</p>
            <p className={`label ${styles.calloutLabel}`}>{part.label}</p>
            <p className={styles.calloutMaterial}>{part.material}</p>
            <p className={`mono ${styles.calloutTolerance}`}>{part.tolerance}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

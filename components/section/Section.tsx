import styles from "./Section.module.css";

interface SectionProps {
  /** 1-based section index — rendered as SEC.NN / 14. */
  index: number;
  id: string;
  /** Operational codename, e.g. "THE LOG". */
  codename: string;
  title: string;
  children: React.ReactNode;
}

const TOTAL_SECTIONS = 14;

/**
 * Shared section shell: measurement-rule divider, mono sector label,
 * display title. Semantic <section> with aria-labelledby for a11y/SEO.
 */
export function Section({ index, id, codename, title, children }: SectionProps) {
  const num = String(index).padStart(2, "0");
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={styles.section}
      data-section={num}
    >
      <header className={styles.header}>
        <p className="label">
          <span aria-hidden="true">&gt; </span>SEC.{num} / {TOTAL_SECTIONS} —{" "}
          {codename}
        </p>
        <h2 id={`${id}-title`} className={styles.title}>
          {title}
        </h2>
      </header>
      {children}
    </section>
  );
}

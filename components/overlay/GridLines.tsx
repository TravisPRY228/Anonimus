import styles from "./GridLines.module.css";

/**
 * Fixed hairline grid — the "technical drawing" substrate.
 * Pure CSS, server-rendered, aria-hidden (decorative).
 * Columns collapse from 12 → 6 → 4 with the layout grid.
 */
export function GridLines() {
  return (
    <div className={styles.grid} aria-hidden="true">
      {Array.from({ length: 13 }, (_, i) => (
        <span key={i} className={styles.line} />
      ))}
    </div>
  );
}

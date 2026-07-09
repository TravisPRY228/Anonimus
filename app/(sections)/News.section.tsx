import { Section } from "@/components/section/Section";
import { NEWS } from "@/content/updates";
import styles from "./sections.module.css";

/** SEC.13 — NEWS · "UPDATES LOG". */
export function NewsSection() {
  return (
    <Section index={13} id="news" codename="UPDATES LOG" title="Moving now">
      <ul className={styles.news} aria-label="News log">
        {NEWS.map((item) => (
          <li key={item.headline} className={styles.newsItem}>
            <p className={`mono ${styles.newsDate}`}>
              {item.date}
              {item.isNew ? (
                <span className={`mono ${styles.newsNew}`}> NEW</span>
              ) : null}
            </p>
            <div>
              <h3 className={styles.newsHeadline}>{item.headline}</h3>
              <p className={styles.newsSummary}>
                {item.summary}{" "}
                <span className={`mono ${styles.newsSource}`}>
                  — {item.source}
                </span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

"use client";

import { useLenis } from "@/experience/scroll/LenisProvider";
import styles from "./Nav.module.css";
import { SoundToggle } from "./SoundToggle";

interface NavLink {
  num: string;
  label: string;
  href: string;
}

const LINKS: NavLink[] = [
  { num: "02", label: "ABOUT", href: "#about" },
  { num: "05", label: "PLATFORM", href: "#platform" },
  { num: "08", label: "PRODUCTS", href: "#products" },
  { num: "12", label: "CAREERS", href: "#careers" },
  { num: "14", label: "CONTACT", href: "#contact" },
];

/**
 * Fixed instrument-bar navigation. Anchors scroll through Lenis
 * when available, native smooth-scroll otherwise.
 */
export function Nav() {
  const lenis = useLenis();

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!lenis) return; // native anchor behavior
    event.preventDefault();
    lenis.scrollTo(href, { duration: 1.6 });
  };

  return (
    <nav className={styles.nav} aria-label="Main">
      <a
        href="#hero"
        className={`display ${styles.wordmark}`}
        onClick={(e) => handleClick(e, "#hero")}
      >
        NEXUS<span className={styles.wordmarkTail}>⁝</span>
      </a>
      <div className={styles.right}>
        <ul className={styles.links}>
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`mono ${styles.link}`}
                onClick={(e) => handleClick(e, link.href)}
              >
                <span className={styles.linkNum}>{link.num}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <SoundToggle />
      </div>
    </nav>
  );
}

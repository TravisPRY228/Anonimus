import styles from "./sections.module.css";

/**
 * Static hero fallback — a technical line drawing of NEXUS-M.
 * Shown when the live 3D scene is unavailable: low-tier devices,
 * no-JS, or before tier detection. Pure inline SVG, zero cost.
 * Hidden automatically once the canvas mounts (html[data-tier]).
 */
export function HeroSchematic() {
  return (
    <svg
      className={styles.heroSchematic}
      viewBox="0 0 320 460"
      fill="none"
      aria-hidden="true"
      data-hero-schematic
    >
      {/* measurement frame */}
      <rect
        x="24"
        y="16"
        width="272"
        height="428"
        stroke="currentColor"
        strokeOpacity="0.14"
      />
      <line x1="24" y1="52" x2="16" y2="52" stroke="currentColor" strokeOpacity="0.3" />
      <line x1="24" y1="408" x2="16" y2="408" stroke="currentColor" strokeOpacity="0.3" />
      <text x="4" y="234" fill="currentColor" fillOpacity="0.4" fontSize="9" fontFamily="var(--font-mono)" transform="rotate(-90 10 230)">
        1.82 m
      </text>

      {/* head */}
      <rect x="141" y="52" width="38" height="38" rx="6" stroke="currentColor" strokeOpacity="0.75" />
      <rect x="150" y="64" width="20" height="6" fill="#00ff66" fillOpacity="0.85" />
      <circle cx="160" cy="46" r="10" stroke="currentColor" strokeOpacity="0.4" />
      {/* neck */}
      <line x1="160" y1="90" x2="160" y2="102" stroke="currentColor" strokeOpacity="0.6" />

      {/* torso */}
      <rect x="122" y="102" width="76" height="74" rx="8" stroke="currentColor" strokeOpacity="0.75" />
      <rect x="132" y="112" width="56" height="50" rx="4" stroke="currentColor" strokeOpacity="0.35" />
      <rect x="128" y="108" width="5" height="5" fill="#00ff66" />
      {/* abdomen + pelvis */}
      <rect x="138" y="176" width="44" height="26" rx="5" stroke="currentColor" strokeOpacity="0.6" />
      <rect x="130" y="202" width="60" height="22" rx="5" stroke="currentColor" strokeOpacity="0.75" />

      {/* arms */}
      <circle cx="108" cy="114" r="11" stroke="currentColor" strokeOpacity="0.75" />
      <circle cx="212" cy="114" r="11" stroke="currentColor" strokeOpacity="0.75" />
      <line x1="106" y1="125" x2="100" y2="168" stroke="currentColor" strokeOpacity="0.6" strokeWidth="7" />
      <line x1="214" y1="125" x2="220" y2="168" stroke="currentColor" strokeOpacity="0.6" strokeWidth="7" />
      <circle cx="99" cy="176" r="8" stroke="currentColor" strokeOpacity="0.75" />
      <circle cx="221" cy="176" r="8" stroke="currentColor" strokeOpacity="0.75" />
      <line x1="97" y1="184" x2="92" y2="224" stroke="currentColor" strokeOpacity="0.6" strokeWidth="6" />
      <line x1="223" y1="184" x2="228" y2="224" stroke="currentColor" strokeOpacity="0.6" strokeWidth="6" />
      <rect x="85" y="226" width="13" height="20" rx="3" stroke="currentColor" strokeOpacity="0.6" />
      <rect x="222" y="226" width="13" height="20" rx="3" stroke="currentColor" strokeOpacity="0.6" />

      {/* legs */}
      <circle cx="143" cy="232" r="10" stroke="currentColor" strokeOpacity="0.75" />
      <circle cx="177" cy="232" r="10" stroke="currentColor" strokeOpacity="0.75" />
      <line x1="142" y1="242" x2="140" y2="304" stroke="currentColor" strokeOpacity="0.6" strokeWidth="8" />
      <line x1="178" y1="242" x2="180" y2="304" stroke="currentColor" strokeOpacity="0.6" strokeWidth="8" />
      <circle cx="140" cy="312" r="9" stroke="currentColor" strokeOpacity="0.75" />
      <circle cx="180" cy="312" r="9" stroke="currentColor" strokeOpacity="0.75" />
      <line x1="139" y1="321" x2="138" y2="378" stroke="currentColor" strokeOpacity="0.6" strokeWidth="7" />
      <line x1="181" y1="321" x2="182" y2="378" stroke="currentColor" strokeOpacity="0.6" strokeWidth="7" />
      <rect x="126" y="380" width="26" height="10" rx="2" stroke="currentColor" strokeOpacity="0.75" />
      <rect x="168" y="380" width="26" height="10" rx="2" stroke="currentColor" strokeOpacity="0.75" />

      {/* joint LEDs */}
      <circle cx="99" cy="176" r="2" fill="#00ff66" />
      <circle cx="221" cy="176" r="2" fill="#00ff66" />
      <circle cx="140" cy="312" r="2" fill="#00ff66" />
      <circle cx="180" cy="312" r="2" fill="#00ff66" />

      {/* platform */}
      <ellipse cx="160" cy="398" rx="86" ry="14" stroke="#00ff66" strokeOpacity="0.5" />

      {/* callout leaders */}
      <line x1="179" y1="67" x2="252" y2="67" stroke="currentColor" strokeOpacity="0.3" />
      <text x="256" y="70" fill="currentColor" fillOpacity="0.5" fontSize="8" fontFamily="var(--font-mono)">
        NX-SNS-11
      </text>
      <line x1="198" y1="139" x2="252" y2="139" stroke="currentColor" strokeOpacity="0.3" />
      <text x="256" y="142" fill="currentColor" fillOpacity="0.5" fontSize="8" fontFamily="var(--font-mono)">
        NX-ACT-28
      </text>
      <line x1="122" y1="139" x2="68" y2="139" stroke="currentColor" strokeOpacity="0.3" />
      <text x="30" y="134" fill="currentColor" fillOpacity="0.5" fontSize="8" fontFamily="var(--font-mono)">
        NX-SPN-01
      </text>
    </svg>
  );
}

/**
 * NEXUS ROBOTICS — product datasheets. SEC.08.
 */

export interface SpecRow {
  key: string;
  value: string;
  /** The one green-highlighted row per datasheet. */
  highlight?: boolean;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  domain: string;
  summary: string;
  specs: SpecRow[];
}

export const PRODUCTS: Product[] = [
  {
    id: "nexus-m",
    code: "NX-M",
    name: "NEXUS-M",
    domain: "Manufacturing",
    summary:
      "Modular humanoid platform for live production lines. Works the night shift, documents every decision.",
    specs: [
      { key: "HEIGHT", value: "1.82 m" },
      { key: "MASS", value: "128 kg" },
      { key: "PAYLOAD", value: "40 kg" },
      { key: "ACTUATORS", value: "28" },
      { key: "CONTINUOUS DUTY", value: "14 h", highlight: true },
      { key: "INGRESS RATING", value: "IP54" },
      { key: "DECISION LATENCY", value: "3 ms" },
    ],
  },
  {
    id: "nexus-s",
    code: "NX-S",
    name: "NEXUS-S",
    domain: "Medical",
    summary:
      "Surgical-assist micro-robotics for clinical environments. Sterile-rated, ethics-board-auditable.",
    specs: [
      { key: "REPEATABILITY", value: "0.1 mm", highlight: true },
      { key: "FORCE RESOLUTION", value: "0.05 N" },
      { key: "OVERRIDE LATENCY", value: "3 ms" },
      { key: "STERILE RATING", value: "ISO 14644-1 class 5" },
      { key: "MASS", value: "46 kg" },
      { key: "AUDIT COVERAGE", value: "100%" },
    ],
  },
  {
    id: "nexus-d",
    code: "NX-D",
    name: "NEXUS-D",
    domain: "Ocean",
    summary:
      "Deep-sea autonomous research unit. Free-swimming, three weeks without a surface link.",
    specs: [
      { key: "DEPTH RATING", value: "6,000 m", highlight: true },
      { key: "AUTONOMY", value: "21 days" },
      { key: "HOUSING", value: "Titanium grade 5" },
      { key: "SURVEY RATE", value: "90 km²/day" },
      { key: "ACOUSTIC CHECK-IN", value: "every 72 h" },
      { key: "BUOYANCY TRIM", value: "automatic" },
    ],
  },
  {
    id: "nexus-x",
    code: "NX-X",
    name: "NEXUS-X",
    domain: "Space",
    summary:
      "Orbital-grade autonomous system for satellite servicing. Vacuum-qualified, radiation-tolerant.",
    specs: [
      { key: "THERMAL ENVELOPE", value: "−150…+120 °C", highlight: true },
      { key: "QUALIFICATION", value: "400 h thermal-vacuum" },
      { key: "RADIATION TOLERANCE", value: "SEU 1/10⁹ decisions" },
      { key: "MANIPULATION", value: "dual 7-DOF arms" },
      { key: "MASS", value: "94 kg" },
      { key: "POWER", value: "solar + solid-state buffer" },
    ],
  },
];

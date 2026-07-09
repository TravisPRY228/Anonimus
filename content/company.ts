/**
 * NEXUS ROBOTICS — company narrative content.
 * All copy is fictional portfolio content, written in the FRAME voice:
 * terse, declarative, data-forward. No exclamation points. No "revolutionary".
 */

export const HERO = {
  statusLine: "SYSTEM ONLINE",
  headline: ["No simulations.", "Only deployments."],
  sub: "Autonomous humanoid systems for manufacturing, medicine, deep-sea research and orbital operations.",
  telemetry: [
    { key: "TORQUE", value: "42.1 Nm" },
    { key: "LATENCY", value: "3 ms" },
    { key: "UPTIME", value: "99.998%" },
    { key: "ACTUATORS", value: "28/28" },
  ],
  bootSequence: [
    "INITIALIZING SENSOR ARRAY … OK",
    "CALIBRATING GYRO … OK",
    "ACTUATOR ARRAY … 28/28",
    "DECISION TRACE … ARMED",
    "SYSTEM ONLINE",
  ],
} as const;

export interface LogRecord {
  date: string;
  text: string;
  detail?: string;
}

/** SEC.02 — origin story as field records, not prose. */
export const ORIGIN_LOG: LogRecord[] = [
  {
    date: "2019.03",
    text: "4 engineers. 1 workshop. 0 press releases.",
    detail: "Founders left aerospace, surgical and automotive robotics divisions the same quarter.",
  },
  {
    date: "2019.11",
    text: "First actuator array survives 10⁶-cycle stress test.",
    detail: "Bench 4, revision C. Two previous revisions documented as failed.",
  },
  {
    date: "2020.06",
    text: "NEXUS-M prototype stands unassisted. 11 seconds.",
    detail: "Balance recovery logged, traced, reproduced 40 times the same week.",
  },
  {
    date: "2021.02",
    text: "First closed deployment: weld inspection line, Stuttgart.",
    detail: "No announcement. Client NDA lifted 2023.",
  },
  {
    date: "2021.09",
    text: "Decision-trace architecture v1 documented and reproducible.",
    detail: "Every actuation traceable to a sensor state and a policy version.",
  },
  {
    date: "2022.04",
    text: "NEXUS-S enters clinical simulation trials.",
    detail: "0.1 mm repeatability under surgical glove constraint.",
  },
  {
    date: "2023.01",
    text: "NEXUS-D reaches 2,400 m depth. 14-day autonomous survey.",
    detail: "No surface link for 11 of 14 days. Full audit log recovered.",
  },
  {
    date: "2023.10",
    text: "Series B closed. Zero marketing spend to date.",
    detail: "Round led by industrial partners already running deployments.",
  },
  {
    date: "2024.05",
    text: "NEXUS-X passes thermal-vacuum qualification.",
    detail: "−150 °C to +120 °C. 400 hours continuous operation.",
  },
  {
    date: "2025.02",
    text: "28-actuator platform enters serial production.",
    detail: "Unit cost down 61% against prototype baseline.",
  },
  {
    date: "2026.01",
    text: "40 deployments across 4 industries. Still no simulations.",
  },
];

/** SEC.03 — the creed. */
export const MISSION = {
  manifesto: "Transparent autonomy.",
  principles: [
    "Show the work, not the pitch.",
    "Specs over adjectives.",
    "If it cannot survive a stress test, it does not ship.",
    "Design is engineering made legible.",
  ],
} as const;

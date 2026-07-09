/**
 * NEXUS ROBOTICS — operations content.
 * SEC.06 (Industries), SEC.07 (Research Lab), SEC.10 (Case Studies).
 */

export interface Industry {
  id: string;
  name: string;
  metricKey: string;
  metricValue: string;
  context: string;
}

/** SEC.06 — four worlds. */
export const INDUSTRIES: Industry[] = [
  {
    id: "manufacturing",
    name: "Manufacturing",
    metricKey: "LINE DOWNTIME",
    metricValue: "−38%",
    context: "Weld inspection, part transfer, night-shift QA on live production lines.",
  },
  {
    id: "medical",
    name: "Medical",
    metricKey: "INSTRUMENT PRECISION",
    metricValue: "0.1 mm",
    context: "Surgical assistance and sterile logistics in clinical environments.",
  },
  {
    id: "ocean",
    name: "Ocean",
    metricKey: "MAX SURVEY DEPTH",
    metricValue: "6,000 m",
    context: "Autonomous seabed mapping and long-duration under-ice research.",
  },
  {
    id: "space",
    name: "Space",
    metricKey: "THERMAL ENVELOPE",
    metricValue: "−150…+120 °C",
    context: "Orbital servicing rehearsals and vacuum-qualified manipulation.",
  },
];

export type LabStatus = "VALIDATED" | "IN PROGRESS" | "FAILED";

export interface LabNote {
  id: string;
  title: string;
  status: LabStatus;
  method: string;
  result: string;
}

/** SEC.07 — open lab notes. Failures are shown on purpose. */
export const LAB_NOTES: LabNote[] = [
  {
    id: "gait-recovery",
    title: "Gait recovery on unstable substrate",
    status: "VALIDATED",
    method: "600 perturbation trials on gravel, ice sheet and 12° inclines.",
    result: "Recovery within 0.8 s in 97.2% of trials. Shipped in policy v4.1.",
  },
  {
    id: "subzero-lube",
    title: "Sub-zero actuator lubrication",
    status: "FAILED",
    method: "Synthetic lubricant matrix tested at −40 °C, 200-hour duty cycle.",
    result: "Viscosity drift exceeded tolerance at hour 71. Reformulating. Log public.",
  },
  {
    id: "mono-depth",
    title: "Monocular depth redundancy",
    status: "IN PROGRESS",
    method: "Fallback depth estimation when one stereo channel is occluded.",
    result: "Current error 4.1% at 10 m. Target: 2% before field trial.",
  },
  {
    id: "rad-inference",
    title: "Radiation-hardened inference module",
    status: "IN PROGRESS",
    method: "Triple-redundant policy execution under simulated SEU injection.",
    result: "Silent-corruption rate 1 in 10⁹ decisions. Target: 1 in 10¹².",
  },
  {
    id: "tactile-glove",
    title: "Tactile feedback under glove constraint",
    status: "VALIDATED",
    method: "Force-gradient sensing through two layers of surgical nitrile.",
    result: "0.05 N resolution maintained. Integrated into NEXUS-S rev D.",
  },
  {
    id: "acoustic-diag",
    title: "Acoustic self-diagnosis",
    status: "FAILED",
    method: "Bearing-wear detection from actuator sound signatures alone.",
    result: "False-positive rate 22% on factory floors. Shelved, data retained.",
  },
];

export interface CaseMetric {
  key: string;
  value: string;
}

export interface CaseStudy {
  id: string;
  index: string;
  title: string;
  client: string;
  context: string;
  task: string;
  deployment: string;
  metrics: CaseMetric[];
  headline: CaseMetric;
}

/** SEC.10 — field reports. */
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "stuttgart",
    index: "CASE 01",
    title: "Weld inspection, automotive line",
    client: "Tier-1 automotive manufacturer · Stuttgart",
    context:
      "A body-in-white line running 3 shifts. Manual weld QA created a bottleneck at station 14 and defect escapes surfaced downstream.",
    task: "Continuous inline inspection without slowing the takt time.",
    deployment:
      "2× NEXUS-M units, 16 weeks, integrated with the existing MES. Decision traces exposed to the client QA team from day one.",
    metrics: [
      { key: "DEFECT ESCAPES", value: "−91%" },
      { key: "TAKT IMPACT", value: "0.0 s" },
      { key: "AUDIT COVERAGE", value: "100%" },
    ],
    headline: { key: "LINE DOWNTIME", value: "−38%" },
  },
  {
    id: "seoul",
    index: "CASE 02",
    title: "Laparoscopic assist pilot",
    client: "University hospital · Seoul",
    context:
      "Long laparoscopic procedures degrade instrument-holding steadiness. The clinic required a system with a full decision audit for its ethics board.",
    task: "Stable instrument positioning with surgeon override at zero latency.",
    deployment:
      "1× NEXUS-S, 9-month supervised pilot, 140 procedures. Every actuation logged and reviewed weekly with clinical staff.",
    metrics: [
      { key: "PROCEDURE TIME", value: "−17%" },
      { key: "OVERRIDE LATENCY", value: "3 ms" },
      { key: "ADVERSE EVENTS", value: "0" },
    ],
    headline: { key: "INSTRUMENT PRECISION", value: "+12%" },
  },
  {
    id: "hadal",
    index: "CASE 03",
    title: "Hadal survey, forearc basin",
    client: "Oceanographic research consortium",
    context:
      "A seismically active forearc basin required repeated bathymetric passes too deep and too long for tethered vehicles.",
    task: "21-day autonomous survey with no surface link for most of the mission.",
    deployment:
      "1× NEXUS-D, free-swimming, acoustic check-ins every 72 h. Full audit log recovered and published with the survey data.",
    metrics: [
      { key: "SEABED MAPPED", value: "1,900 km²" },
      { key: "SURFACE LINK", value: "3 of 21 days" },
      { key: "DATA RECOVERY", value: "100%" },
    ],
    headline: { key: "AUTONOMOUS DURATION", value: "21 days" },
  },
];

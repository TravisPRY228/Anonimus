/**
 * NEXUS ROBOTICS — chronology content. SEC.09 (Timeline), SEC.13 (News).
 */

export interface Milestone {
  year: string;
  title: string;
  detail: string;
}

/** SEC.09 — trajectory ticks, 2019 → 2026. */
export const MILESTONES: Milestone[] = [
  {
    year: "2019",
    title: "Founded",
    detail: "4 engineers, 1 workshop, a stress bench and a documentation rule.",
  },
  {
    year: "2020",
    title: "First stand",
    detail: "NEXUS-M prototype balances unassisted. 11 seconds, fully traced.",
  },
  {
    year: "2021",
    title: "First deployment",
    detail: "Closed weld-inspection contract, Stuttgart. Zero press.",
  },
  {
    year: "2022",
    title: "Clinical trials",
    detail: "NEXUS-S enters supervised surgical simulation.",
  },
  {
    year: "2023",
    title: "2,400 m",
    detail: "NEXUS-D completes a 14-day autonomous deep survey.",
  },
  {
    year: "2024",
    title: "Vacuum-qualified",
    detail: "NEXUS-X passes 400-hour thermal-vacuum qualification.",
  },
  {
    year: "2025",
    title: "Serial production",
    detail: "28-actuator platform ships at scale. Unit cost −61%.",
  },
  {
    year: "2026",
    title: "40 deployments",
    detail: "Four industries. One auditable platform.",
  },
];

export interface NewsItem {
  date: string;
  headline: string;
  source: string;
  summary: string;
  isNew?: boolean;
}

/** SEC.13 — updates log, reverse-chronological. */
export const NEWS: NewsItem[] = [
  {
    date: "2026.06",
    headline: "NEXUS-X completes second orbital servicing rehearsal",
    source: "IEEE Spectrum",
    summary: "Dual-arm capture of a non-cooperative target, full trace published.",
    isNew: true,
  },
  {
    date: "2026.04",
    headline: "Decision-trace audit format opened for third-party review",
    source: "Company release",
    summary: "The audit-log specification is now publicly documented.",
  },
  {
    date: "2026.02",
    headline: "NEXUS-D begins Arctic under-ice survey program",
    source: "Reuters",
    summary: "Three-vehicle campaign, 60 days planned under the ice shelf.",
  },
  {
    date: "2025.12",
    headline: "Series C led by existing industrial partners",
    source: "Financial Times",
    summary: "Every lead investor already operates NEXUS units in production.",
  },
  {
    date: "2025.09",
    headline: "Public failure log passes 100 documented entries",
    source: "Company release",
    summary: "Sub-zero lubrication remains the most-read failure report.",
  },
];

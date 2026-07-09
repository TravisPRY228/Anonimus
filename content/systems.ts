/**
 * NEXUS ROBOTICS — technical systems content.
 * SEC.04 (AI Technology) and SEC.05 (Robotics Platform).
 */

export interface GraphNode {
  id: string;
  label: string;
  spec: string;
  latency: string;
}

/** SEC.04 — the decision graph: SENSOR → PERCEPTION → INFERENCE → ACTION → AUDIT. */
export const DECISION_GRAPH: GraphNode[] = [
  {
    id: "sensor",
    label: "SENSOR ARRAY",
    spec: "LIDAR ×2 · stereo vision · IMU 9-axis · joint torque ×28",
    latency: "0.4 ms",
  },
  {
    id: "perception",
    label: "PERCEPTION",
    spec: "Fused world model · 120 Hz refresh · redundancy-checked",
    latency: "1.1 ms",
  },
  {
    id: "inference",
    label: "INFERENCE",
    spec: "Policy engine v4.2 · versioned · deterministic replay",
    latency: "0.9 ms",
  },
  {
    id: "action",
    label: "ACTION",
    spec: "28-channel actuation bus · torque-limited envelopes",
    latency: "0.6 ms",
  },
  {
    id: "audit",
    label: "AUDIT LOG",
    spec: "Every decision written before it executes. Immutable.",
    latency: "0.0 ms",
  },
];

export const TECHNOLOGY_STATEMENT =
  "Every decision a NEXUS unit makes can be traced to a sensor state, a policy version and a timestamp. The audit log is written before the actuator moves. There is no black box on this diagram.";

export interface PlatformPart {
  id: string;
  code: string;
  label: string;
  material: string;
  tolerance: string;
}

/** SEC.05 — exploded-view callouts. */
export const PLATFORM_PARTS: PlatformPart[] = [
  {
    id: "actuators",
    code: "NX-ACT-28",
    label: "ACTUATOR ARRAY ×28",
    material: "Anodized aluminum housing, harmonic drive",
    tolerance: "±0.02°",
  },
  {
    id: "lidar",
    code: "NX-LDR-02",
    label: "LIDAR ARRAY",
    material: "Dual solid-state units, 270° combined field",
    tolerance: "±5 mm @ 40 m",
  },
  {
    id: "spine",
    code: "NX-SPN-01",
    label: "CARBON SPINE",
    material: "Filament-wound carbon fiber, titanium joints",
    tolerance: "40 kg payload rated",
  },
  {
    id: "core",
    code: "NX-THR-04",
    label: "THERMAL CORE",
    material: "Liquid loop, passive radiator panels",
    tolerance: "−20 °C to +45 °C ambient",
  },
  {
    id: "cell",
    code: "NX-PWR-09",
    label: "POWER CELL",
    material: "Hot-swappable solid-state pack",
    tolerance: "14 h continuous duty",
  },
  {
    id: "cluster",
    code: "NX-SNS-11",
    label: "SENSOR CLUSTER",
    material: "Instrument head: stereo cameras, aperture optics",
    tolerance: "120 Hz fused refresh",
  },
];

export const PLATFORM_STATEMENT =
  "One platform. Four environments. The chassis is identical from the factory floor to low orbit — only the skin, seals and thermal envelope change.";

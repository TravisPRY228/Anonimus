/**
 * NEXUS ROBOTICS — people content. SEC.11 (Leadership), SEC.12 (Careers).
 */

export interface Person {
  id: string;
  name: string;
  role: string;
  background: string;
  credential: string;
}

/** SEC.11 — team by expertise, not smiles. */
export const LEADERSHIP: Person[] = [
  {
    id: "okafor",
    name: "E. Okafor",
    role: "Chief Executive",
    background: "ex-Orbital GNC",
    credential: "Led guidance systems on 3 flown orbital vehicles.",
  },
  {
    id: "lindqvist",
    name: "M. Lindqvist",
    role: "Chief Technology Officer",
    background: "ex-Surgical Systems",
    credential: "14 patents in force-feedback micro-actuation.",
  },
  {
    id: "tanaka",
    name: "R. Tanaka",
    role: "Chief Platform Officer",
    background: "ex-Automotive Robotics",
    credential: "Scaled a 6-axis platform from prototype to 40,000 units.",
  },
  {
    id: "petrov",
    name: "A. Petrov",
    role: "Head of Autonomy",
    background: "ex-Defense Systems",
    credential: "Authored the decision-trace architecture, v1 through v4.",
  },
  {
    id: "moreau",
    name: "S. Moreau",
    role: "VP Field Operations",
    background: "ex-Subsea Engineering",
    credential: "Ran 200+ deep-water deployments without a lost vehicle.",
  },
];

export const CULTURE_PRINCIPLES = [
  "We ship.",
  "We document.",
  "We stress-test.",
] as const;

export interface Role {
  id: string;
  title: string;
  location: string;
  responsibilities: string[];
}

/** SEC.12 — open roles as a terminal list. */
export const ROLES: Role[] = [
  {
    id: "actuation",
    title: "Senior Actuation Engineer",
    location: "Munich",
    responsibilities: [
      "Own the harmonic-drive actuator line, revision E and onward.",
      "Design and run 10⁶-cycle stress protocols.",
      "Document failures as thoroughly as successes.",
    ],
  },
  {
    id: "perception",
    title: "Perception Systems Engineer",
    location: "Zurich",
    responsibilities: [
      "Fuse LIDAR, stereo and torque channels into one world model.",
      "Hold the 120 Hz refresh under degraded-sensor conditions.",
      "Make every estimate auditable.",
    ],
  },
  {
    id: "firmware",
    title: "Embedded Firmware Engineer, Safety",
    location: "Munich",
    responsibilities: [
      "Own torque-limit envelopes across all four platforms.",
      "Write firmware a regulator can read.",
      "Break your own code before the field does.",
    ],
  },
  {
    id: "field",
    title: "Field Deployment Engineer",
    location: "Rotating",
    responsibilities: [
      "Commission units on factory floors, in clinics, at sea.",
      "Train client teams on decision-trace review.",
      "Feed field failures back into the lab within 48 hours.",
    ],
  },
  {
    id: "writer",
    title: "Technical Writer, Systems Documentation",
    location: "Remote",
    responsibilities: [
      "Turn engineering logs into documents clients can audit.",
      "Keep the public failure log honest and current.",
      "Guard the voice: terse, declarative, data-forward.",
    ],
  },
];

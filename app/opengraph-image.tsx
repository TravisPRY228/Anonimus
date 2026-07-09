import { ImageResponse } from "next/og";

export const alt =
  "NEXUS Robotics — No simulations. Only deployments.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated OG card in the FRAME aesthetic — a classified file
 * that happens to be shareable. System fonts only (edge-safe).
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          padding: 56,
          fontFamily: "monospace",
        }}
      >
        {/* frame */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            border: "1px solid rgba(255,255,255,0.18)",
            display: "flex",
          }}
        />

        {/* header row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "rgba(232,232,230,0.65)",
            fontSize: 22,
            letterSpacing: 4,
          }}
        >
          <span>NEXUS ROBOTICS — ACCESS FILE</span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: "#00ff66",
            }}
          >
            <span
              style={{
                width: 14,
                height: 14,
                background: "#00ff66",
                display: "flex",
              }}
            />
            SYSTEM ONLINE
          </span>
        </div>

        {/* headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#ffffff",
            fontSize: 92,
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: -2,
            fontFamily: "sans-serif",
          }}
        >
          <span>NO SIMULATIONS.</span>
          <span>ONLY DEPLOYMENTS.</span>
        </div>

        {/* telemetry row */}
        <div
          style={{
            display: "flex",
            gap: 40,
            color: "rgba(232,232,230,0.5)",
            fontSize: 20,
            letterSpacing: 2,
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: 24,
          }}
        >
          <span>TORQUE 42.1 Nm</span>
          <span>LATENCY 3 ms</span>
          <span>UPTIME 99.998%</span>
          <span>ACTUATORS 28/28</span>
          <span style={{ color: "#00ff66" }}>SEC.01–14 / CLEARED</span>
        </div>
      </div>
    ),
    size,
  );
}

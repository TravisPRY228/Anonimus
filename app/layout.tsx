import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Instrument_Sans,
  Space_Mono,
} from "next/font/google";
import { ExperienceProvider } from "@/experience/ExperienceProvider";
import { LenisProvider } from "@/experience/scroll/LenisProvider";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

/**
 * Three typographic voices (FRAME system):
 * — display: Bricolage Grotesque — heavy caps with ink traps;
 *   reads as commissioned lettering, not a template default
 * — mono:    Space Mono — the instrument voice: every number,
 *   label, log and telemetry line. Editorial, not code-editor.
 * — body:    Instrument Sans — long-form reading only
 */
const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const mono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const body = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const SITE_NAME = "NEXUS Robotics";
const SITE_DESCRIPTION =
  "NEXUS Robotics builds autonomous humanoid systems for manufacturing, medicine, deep-sea research and orbital operations. Transparent autonomy — every decision documented, testable, reproducible.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — No Simulations. Only Deployments.`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "robotics",
    "humanoid robots",
    "autonomous systems",
    "industrial robotics",
    "surgical robotics",
    "deep-sea robotics",
    "orbital robotics",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — No Simulations. Only Deployments.`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — No Simulations. Only Deployments.`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${mono.variable} ${body.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ExperienceProvider />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}

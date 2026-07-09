import { AboutSection } from "@/app/(sections)/About.section";
import { CareersSection } from "@/app/(sections)/Careers.section";
import { CaseStudiesSection } from "@/app/(sections)/CaseStudies.section";
import { ContactSection } from "@/app/(sections)/Contact.section";
import { HeroSection } from "@/app/(sections)/Hero.section";
import { IndustriesSection } from "@/app/(sections)/Industries.section";
import { LabSection } from "@/app/(sections)/Lab.section";
import { LeadershipSection } from "@/app/(sections)/Leadership.section";
import { MissionSection } from "@/app/(sections)/Mission.section";
import { NewsSection } from "@/app/(sections)/News.section";
import { PlatformSection } from "@/app/(sections)/Platform.section";
import { ProductsSection } from "@/app/(sections)/Products.section";
import { TechnologySection } from "@/app/(sections)/Technology.section";
import { TimelineSection } from "@/app/(sections)/Timeline.section";
import { GridLines } from "@/components/overlay/GridLines";
import { Nav } from "@/components/overlay/Nav";
import { buildStructuredData } from "@/lib/seo";
import styles from "./page.module.css";

/**
 * NEXUS ROBOTICS — single-page composition.
 * 14 sections, one continuous inspection session.
 * All content is server-rendered; the 3D layer mounts over it in Stage 3.
 */
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildStructuredData()),
        }}
      />
      <GridLines />
      <Nav />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <MissionSection />
        <TechnologySection />
        <PlatformSection />
        <IndustriesSection />
        <LabSection />
        <ProductsSection />
        <TimelineSection />
        <CaseStudiesSection />
        <LeadershipSection />
        <CareersSection />
        <NewsSection />
        <ContactSection />
      </main>
      <footer className={styles.footer}>
        <p className="label">NEXUS ROBOTICS — SESSION COMPLETE</p>
        <p className={`mono ${styles.footerNote}`}>
          Fictional company. Portfolio demonstration.
        </p>
      </footer>
    </>
  );
}

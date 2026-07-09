import { Section } from "@/components/section/Section";
import { ContactForm } from "@/components/ui/ContactForm";

/**
 * SEC.14 — CONTACT · "REQUEST CLEARANCE".
 * Server-rendered accessible form; the transmission simulation
 * (TRANSMITTING… → RECEIVED ✓) is layered on in Stage 4.
 */
export function ContactSection() {
  return (
    <Section
      index={14}
      id="contact"
      codename="REQUEST CLEARANCE"
      title="Request clearance"
    >
      <ContactForm />
    </Section>
  );
}

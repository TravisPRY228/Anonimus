"use client";

import { useState } from "react";
import styles from "@/app/(sections)/sections.module.css";

type TransmitState = "idle" | "transmitting" | "received";

/**
 * SEC.14 form logic: REQUEST CLEARANCE → TRANSMITTING… → RECEIVED ✓
 * Portfolio demo — no backend; the transmission is simulated.
 * Accessible: status announced via aria-live, fields disabled in flight.
 */
export function ContactForm() {
  const [state, setState] = useState<TransmitState>("idle");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state !== "idle") return;
    setState("transmitting");
    window.setTimeout(() => setState("received"), 1100);
  };

  const disabled = state !== "idle";

  return (
    <form className={styles.contactForm} onSubmit={onSubmit}>
      <div className={styles.field}>
        <label className="label" htmlFor="contact-org">
          Organization
        </label>
        <input
          className={`mono ${styles.input}`}
          id="contact-org"
          name="organization"
          type="text"
          autoComplete="organization"
          disabled={disabled}
          required
        />
      </div>

      <div className={styles.field}>
        <label className="label" htmlFor="contact-email">
          Email
        </label>
        <input
          className={`mono ${styles.input}`}
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          disabled={disabled}
          required
        />
      </div>

      <div className={styles.field}>
        <label className="label" htmlFor="contact-domain">
          Domain
        </label>
        <select
          className={`mono ${styles.input}`}
          id="contact-domain"
          name="domain"
          defaultValue=""
          disabled={disabled}
          required
        >
          <option value="" disabled>
            SELECT —
          </option>
          <option value="manufacturing">MANUFACTURING</option>
          <option value="medical">MEDICAL</option>
          <option value="ocean">OCEAN</option>
          <option value="space">SPACE</option>
        </select>
      </div>

      <div className={styles.field}>
        <label className="label" htmlFor="contact-message">
          Message
        </label>
        <textarea
          className={`mono ${styles.input}`}
          id="contact-message"
          name="message"
          rows={5}
          disabled={disabled}
          required
        />
      </div>

      <button
        type="submit"
        className={`display ${styles.transmit}`}
        data-state={state}
        disabled={disabled}
      >
        {state === "idle" && "Transmit"}
        {state === "transmitting" && "Transmitting…"}
        {state === "received" && "Received ✓"}
      </button>

      <p className="label" role="status" aria-live="polite">
        {state === "received"
          ? "Clearance request received. Expect contact within 48 hours."
          : " "}
      </p>
    </form>
  );
}

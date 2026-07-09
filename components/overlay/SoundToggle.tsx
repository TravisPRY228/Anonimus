"use client";

import { useEffect, useState } from "react";
import { soundEngine } from "@/experience/sound/engine";
import styles from "./SoundToggle.module.css";

/**
 * The ◑ SOUND toggle. Default off. If the visitor enabled sound on
 * a previous visit, we re-arm on their first gesture (autoplay-safe:
 * the AudioContext only ever starts inside a user event).
 */
export function SoundToggle() {
  const [on, setOn] = useState(false);

  // Re-arm a stored "on" preference behind the first user gesture.
  useEffect(() => {
    if (soundEngine.storedPreference() !== "on") return;
    const arm = () => {
      soundEngine.enable();
      setOn(true);
    };
    window.addEventListener("pointerdown", arm, { once: true });
    return () => window.removeEventListener("pointerdown", arm);
  }, []);

  const toggle = () => {
    if (on) {
      soundEngine.disable();
      setOn(false);
    } else {
      soundEngine.enable();
      setOn(true);
    }
  };

  return (
    <button
      type="button"
      className={`mono ${styles.toggle}`}
      onClick={toggle}
      aria-pressed={on}
      data-on={on ? "true" : undefined}
    >
      <span aria-hidden="true">◑</span> SOUND {on ? "ON" : "OFF"}
    </button>
  );
}

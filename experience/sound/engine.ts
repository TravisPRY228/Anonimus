/**
 * NEXUS ROBOTICS — sound engine.
 * Everything is synthesized with the Web Audio API — zero audio
 * assets, matching the project's zero-asset discipline.
 *
 * Sound design rules (creative direction §05):
 * — very subtle: an accent layer, never a soundtrack
 * — industrial vocabulary only: electrical hum, relay clicks,
 *   servo whirs, scan sweeps. No music. Ever.
 * — default OFF; starts only from an explicit user gesture
 *   (autoplay-policy safe by construction).
 */

const STORAGE_KEY = "nexus-sound";

/** Master output level — deliberately quiet. */
const MASTER_LEVEL = 0.5;

class SoundEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private humStop: (() => void) | null = null;
  private lastServoAt = 0;
  enabled = false;

  /** Delegated relay click for every interactive element. */
  private onPointerDown = (e: PointerEvent) => {
    const target = e.target as Element | null;
    if (!target?.closest) return;
    if (target.closest("button, a, summary, select")) {
      this.click();
    }
  };

  private ensureContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const Ctor =
        window.AudioContext ??
        (window as Window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctor) return null;
      this.ctx = new Ctor();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0;
      this.master.connect(this.ctx.destination);
    }
    return this.ctx;
  }

  /** Shared noise buffer (1 s of white noise, reused everywhere). */
  private noiseBuffer: AudioBuffer | null = null;
  private getNoise(ctx: AudioContext): AudioBuffer {
    if (!this.noiseBuffer) {
      const buffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      this.noiseBuffer = buffer;
    }
    return this.noiseBuffer;
  }

  enable(): void {
    const ctx = this.ensureContext();
    if (!ctx || !this.master) return;
    void ctx.resume();
    this.enabled = true;
    localStorage.setItem(STORAGE_KEY, "on");

    // Fade the master in — no hard audio edge.
    this.master.gain.cancelScheduledValues(ctx.currentTime);
    this.master.gain.setTargetAtTime(MASTER_LEVEL, ctx.currentTime, 0.4);

    this.startHum(ctx, this.master);
    document.addEventListener("pointerdown", this.onPointerDown, {
      passive: true,
    });

    // A quiet power-on confirmation.
    this.servo();
  }

  disable(): void {
    this.enabled = false;
    localStorage.setItem(STORAGE_KEY, "off");
    document.removeEventListener("pointerdown", this.onPointerDown);
    if (this.ctx && this.master) {
      this.master.gain.setTargetAtTime(0, this.ctx.currentTime, 0.2);
    }
    if (this.humStop) {
      this.humStop();
      this.humStop = null;
    }
  }

  /** Stored preference — "on" means re-arm on next user gesture. */
  storedPreference(): "on" | "off" {
    if (typeof window === "undefined") return "off";
    return localStorage.getItem(STORAGE_KEY) === "on" ? "on" : "off";
  }

  /* ---------------- voices ---------------- */

  /** Electrical room tone: 55 Hz sine + low-passed noise, breathing. */
  private startHum(ctx: AudioContext, out: GainNode): void {
    if (this.humStop) return;

    const humGain = ctx.createGain();
    humGain.gain.value = 0.05;
    humGain.connect(out);

    const sine = ctx.createOscillator();
    sine.type = "sine";
    sine.frequency.value = 55;
    const sineGain = ctx.createGain();
    sineGain.gain.value = 0.5;
    sine.connect(sineGain).connect(humGain);
    sine.start();

    const noise = ctx.createBufferSource();
    noise.buffer = this.getNoise(ctx);
    noise.loop = true;
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 140;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.35;
    noise.connect(lowpass).connect(noiseGain).connect(humGain);
    noise.start();

    // Slow electrical "breathing" on the hum level.
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.08;
    const lfoDepth = ctx.createGain();
    lfoDepth.gain.value = 0.015;
    lfo.connect(lfoDepth).connect(humGain.gain);
    lfo.start();

    this.humStop = () => {
      const t = ctx.currentTime;
      humGain.gain.setTargetAtTime(0, t, 0.15);
      window.setTimeout(() => {
        sine.stop();
        noise.stop();
        lfo.stop();
        humGain.disconnect();
      }, 600);
    };
  }

  /** Relay click: a 12 ms filtered noise burst — mechanical, dry. */
  click(): void {
    if (!this.enabled || !this.ctx || !this.master) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;

    const src = ctx.createBufferSource();
    src.buffer = this.getNoise(ctx);
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.value = 2600;
    bandpass.Q.value = 1.2;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.012);
    src.connect(bandpass).connect(gain).connect(this.master);
    src.start(t);
    src.stop(t + 0.03);
  }

  /** Servo whir: short band-passed saw sweep — calibration movement. */
  servo(): void {
    if (!this.enabled || !this.ctx || !this.master) return;
    const ctx = this.ctx;
    const now = performance.now();
    if (now - this.lastServoAt < 250) return; // never machine-gun
    this.lastServoAt = now;
    const t = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(280, t);
    osc.frequency.linearRampToValueAtTime(520, t + 0.09);
    osc.frequency.linearRampToValueAtTime(340, t + 0.18);
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.value = 900;
    bandpass.Q.value = 2.5;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.07, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    osc.connect(bandpass).connect(gain).connect(this.master);
    osc.start(t);
    osc.stop(t + 0.22);
  }

  /** Scan sweep: descending filtered noise, matches the green wipe. */
  sweep(): void {
    if (!this.enabled || !this.ctx || !this.master) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;

    const src = ctx.createBufferSource();
    src.buffer = this.getNoise(ctx);
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.Q.value = 6;
    bandpass.frequency.setValueAtTime(3200, t);
    bandpass.frequency.exponentialRampToValueAtTime(320, t + 0.5);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.05, t + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
    src.connect(bandpass).connect(gain).connect(this.master);
    src.start(t);
    src.stop(t + 0.6);
  }
}

/** Module singleton — imported by DOM and canvas code alike. */
export const soundEngine = new SoundEngine();

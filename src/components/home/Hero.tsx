"use client";

import Link from "next/link";
import { useMemo, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

/**
 * Lightweight, WebGL-free hero. Per the performance strategy (spec §42),
 * heavy 3D scenes are deferred to their own world pages and lazy-loaded —
 * the homepage never pays for a full Three.js scene up front. Everything
 * below (DNA strand, cell particles, silhouette, orbit glyph) is inline
 * SVG/CSS driven by Framer Motion, not a canvas — a "performance-conscious
 * cinematic composition" per spec §06, not a scaled-down 3D scene.
 *
 * Layering (spec §07 — multiple depth planes + pointer parallax):
 *   background — .bio-grid (CSS) + a faint standing-figure silhouette
 *   far midground — a slowly drifting DNA strand, off to one side
 *   near midground — soft blurred "cell" particles
 *   foreground — the orbit glyph, then the headline/CTA copy (unmoved by
 *     parallax so it always reads crisply)
 * Reduced-motion: `useReducedMotion()` gates every JS-driven animation
 * here explicitly (the global CSS override in globals.css only catches
 * CSS transitions/keyframes, not Framer Motion's transform loop).
 */
export function Hero() {
  const { t } = useLanguage();
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const rotX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  // Two extra parallax depths, subtler than the orbit glyph's — this is
  // what makes the layers read as depth rather than one flat image.
  const farX = useTransform(sx, [-0.5, 0.5], [6, -6]);
  const farY = useTransform(sy, [-0.5, 0.5], [4, -4]);
  const nearX = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const nearY = useTransform(sy, [-0.5, 0.5], [-10, 10]);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (prefersReduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: prefersReduced ? 0 : 0.12, delayChildren: prefersReduced ? 0 : 0.15 } },
  };
  const rise = {
    hidden: prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
  };

  return (
    <section
      ref={ref}
      onPointerMove={handleMove}
      className="bio-grid relative overflow-hidden border-b border-panel-border"
    >
      {/* Background plane: faint standing-figure silhouette — the Human
          Body stays the visual anchor even though this hero is 2D; the
          real 3D figure lives on /human-body (spec §06/§16). */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.05] dark:opacity-[0.07]">
        <HumanSilhouette className="h-[92%] w-auto" />
      </div>

      {/* Far midground: a slow DNA strand, hidden on small screens
          (spec §59/§85 — fewer decorative layers on mobile). */}
      <motion.div
        style={prefersReduced ? undefined : { x: farX, y: farY }}
        className="pointer-events-none absolute -right-4 top-0 hidden h-full w-28 opacity-[0.16] sm:block lg:-right-2 lg:w-36"
      >
        <DnaStrand className="h-full w-full" animate={!prefersReduced} />
      </motion.div>

      {/* Near midground: drifting cell/particle glow, thinned on mobile. */}
      <motion.div
        style={prefersReduced ? undefined : { x: nearX, y: nearY }}
        className="pointer-events-none absolute inset-0"
      >
        <CellParticles reduced={!!prefersReduced} />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28 lg:py-36"
      >
        <motion.div
          variants={rise}
          style={{ rotateX: rotX, rotateY: rotY }}
          className="relative mb-8 flex h-40 w-40 items-center justify-center [perspective:800px] sm:h-52 sm:w-52"
          aria-hidden="true"
        >
          <OrbitGlyph />
        </motion.div>

        <motion.h1 variants={rise} className="text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
          BIO<span className="text-gradient">VERSE</span>
        </motion.h1>
        <motion.p variants={rise} className="mt-5 max-w-2xl text-balance text-lg font-medium tracking-wide text-accent sm:text-xl">
          {t.hero.tagline}
        </motion.p>
        <motion.p variants={rise} className="mt-3 max-w-xl text-balance text-base text-fg-muted sm:text-lg">
          {t.hero.subtitle}
        </motion.p>

        <motion.div variants={rise} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/human-body"
            className="bio-focus-ring rounded-full bg-accent px-7 py-3 text-sm font-semibold text-bg shadow-lg shadow-accent/20 transition-transform hover:scale-[1.03]"
          >
            {t.hero.ctaPrimary}
          </Link>
          <Link
            href="/dictionary"
            className="bio-focus-ring rounded-full border border-panel-border px-7 py-3 text-sm font-semibold text-fg hover:border-accent/50 hover:text-accent"
          >
            {t.hero.ctaSecondary}
          </Link>
        </motion.div>

        <motion.a
          variants={rise}
          href="#worlds"
          className="bio-focus-ring mt-14 flex flex-col items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-fg-subtle transition-colors hover:text-accent"
        >
          Explore Biological Worlds
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            animate={prefersReduced ? undefined : { y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M3 6l5 5 5-5" />
          </motion.svg>
        </motion.a>
      </motion.div>
    </section>
  );
}

function OrbitGlyph() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      <defs>
        <linearGradient id="orbitGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent-2)" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="34" fill="url(#orbitGrad)" opacity="0.9" />
      {[0, 60, 120].map((rot, i) => (
        <ellipse
          key={rot}
          cx="100"
          cy="100"
          rx="90"
          ry="34"
          fill="none"
          stroke="var(--accent)"
          strokeOpacity={0.35}
          strokeWidth="1.5"
          transform={`rotate(${rot} 100 100)`}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`${rot} 100 100`}
            to={`${rot + 360} 100 100`}
            dur={`${18 + i * 6}s`}
            repeatCount="indefinite"
          />
        </ellipse>
      ))}
      {[0, 60, 120].map((rot, i) => (
        <circle key={`dot-${rot}`} r="5" fill="var(--accent-strong)">
          <animateMotion
            dur={`${18 + i * 6}s`}
            repeatCount="indefinite"
            path={`M 190,100 A 90,34 ${rot} 1,1 10,100 A 90,34 ${rot} 1,1 190,100`}
          />
        </circle>
      ))}
    </svg>
  );
}

/** A faint standing-figure outline — simple line shapes only (no complex
 * hand-typed curve math to get wrong), kept at very low opacity so it
 * reads as background texture, not a competing illustration. */
function HumanSilhouette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 260" className={className} aria-hidden="true">
      <g fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="60" cy="26" r="17" />
        <path d="M60 43 L60 128" />
        <path d="M60 55 L26 96" />
        <path d="M60 55 L94 96" />
        <path d="M41 96 L79 96" />
        <path d="M60 128 L32 232" />
        <path d="M60 128 L88 232" />
      </g>
    </svg>
  );
}

/** Builds a smooth sine-wave path from sampled points (plain line
 * segments) instead of hand-typed bezier control points — guarantees a
 * valid, predictable path at any amplitude/phase. */
function sineStrandPath(width: number, height: number, amplitude: number, phaseRad: number, cycles: number) {
  const steps = 48;
  const cx = width / 2;
  const points: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = cx + amplitude * Math.sin(t * Math.PI * 2 * cycles + phaseRad);
    const y = t * height;
    points.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return points.join(" ");
}

function DnaStrand({ className, animate }: { className?: string; animate?: boolean }) {
  const { width, height, amplitude, cycles } = { width: 80, height: 480, amplitude: 24, cycles: 3.4 };
  const { strandA, strandB, rungs } = useMemo(() => {
    const a = sineStrandPath(width, height, amplitude, 0, cycles);
    const b = sineStrandPath(width, height, amplitude, Math.PI, cycles);
    const rungCount = 11;
    const r = Array.from({ length: rungCount }, (_, i) => {
      const t = i / (rungCount - 1);
      const y = t * height;
      const cx = width / 2;
      const xA = cx + amplitude * Math.sin(t * Math.PI * 2 * cycles);
      const xB = cx + amplitude * Math.sin(t * Math.PI * 2 * cycles + Math.PI);
      return { xA, xB, y };
    });
    return { strandA: a, strandB: b, rungs: r };
  }, [width, height, amplitude, cycles]);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g className={animate ? "bioverse-dna-drift" : undefined}>
        <path d={strandA} fill="none" stroke="var(--accent-2)" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
        <path d={strandB} fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
        {rungs.map((r, i) => (
          <line key={i} x1={r.xA} y1={r.y} x2={r.xB} y2={r.y} stroke="var(--fg-subtle)" strokeWidth="1" opacity="0.35" />
        ))}
      </g>
    </svg>
  );
}

const PARTICLES = [
  { top: "14%", left: "10%", size: 88, dur: 7, delay: 0 },
  { top: "64%", left: "6%", size: 56, dur: 8.5, delay: 1.1 },
  { top: "22%", left: "90%", size: 66, dur: 9, delay: 0.5 },
  { top: "74%", left: "88%", size: 46, dur: 7.5, delay: 1.8 },
  { top: "46%", left: "50%", size: 38, dur: 10, delay: 2.3 },
] as const;

function CellParticles({ reduced }: { reduced: boolean }) {
  return (
    <>
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className={`absolute rounded-full blur-2xl ${i >= 3 ? "hidden sm:block" : ""}`}
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background: i % 2 === 0 ? "var(--accent-soft)" : "var(--accent-2-soft)",
          }}
          animate={reduced ? undefined : { y: [0, -14, 0], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}
    </>
  );
}

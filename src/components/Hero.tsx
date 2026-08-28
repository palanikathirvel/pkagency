import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { BellRing, Sparkles, TrendingUp } from "lucide-react";
import { Eyebrow, GhostLink, PrimaryLink, Scramble } from "./ui";

const CHART_BARS = [38, 55, 42, 70, 58, 82, 66, 95];

export default function Hero() {
  const reduced = useReducedMotion();
  const areaRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 42, damping: 14 });
  const sy = useSpring(my, { stiffness: 42, damping: 14 });
  const x1 = useTransform(sx, (v) => v * 8);
  const y1 = useTransform(sy, (v) => v * 6);
  const x2 = useTransform(sx, (v) => v * 18);
  const y2 = useTransform(sy, (v) => v * 14);
  const x3 = useTransform(sx, (v) => v * 28);
  const y3 = useTransform(sy, (v) => v * 22);

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !areaRef.current) return;
    const r = areaRef.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  return (
    <section className="relative overflow-hidden pt-[120px] pb-16 md:pt-[150px] lg:pb-24" onMouseMove={onMove}>
      {/* Layered ambient background */}
      <div className="absolute inset-0 bg-grid-dark [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black,transparent)]" aria-hidden="true" />
      <div className="absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-royal/14 blur-[130px] animate-glow-drift" aria-hidden="true" />
      <div className="absolute top-24 -right-40 h-[520px] w-[520px] rounded-full bg-cobalt/12 blur-[140px] animate-glow-drift [animation-delay:-7s]" aria-hidden="true" />
      <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-flare/8 blur-[120px]" aria-hidden="true" />

      <div ref={areaRef} className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        {/* ── Copy ── */}
        <div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <Eyebrow>Creative Digital Agency</Eyebrow>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-[2.55rem] font-extrabold leading-[1.05] tracking-tight text-mist sm:text-6xl xl:text-[4.15rem]"
          >
            We Build{" "}
            <span className="relative inline-block text-royal">
              <Scramble text="Digital Experiences" delayMs={400} />
              <motion.svg
                viewBox="0 0 300 14"
                preserveAspectRatio="none"
                className="absolute -bottom-1.5 left-0 h-3 w-full"
                fill="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="hero-underline" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#8b7cff" />
                    <stop offset="1" stopColor="#ff6ec7" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M4 10 C 70 3, 210 3, 296 9"
                  stroke="url(#hero-underline)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: reduced ? 1 : 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.15, duration: 0.7, ease: "easeOut" }}
                />
              </motion.svg>
            </span>{" "}
            That Help Businesses Grow.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-xl text-base leading-relaxed text-fog md:text-lg"
          >
            P.K Creative Agency helps businesses turn ideas into powerful websites, memorable brands, and digital
            experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <PrimaryLink to="/contact">Start Your Project</PrimaryLink>
            <GhostLink to="/work">View Our Work</GhostLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="mt-12 flex items-center gap-4"
          >
            <div className="flex -space-x-2.5" aria-hidden="true">
              {["from-royal to-cobalt", "from-cobalt to-flare", "from-flare to-royal", "from-cobalt to-royal"].map((g, i) => (
                <span
                  key={i}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink-950 bg-gradient-to-br ${g} font-display text-[10px] font-bold text-ink-950`}
                >
                  {["PK", "SC", "SC", "SC"][i]}
                </span>
              ))}
            </div>
            <p className="text-sm font-semibold text-fog">
              Helping ambitious brands build
              <span className="block text-mist">their digital presence.</span>
            </p>
          </motion.div>

          {/* Mobile mini-cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-10 flex gap-3 lg:hidden"
          >
            <div className="flex flex-1 items-center gap-3 rounded-2xl border border-mist/10 bg-ink-800/80 p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lime-wa/15 text-lime-wa">
                <BellRing className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold text-mist">New lead received</p>
                <p className="font-mono text-[10px] text-fog">E-commerce · just now</p>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-3 rounded-2xl border border-mist/10 bg-ink-800/80 p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-royal/15 text-royal">
                <TrendingUp className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold text-mist">+48% conversions</p>
                <p className="font-mono text-[10px] text-fog">after redesign</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Animated visual composition ── */}
        <div className="relative hidden h-[580px] lg:block" aria-hidden="true">
          {/* Orbit rings + glow */}
          <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-mist/10 animate-spin-slower" />
          <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-mist/6" />
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-royal/25 to-cobalt/20 blur-3xl" />

          {/* Browser mockup */}
          <motion.div
            style={reduced ? undefined : { x: x1, y: y1 }}
            className="absolute left-1/2 top-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-mist/12 bg-ink-800 shadow-[0_40px_90px_-20px_rgba(6,7,13,0.9)]"
          >
            <div className="flex items-center gap-2 border-b border-mist/8 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-flare/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-cobalt/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-lime-wa/80" />
              <span className="ml-3 flex-1 rounded-full bg-ink-700 px-3 py-1 font-mono text-[10px] text-fog">
                pkcreative.agency
              </span>
            </div>
            <div className="space-y-4 p-5">
              <div className="flex items-center justify-between">
                <span className="h-3 w-14 rounded-full bg-gradient-to-r from-royal to-cobalt" />
                <div className="flex gap-2">
                  <span className="h-2 w-8 rounded-full bg-mist/15" />
                  <span className="h-2 w-8 rounded-full bg-mist/15" />
                  <span className="h-2 w-8 rounded-full bg-mist/15" />
                </div>
              </div>
              <div className="rounded-xl border border-mist/8 bg-gradient-to-br from-royal/20 via-ink-700 to-cobalt/20 p-4">
                <span className="block h-3 w-3/4 rounded-full bg-mist/70" />
                <span className="mt-2 block h-3 w-1/2 rounded-full bg-mist/40" />
                <span className="mt-4 inline-block h-6 w-24 rounded-full bg-gradient-to-r from-royal to-cobalt" />
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  ["bg-royal", "w-8"],
                  ["bg-cobalt", "w-10"],
                  ["bg-flare", "w-7"],
                ].map(([dot, w], i) => (
                  <div key={i} className="rounded-lg bg-ink-700/70 p-2.5">
                    <span className={`block h-2 ${w} rounded-full bg-mist/25`} />
                    <span className={`mt-2 block h-2 rounded-full ${dot} opacity-80`} style={{ width: "60%" }} />
                  </div>
                ))}
              </div>
              <div className="flex h-16 items-end gap-1.5 rounded-lg bg-ink-700/50 p-2.5">
                {CHART_BARS.map((h, i) => (
                  <motion.span
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.7 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex-1 rounded-sm ${i === CHART_BARS.length - 1 ? "bg-gradient-to-t from-royal to-flare" : "bg-cobalt/50"}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Floating: lead notification */}
          <motion.div style={reduced ? undefined : { x: x2, y: y2 }} className="absolute left-0 top-14 animate-floaty">
            <div className="flex items-center gap-3 rounded-2xl border border-mist/12 bg-ink-800/95 p-4 shadow-2xl backdrop-blur">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-lime-wa/15 text-lime-wa">
                <BellRing className="h-4.5 w-4.5" />
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-lime-wa">
                  <span className="absolute inset-0 rounded-full bg-lime-wa animate-pulse-ring" />
                </span>
              </span>
              <div>
                <p className="text-sm font-bold text-mist">New lead received</p>
                <p className="font-mono text-[11px] text-fog">E-Commerce project · ₹80k</p>
              </div>
            </div>
          </motion.div>

          {/* Floating: brand palette */}
          <motion.div style={reduced ? undefined : { x: x3, y: y3 }} className="absolute bottom-16 left-2 animate-floaty-late">
            <div className="rounded-2xl border border-mist/12 bg-ink-800/95 p-4 shadow-2xl backdrop-blur">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fog">Brand sprint</p>
              <div className="mt-3 flex gap-2">
                {["bg-royal", "bg-cobalt", "bg-flare", "bg-mist", "bg-ink-500"].map((c, i) => (
                  <span key={i} className={`h-7 w-7 rounded-full ${c} ring-1 ring-mist/20 transition-transform hover:scale-110`} />
                ))}
              </div>
              <p className="mt-3 font-display text-sm font-bold text-mist">
                Aurora <span className="font-mono text-[10px] font-medium text-fog">/ Syne + Manrope</span>
              </p>
            </div>
          </motion.div>

          {/* Floating: conversion chart */}
          <motion.div style={reduced ? undefined : { x: x2, y: y2 }} className="absolute right-0 top-40 animate-floaty-late">
            <div className="rounded-2xl border border-mist/12 bg-ink-800/95 p-4 shadow-2xl backdrop-blur">
              <div className="flex items-center gap-2 text-lime-wa">
                <TrendingUp className="h-4 w-4" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em]">This quarter</span>
              </div>
              <p className="mt-1.5 font-display text-3xl font-extrabold text-mist">+48%</p>
              <p className="text-xs font-semibold text-fog">Conversions after redesign</p>
            </div>
          </motion.div>

          {/* Rotating tagline badge */}
          <motion.div style={reduced ? undefined : { x: x3, y: y3 }} className="absolute bottom-6 right-10 h-[150px] w-[150px]">
            <div className="relative h-full w-full">
              <svg viewBox="0 0 160 160" className="h-full w-full animate-spin-slow">
                <defs>
                  <path id="hero-circle" d="M80,80 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0" />
                </defs>
                <text fill="#9aa1b7" style={{ fontSize: 10.2, letterSpacing: 2 }} fontFamily="JetBrains Mono, monospace">
                  <textPath href="#hero-circle">TURNING IDEAS INTO DIGITAL EXPERIENCES • P.K •</textPath>
                </text>
              </svg>
              <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-royal to-cobalt text-ink-950 shadow-lg">
                <Sparkles className="h-5 w-5" />
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

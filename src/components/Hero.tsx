import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BellRing,
  TrendingUp,
  Palette,
} from "lucide-react";
import { useScramble } from "../hooks/usePageMeta";
import { Stars } from "./ui";
import { agencyConfig } from "../config/agencyConfig";

/* multiplies a spring by a factor — hooks called unconditionally */
function useScaledSpring(
  spring: ReturnType<typeof useSpring>,
  factor: number
) {
  const out = useMotionValue(0);
  useEffect(() => spring.on("change", (v) => out.set(v * factor)), [spring, factor, out]);
  return out;
}

function FloatingCard({
  children,
  className = "",
  mx,
  my,
  springX,
  springY,
  reduced,
  floatClass = "animate-floaty",
}: {
  children: React.ReactNode;
  className?: string;
  mx: number;
  my: number;
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
  reduced: boolean | null;
  floatClass?: string;
}) {
  const x = useScaledSpring(springX, mx);
  const y = useScaledSpring(springY, my);
  return (
    <motion.div
      className={`absolute ${className} ${reduced ? "" : floatClass}`}
      style={reduced ? undefined : { x, y }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const kicker = useScramble("// " + agencyConfig.tagline, 300);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 60, damping: 18 });
  const springY = useSpring(my, { stiffness: 60, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    my.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative overflow-hidden pt-[120px] pb-16 sm:pt-[150px] lg:pb-24"
      aria-label="Introduction"
    >
      {/* ambient backdrop */}
      <div className="bg-grid-dark absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] animate-glow-drift rounded-full bg-royal/16 blur-[130px] motion-reduce:animate-none"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-20 -right-40 h-[460px] w-[460px] animate-glow-drift rounded-full bg-cobalt/12 blur-[130px] motion-reduce:animate-none"
        style={{ animationDelay: "-6s" }}
        aria-hidden="true"
      />

      <div className="shell relative grid items-center gap-14 lg:grid-cols-[1.04fr_0.96fr] lg:gap-8">
        {/* ------- copy ------- */}
        <div>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-[11px] font-medium tracking-[0.22em] text-royal uppercase sm:text-xs"
            aria-label={agencyConfig.tagline}
          >
            {kicker}
            <span className="animate-blink text-flare motion-reduce:animate-none">▍</span>
          </motion.p>

          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="font-display mt-6 text-[2.6rem] leading-[1.04] font-extrabold tracking-tight text-mist sm:text-6xl lg:text-[4.1rem]"
          >
            We Build{" "}
            <span className="grad-text">Digital Experiences</span> That Help
            Businesses Grow.
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-fog sm:text-lg"
          >
            P.K Creative Agency helps businesses turn ideas into powerful
            websites, memorable brands, and digital experiences.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link to="/contact" className="btn-primary">
              Start Your Project
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link to="/work" className="btn-ghost">
              View Our Work
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* trust strip */}
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-11 flex flex-wrap items-center gap-5"
          >
            <div className="flex -space-x-2.5">
              {[
                ["NT", "from-royal to-cobalt"],
                ["BC", "from-cobalt to-flare"],
                ["ZF", "from-flare to-royal"],
                ["AC", "from-royal to-flare"],
              ].map(([ini, grad]) => (
                <span
                  key={ini}
                  className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br font-display text-[10px] font-bold text-ink-950 ring-2 ring-ink-950 ${grad}`}
                >
                  {ini}
                </span>
              ))}
            </div>
            <div>
              <Stars value={5} />
              <p className="mt-1 text-xs text-fog">
                Trusted by startups, SMBs & personal brands
              </p>
            </div>
          </motion.div>
        </div>

        {/* ------- visual composition ------- */}
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto h-[420px] w-full max-w-[520px] sm:h-[500px]"
          aria-hidden="true"
        >
          {/* orbit rings */}
          <div className="absolute top-1/2 left-1/2 h-[105%] w-[105%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-dashed border-mist/10 motion-reduce:animate-none" />
          <div className="absolute top-1/2 left-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 animate-spin-slower rounded-full border border-mist/8 motion-reduce:animate-none" />
          <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-royal/25 via-cobalt/15 to-flare/25 blur-3xl" />

          {/* main browser mockup */}
          <div className="absolute top-1/2 left-1/2 w-[86%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-mist/12 bg-ink-900/90 shadow-[0_40px_90px_-30px_rgba(6,7,13,0.95)] backdrop-blur">
            <div className="flex items-center gap-1.5 border-b border-mist/8 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-flare/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-wa/80" />
              <span className="ml-3 h-4 flex-1 rounded-full bg-mist/6" />
            </div>
            <div className="space-y-3 p-5">
              <div className="flex items-center justify-between">
                <span className="h-3 w-16 rounded bg-gradient-to-r from-royal to-cobalt" />
                <span className="flex gap-1.5">
                  <span className="h-2 w-8 rounded bg-mist/12" />
                  <span className="h-2 w-8 rounded bg-mist/12" />
                  <span className="h-2 w-8 rounded bg-mist/12" />
                </span>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-royal/35 via-cobalt/25 to-flare/35 p-5">
                <span className="block h-3 w-3/4 rounded bg-mist/70" />
                <span className="mt-2 block h-3 w-1/2 rounded bg-mist/45" />
                <span className="mt-4 inline-block h-7 w-24 rounded-full bg-ink-950/70" />
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="rounded-lg border border-mist/8 bg-mist/[0.04] p-3">
                    <span className="block h-2 w-2/3 rounded bg-mist/20" />
                    <span className="mt-2 block h-2 w-full rounded bg-mist/10" />
                    <span className="mt-1.5 block h-2 w-4/5 rounded bg-mist/10" />
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <span className="h-2 flex-1 rounded bg-mist/8" />
                <span className="h-2 w-1/4 rounded bg-mist/8" />
              </div>
            </div>
          </div>

          {/* floating: new lead */}
          <FloatingCard
            mx={1.4}
            my={1.2}
            springX={springX}
            springY={springY}
            reduced={reduced}
            className="top-2 right-0 sm:top-6 sm:-right-2"
          >
            <div className="flex items-center gap-3 rounded-xl border border-mist/12 bg-ink-850/95 px-4 py-3 shadow-2xl backdrop-blur">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-wa/15 text-wa">
                <BellRing className="h-4 w-4" />
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 animate-pulse rounded-full bg-wa" />
              </span>
              <div>
                <p className="text-xs font-bold text-mist">New lead received</p>
                <p className="font-mono text-[10px] text-fog">just now · via website</p>
              </div>
            </div>
          </FloatingCard>

          {/* floating: growth chart */}
          <FloatingCard
            mx={-1.6}
            my={-1.1}
            springX={springX}
            springY={springY}
            reduced={reduced}
            floatClass="animate-floaty-late"
            className="bottom-4 -left-1 sm:bottom-10 sm:-left-6"
          >
            <div className="rounded-xl border border-mist/12 bg-ink-850/95 p-4 shadow-2xl backdrop-blur">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-cobalt" />
                <p className="text-xs font-bold text-mist">Conversions</p>
                <span className="ml-auto rounded-full bg-wa/15 px-2 py-0.5 font-mono text-[10px] font-semibold text-wa">
                  +212%
                </span>
              </div>
              <div className="mt-3 flex h-12 items-end gap-1.5">
                {[35, 55, 40, 70, 58, 86, 100].map((h, i) => (
                  <span
                    key={i}
                    className="w-3 rounded-t-sm bg-gradient-to-t from-royal/70 to-cobalt"
                    style={{ height: `${h}%`, opacity: 0.45 + i * 0.08 }}
                  />
                ))}
              </div>
            </div>
          </FloatingCard>

          {/* floating: brand chip */}
          <FloatingCard
            mx={1.1}
            my={-1.5}
            springX={springX}
            springY={springY}
            reduced={reduced}
            className="bottom-0 right-4 sm:bottom-2 sm:right-0"
          >
            <div className="flex items-center gap-2.5 rounded-full border border-mist/12 bg-ink-850/95 py-2 pr-4 pl-2 shadow-2xl backdrop-blur">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-flare to-royal text-ink-950">
                <Palette className="h-4 w-4" />
              </span>
              <p className="text-xs font-bold text-mist">
                Brand kit <span className="font-mono text-[10px] font-medium text-fog">v2.0 shipped</span>
              </p>
            </div>
          </FloatingCard>

          {/* rotating badge */}
          <div className="absolute top-1/2 left-1/2 hidden h-36 w-36 -translate-x-1/2 -translate-y-1/2 sm:block" aria-hidden="true">
            <svg viewBox="0 0 100 100" className="h-full w-full animate-spin-slow motion-reduce:animate-none">
              <defs>
                <path id="circlePath" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text className="fill-mist/45 font-mono text-[7.5px] tracking-[0.28em] uppercase">
                <textPath href="#circlePath">
                  P.K Creative • Digital Studio • Est. 2021 •
                </textPath>
              </text>
            </svg>
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="shell relative mt-14 hidden items-center gap-3 lg:flex"
        aria-hidden="true"
      >
        <span className="h-px w-16 bg-gradient-to-r from-royal to-transparent" />
        <span className="font-mono text-[10px] tracking-[0.3em] text-fog uppercase">
          Scroll to explore
        </span>
      </motion.div>
    </section>
  );
}

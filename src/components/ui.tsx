import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

/* ---------- Scroll reveal wrapper ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 30,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-70px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Animated number counter ---------- */
export function Counter({ to, suffix = "", duration = 1600 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setVal(to);
      return;
    }
    let start: number | null = null;
    let raf = 0;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / duration);
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduced]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ---------- Scramble-decode text (hero signature) ---------- */
const GLYPHS = "▚▞▟◇+×/\\<>≡*";

export function Scramble({ text, className, delayMs = 150 }: { text: string; className?: string; delayMs?: number }) {
  const reduced = useReducedMotion();
  const [out, setOut] = useState(() => (reduced ? text : ""));

  useEffect(() => {
    if (reduced) {
      setOut(text);
      return;
    }
    let frame = 0;
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        frame += 1;
        const settled = Math.floor((frame - 4) / 2);
        setOut(
          text
            .split("")
            .map((c, i) => {
              if (c === " ") return " ";
              if (i < settled) return c;
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join("")
        );
        if (settled >= text.length) clearInterval(interval);
      }, 38);
    }, delayMs);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, reduced, delayMs]);

  return <span className={className}>{out || "\u00A0"}</span>;
}

/* ---------- Eyebrow label ---------- */
export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.24em] md:text-xs ${
        light ? "text-ink-900/55" : "text-fog"
      }`}
    >
      <span className="h-px w-8 bg-gradient-to-r from-royal via-cobalt to-flare" aria-hidden="true" />
      {children}
    </span>
  );
}

/* ---------- Section heading ---------- */
export function SectionHeading({
  eyebrow,
  title,
  sub,
  light = false,
  center = false,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  light?: boolean;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""} ${className}`}>
      <Reveal>
        <Eyebrow light={light}>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={`mt-4 font-display text-3xl font-bold leading-[1.06] tracking-tight sm:text-4xl lg:text-[2.75rem] ${
            light ? "text-ink-900" : "text-mist"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p className={`mt-5 text-base leading-relaxed md:text-lg ${light ? "text-ink-900/65" : "text-fog"}`}>{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- Buttons ---------- */
export function PrimaryLink({
  to,
  children,
  className = "",
  external = false,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const cls = `group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-royal to-cobalt px-7 py-3.5 text-sm font-bold text-ink-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_-6px_rgba(139,124,255,0.55)] active:translate-y-0 ${className}`;
  const arrow = <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />;
  return external ? (
    <a href={to} target="_blank" rel="noreferrer" className={cls}>
      {children}
      {arrow}
    </a>
  ) : (
    <Link to={to} className={cls}>
      {children}
      {arrow}
    </Link>
  );
}

export function GhostLink({
  to,
  children,
  className = "",
  light = false,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 ${
        light
          ? "border-ink-900/20 text-ink-900 hover:border-ink-900/50 hover:bg-ink-900/5"
          : "border-mist/15 text-mist hover:border-mist/40 hover:bg-mist/5"
      } ${className}`}
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
    </Link>
  );
}

/* ---------- Small chip / tag ---------- */
export function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-mist/12 bg-mist/5 px-3 py-1 font-mono text-[11px] font-medium tracking-wide text-fog ${className}`}
    >
      {children}
    </span>
  );
}

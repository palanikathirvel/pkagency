import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Star, ArrowUpRight } from "lucide-react";
import { useCountUp, useInViewOnce } from "../hooks/usePageMeta";
import { clientWordmarks } from "../data/siteContent";

/* ---------- scroll reveal wrapper ---------- */
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
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-70px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const staggerChild: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export function StaggerGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  );
}

/* ---------- section eyebrow ---------- */
export function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={`eyebrow-mono ${
        light ? "text-ink-700" : "text-royal"
      }`}
    >
      {children}
    </p>
  );
}

/* ---------- section heading block ---------- */
export function SectionHead({
  eyebrow,
  title,
  sub,
  light = false,
  align = "left",
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  light?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={`${align === "center" ? "mx-auto text-center" : ""} max-w-2xl ${className}`}
    >
      <Reveal>
        <Eyebrow light={light}>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={`font-display mt-4 text-3xl leading-[1.08] font-bold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] ${
            light ? "text-ink-950" : "text-mist"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p
            className={`mt-4 text-base leading-relaxed sm:text-lg ${
              light ? "text-ink-700/75" : "text-fog"
            }`}
          >
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- link with animated arrow ---------- */
export function ArrowLink({
  to,
  children,
  className = "text-royal",
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-1.5 text-sm font-bold transition-colors hover:text-flare ${className}`}
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

/* ---------- star rating ---------- */
export function Stars({ value, className = "" }: { value: number; className?: string }) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i <= value ? "fill-amber-300 text-amber-300" : "fill-ink-600 text-ink-600"
          }`}
        />
      ))}
    </div>
  );
}

/* ---------- animated counter ---------- */
export function StatCounter({
  value,
  suffix,
  label,
  light = false,
}: {
  value: number;
  suffix?: string;
  label: string;
  light?: boolean;
}) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const count = useCountUp(value, inView);
  return (
    <div ref={ref} className="group relative">
      <p
        className={`font-display text-4xl font-extrabold tracking-tight sm:text-5xl ${
          light ? "text-ink-950" : "text-mist"
        }`}
      >
        {count}
        <span className="grad-text">{suffix}</span>
      </p>
      <p
        className={`mt-2 font-mono text-[11px] tracking-[0.18em] uppercase ${
          light ? "text-ink-700/60" : "text-fog"
        }`}
      >
        {label}
      </p>
      <span
        className={`absolute -left-4 top-1/2 hidden h-10 w-px -translate-y-1/2 sm:block ${
          light ? "bg-ink-950/10" : "bg-mist/10"
        }`}
      />
    </div>
  );
}

/* ---------- infinite marquee of placeholder client wordmarks ---------- */
export function ClientMarquee() {
  const items = [...clientWordmarks, ...clientWordmarks];
  return (
    <div
      className="relative overflow-hidden"
      aria-label="Placeholder client wordmarks"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent" />
      <div className="flex w-max animate-marquee items-center gap-12 pr-12 motion-reduce:animate-none">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-12 whitespace-nowrap"
          >
            <span className="font-display text-xl font-bold tracking-[0.08em] text-mist/30 transition-colors duration-300 hover:text-mist/70">
              {item}
            </span>
            <svg width="14" height="14" viewBox="0 0 14 14" className="text-royal/50" aria-hidden="true">
              <path
                d="M7 0l1.7 5.3L14 7l-5.3 1.7L7 14 5.3 8.7 0 7l5.3-1.7z"
                fill="currentColor"
              />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- initials avatar ---------- */
export function InitialsAvatar({
  initials,
  gradient,
  size = "md",
}: {
  initials: string;
  gradient: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "h-9 w-9 text-[11px]",
    md: "h-12 w-12 text-sm",
    lg: "h-20 w-20 text-xl",
  };
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-display font-bold text-ink-950 ring-2 ring-ink-950/40 ${gradient} ${sizes[size]}`}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

/* ---------- gradient divider ---------- */
export function GradDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-px w-full bg-gradient-to-r from-transparent via-royal/50 to-transparent ${className}`}
      aria-hidden="true"
    />
  );
}

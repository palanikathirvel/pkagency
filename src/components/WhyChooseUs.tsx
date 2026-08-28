import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { whyPoints } from "../data/siteContent";
import { Eyebrow, Reveal } from "./ui";

/** Sticky two-column: heading stays fixed while the six reasons scroll past. */
export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden border-y border-mist/8 bg-ink-900 py-20 lg:py-28" aria-label="Why choose us">
      <div
        className="pointer-events-none absolute top-0 left-1/3 h-96 w-96 rounded-full bg-cobalt/8 blur-[120px]"
        aria-hidden="true"
      />
      <div className="shell relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* sticky intro */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow>The P.K Difference</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display mt-4 text-3xl leading-[1.08] font-bold tracking-tight text-mist sm:text-4xl lg:text-[2.75rem]">
              Why Choose <span className="grad-text">P.K Creative?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-md leading-relaxed text-fog">
              Anyone can put a page online. We build digital assets that work
              as hard as you do — designed with intent, engineered for growth,
              and supported long after launch.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <Link to="/contact" className="btn-primary mt-8">
              Let's Start Your Project <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 hidden items-center gap-4 lg:flex">
              <svg viewBox="0 0 100 100" className="h-24 w-24 animate-spin-slow motion-reduce:animate-none" aria-hidden="true">
                <defs>
                  <path id="whyPath" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                </defs>
                <text className="fill-mist/40 font-mono text-[8px] tracking-[0.3em] uppercase">
                  <textPath href="#whyPath">Quality • Clarity • Craft • Growth •</textPath>
                </text>
              </svg>
              <p className="font-mono text-[11px] leading-relaxed tracking-wider text-fog/70 uppercase">
                Six reasons teams
                <br />
                trust our studio
              </p>
            </div>
          </Reveal>
        </div>

        {/* reasons list */}
        <div className="divide-y divide-mist/8 border-y border-mist/8">
          {whyPoints.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.num} delay={i * 0.05} y={22}>
                <div className="group flex gap-6 py-7 transition-all duration-500 hover:bg-mist/[0.03] hover:pl-3 sm:gap-8 sm:py-8">
                  <span className="font-display text-ghost-number pt-1 text-2xl font-extrabold">
                    {p.num}
                  </span>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-mist/12 bg-ink-850 text-royal transition-all duration-500 group-hover:border-royal/50 group-hover:text-flare group-hover:shadow-[0_0_28px_-6px_rgba(139,124,255,0.5)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold tracking-tight text-mist sm:text-xl">
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-fog">
                      {p.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

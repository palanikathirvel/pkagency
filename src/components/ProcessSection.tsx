import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { processSteps } from "../data/siteContent";
import { SectionHead, Reveal } from "./ui";

/**
 * Signature motion: stacked, pinned cards — each step sticks and the
 * next slides over it as you scroll.
 */
export default function ProcessSection() {
  return (
    <section className="relative border-y border-mist/8 bg-ink-900 py-20 lg:py-28" aria-label="Our process">
      <div className="shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            eyebrow="Our Process"
            title="How We Work"
            sub="A clear, five-step process that keeps you informed and in control from day one to launch."
          />
          <Link
            to="/contact"
            className="btn-primary btn-sm mb-1 hidden shrink-0 lg:inline-flex"
          >
            Let's Start Your Project <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative mt-14">
          {processSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.num} y={40} className="mb-6 last:mb-0">
                <div
                  className="sticky overflow-hidden rounded-2xl border border-mist/12 bg-ink-850 shadow-[0_-18px_50px_-20px_rgba(6,7,13,0.9)]"
                  style={{ top: `calc(96px + ${i * 22}px)` }}
                >
                  <div
                    className="pointer-events-none absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-royal via-cobalt to-flare"
                    style={{ opacity: 0.4 + i * 0.15 }}
                    aria-hidden="true"
                  />
                  <div className="grid gap-6 p-7 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-10 sm:p-9 lg:p-11">
                    <span className="font-display text-ghost-number text-6xl leading-none font-extrabold sm:text-7xl">
                      {step.num}
                    </span>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-royal/25 to-flare/25 text-royal ring-1 ring-royal/30">
                          <Icon className="h-5 w-5" />
                        </span>
                        <h3 className="font-display text-2xl font-bold tracking-tight text-mist sm:text-3xl">
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-3 max-w-xl leading-relaxed text-fog">
                        {step.description}
                      </p>
                    </div>
                    <p className="font-mono text-[11px] leading-relaxed tracking-[0.14em] text-fog/70 uppercase sm:max-w-[180px] sm:text-right">
                      {step.detail}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 text-center lg:hidden">
          <Link to="/contact" className="btn-primary">
            Let's Start Your Project <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

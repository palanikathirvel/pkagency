import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { pricingPlans } from "../data/siteContent";
import { Reveal, SectionHeading } from "./ui";

export default function PricingSection() {
  return (
    <section className="relative border-t border-mist/8 bg-ink-900/50 py-24 lg:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[560px] -translate-x-1/2 rounded-full bg-royal/7 blur-[140px]" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          center
          eyebrow="Packages"
          title={
            <>
              Flexible Solutions for <span className="text-royal">Every Business</span>
            </>
          }
          sub="Clear starting points, no hidden surprises. Every package is shaped around your goals — final scope is always agreed together."
        />

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 lg:grid-cols-3 lg:items-stretch">
          {pricingPlans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.1} className="h-full">
              <article
                className={`relative flex h-full flex-col rounded-[22px] p-8 transition-all duration-500 hover:-translate-y-2 ${
                  plan.featured
                    ? "gradient-border always bg-ink-800 shadow-[0_30px_80px_-30px_rgba(139,124,255,0.4)] lg:-translate-y-3 lg:hover:-translate-y-5"
                    : "border border-mist/10 bg-ink-800/50 hover:border-mist/25"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-royal to-cobalt px-4 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-950">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display text-2xl font-bold text-mist">{plan.name}</h3>
                <p className="mt-2 text-sm text-fog">{plan.audience}</p>
                <p className={`mt-5 font-mono text-sm font-semibold ${plan.featured ? "text-royal" : "text-fog"}`}>
                  {plan.priceNote}
                </p>
                <span className="my-6 h-px w-full bg-mist/10" aria-hidden="true" />
                <ul className="flex-1 space-y-3.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm font-medium text-mist/80">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          plan.featured ? "bg-gradient-to-br from-royal to-cobalt text-ink-950" : "bg-mist/10 text-royal"
                        }`}
                      >
                        <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`group mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 ${
                    plan.featured
                      ? "bg-gradient-to-r from-royal to-cobalt text-ink-950 hover:shadow-[0_8px_32px_-6px_rgba(139,124,255,0.55)]"
                      : "border border-mist/15 text-mist hover:border-mist/40 hover:bg-mist/5"
                  }`}
                >
                  {plan.cta}
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-12 text-center text-sm text-fog">
            Not sure which fits?{" "}
            <Link to="/contact" className="font-bold text-royal underline decoration-royal/40 underline-offset-4 transition-colors hover:text-cobalt">
              Send us your idea
            </Link>{" "}
            and we&rsquo;ll recommend the right scope — free of charge.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

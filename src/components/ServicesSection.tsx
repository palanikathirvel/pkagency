import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { services } from "../data/services";
import { GhostLink, Reveal, SectionHeading } from "./ui";

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute right-0 top-20 h-[380px] w-[380px] rounded-full bg-royal/8 blur-[130px]" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title={
              <>
                What We Can Create <span className="text-royal">For You</span>
              </>
            }
            sub="From your first idea to the final product, we help bring your digital vision to life."
          />
          <Reveal delay={0.2} className="shrink-0">
            <GhostLink to="/contact">Get a Custom Solution</GhostLink>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.id} delay={(i % 3) * 0.09}>
                <article
                  className={`group relative h-full overflow-hidden rounded-[20px] border border-mist/8 bg-ink-800/70 p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_70px_-24px] ${s.tint.shadow}`}
                >
                  <div className="gradient-border absolute inset-0 rounded-[20px]" aria-hidden="true" />
                  <span
                    className={`absolute left-0 top-0 h-[3px] w-0 bg-gradient-to-r ${s.tint.gradient} transition-all duration-500 group-hover:w-full`}
                    aria-hidden="true"
                  />
                  <span
                    className={`flex h-13 w-13 items-center justify-center rounded-xl border p-3.5 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 ${s.tint.chip}`}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-bold text-mist">{s.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-fog">{s.blurb}</p>
                  <ul className="mt-5 space-y-2">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm font-medium text-mist/70">
                        <span className={`h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r ${s.tint.gradient}`} aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className={`mt-7 inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] ${s.tint.text} transition-all duration-300 hover:gap-3.5`}
                  >
                    Learn More <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </article>
              </Reveal>
            );
          })}

          {/* Custom solution tile */}
          <Reveal delay={0.18}>
            <div className="flex h-full flex-col justify-between rounded-[20px] border border-dashed border-mist/15 bg-gradient-to-br from-ink-800/60 to-ink-900 p-7 transition-colors duration-500 hover:border-royal/40">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-royal">Something else?</p>
                <h3 className="mt-4 font-display text-2xl font-bold leading-snug text-mist">
                  Have an idea that doesn&rsquo;t fit a box?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fog">
                  We love unusual briefs. Tell us what you&rsquo;re imagining and we&rsquo;ll shape a custom plan around it.
                </p>
              </div>
              <Link
                to="/contact"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-bold text-mist transition-colors hover:text-royal"
              >
                Get a Custom Solution
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

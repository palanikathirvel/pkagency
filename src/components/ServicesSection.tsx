import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import { services } from "../data/services";
import { SectionHead, StaggerGroup, StaggerItem } from "./ui";

/**
 * Bento layout: first two services span wider columns on desktop,
 * avoiding a monotonous row of equal cards.
 */
export default function ServicesSection() {
  return (
    <section id="services" className="relative py-20 lg:py-28" aria-label="Services">
      <div className="shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            eyebrow="Our Services"
            title="What We Can Create For You"
            sub="From your first idea to the final product, we help bring your digital vision to life."
          />
          <Link
            to="/services"
            className="btn-ghost btn-sm mb-1 hidden shrink-0 lg:inline-flex"
          >
            Explore all services <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            const wide = i < 2 ? "md:col-span-3" : "md:col-span-2";
            return (
              <StaggerItem key={s.slug} className={wide}>
                <div
                  className="card-line group flex h-full flex-col p-7 sm:p-8"
                  style={{ ["--glow" as string]: s.glow }}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br ${s.gradient} text-ink-950 shadow-lg transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110`}
                    >
                      <Icon className="h-6 w-6" strokeWidth={2.2} />
                    </span>
                    <span className="font-display text-ghost-number text-4xl font-extrabold">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="font-display mt-6 text-xl font-bold tracking-tight text-mist sm:text-[22px]">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-fog">{s.short}</p>

                  <ul className="mt-5 space-y-2">
                    {s.features.slice(0, i < 2 ? 5 : 3).map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-[13px] text-mist/80">
                        <Check className="h-3.5 w-3.5 shrink-0 text-cobalt" strokeWidth={3} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/services"
                    state={{ scrollTo: s.slug }}
                    className="group/link mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-bold text-royal transition-colors hover:text-flare"
                  >
                    Learn More
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </Link>
                </div>
              </StaggerItem>
            );
          })}

          {/* CTA tile completes the grid */}
          <StaggerItem className="md:col-span-2">
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-royal/25 bg-gradient-to-br from-royal/15 via-ink-850 to-flare/10 p-7 transition-all duration-500 hover:-translate-y-1 sm:p-8">
              <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-royal/25 blur-3xl" aria-hidden="true" />
              <div>
                <p className="eyebrow-mono text-royal">Not sure what you need?</p>
                <h3 className="font-display mt-4 text-xl leading-snug font-bold text-mist">
                  Get a free consultation & honest recommendation.
                </h3>
              </div>
              <Link to="/contact" className="btn-primary btn-sm mt-8 self-start">
                Get a Custom Solution <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}

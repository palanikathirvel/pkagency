import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import { pricingTiers } from "../data/siteContent";
import { SectionHead, StaggerGroup, StaggerItem } from "./ui";

export default function PricingSection() {
  return (
    <section className="relative border-t border-mist/8 bg-ink-900 py-20 lg:py-28" aria-label="Pricing packages">
      <div className="shell">
        <SectionHead
          eyebrow="Packages"
          title="Flexible Solutions for Every Business"
          sub="Transparent packages that scale with you. Final pricing is always tailored to your exact scope."
          align="center"
        />

        <StaggerGroup className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-3 lg:items-stretch">
          {pricingTiers.map((tier) => (
            <StaggerItem key={tier.id} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 ${
                  tier.featured
                    ? "border border-royal/40 bg-gradient-to-b from-royal/12 via-ink-850 to-ink-850 shadow-[0_0_60px_-18px_rgba(139,124,255,0.45)]"
                    : "border border-mist/10 bg-ink-850 hover:border-mist/20"
                }`}
              >
                {tier.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-royal to-flare px-4 py-1.5 font-mono text-[10px] font-semibold tracking-[0.18em] whitespace-nowrap text-ink-950 uppercase">
                    Most Popular
                  </span>
                )}

                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl font-bold tracking-tight text-mist">
                    {tier.name}
                  </h3>
                  <span
                    className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${tier.gradient}`}
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-2 text-sm text-fog">{tier.audience}</p>

                <p className="mt-6 font-mono text-sm font-medium tracking-wide text-mist/85">
                  {tier.priceNote}
                </p>
                <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-fog/60 uppercase">
                  Editable placeholder — add real pricing later
                </p>

                <div className="my-6 h-px bg-gradient-to-r from-mist/15 to-transparent" />

                <ul className="space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-mist/85">
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${tier.gradient} text-ink-950`}
                      >
                        <Check className="h-3 w-3" strokeWidth={3.5} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  state={{ service: tier.id === "custom" ? "Digital Solutions" : "Website Development" }}
                  className={`mt-8 ${tier.featured ? "btn-primary" : "btn-ghost"} w-full`}
                >
                  {tier.cta} <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <StaggerGroup className="mx-auto mt-8 max-w-5xl">
          <StaggerItem>
            <p className="text-center text-sm text-fog">
              Every quote is fixed and transparent — no hidden costs, no surprises.{" "}
              <Link to="/contact" className="font-bold text-royal underline-offset-4 transition-colors hover:text-flare hover:underline">
                Request a custom quote →
              </Link>
            </p>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}

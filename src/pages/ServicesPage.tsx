import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { services } from "../data/services";
import { Eyebrow, PrimaryLink, Reveal } from "../components/ui";
import { usePageMeta } from "../hooks/usePageMeta";
import { waLink } from "../config/agencyConfig";

export default function ServicesPage() {
  usePageMeta(
    "Services | P.K Creative Agency — Websites, UI/UX, Branding & Digital Solutions",
    "Website development, UI/UX design, social media creative, branding and custom digital solutions — everything your brand needs to win online."
  );

  const jumpTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main className="relative overflow-hidden pt-[130px]">
      <div className="absolute inset-0 bg-grid-dark [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,black,transparent)]" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-20 right-0 h-[420px] w-[420px] rounded-full bg-royal/12 blur-[130px]" aria-hidden="true" />

      {/* Page header */}
      <header className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:px-8 lg:pb-24">
        <div>
          <Reveal>
            <Eyebrow>Our services</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-mist sm:text-5xl lg:text-6xl">
              Everything your brand needs to <span className="text-royal">win online.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-fog md:text-lg">
              Five focused disciplines, one accountable team. Mix and match what you need — we&rsquo;ll handle the rest
              end to end.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.24}>
          <nav aria-label="Service shortcuts" className="rounded-[20px] border border-mist/10 bg-ink-800/60 p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog">Jump to</p>
            <ul className="mt-4 space-y-2.5">
              {services.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => jumpTo(`svc-${s.id}`)}
                    className="group flex w-full items-center gap-3 text-left text-sm font-bold text-mist/80 transition-colors hover:text-royal"
                  >
                    <span className="font-mono text-[11px] text-fog/60">0{i + 1}</span>
                    {s.title}
                    <ArrowUpRight className="ml-auto h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>
      </header>

      {/* Detailed service rows */}
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {services.map((s, i) => {
          const Icon = s.icon;
          const flip = i % 2 === 1;
          return (
            <section
              key={s.id}
              id={`svc-${s.id}`}
              aria-label={s.title}
              className="grid scroll-mt-28 gap-10 border-t border-mist/8 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-20"
            >
              <div className={flip ? "lg:order-2" : ""}>
                <Reveal>
                  <div className="flex items-start gap-6">
                    <span className={`gradient-border group flex h-20 w-20 shrink-0 items-center justify-center rounded-[20px] border border-mist/12 bg-ink-800 ${s.tint.text}`}>
                      <Icon className="h-9 w-9" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-mono text-xs text-fog/60">0{i + 1} / 0{services.length}</p>
                      <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-mist sm:text-3xl lg:text-4xl">
                        {s.title}
                      </h2>
                    </div>
                  </div>
                  <p className="mt-6 max-w-md text-base leading-relaxed text-fog md:text-lg">{s.blurb}</p>
                  <a
                    href="#/contact"
                    className={`group mt-8 inline-flex items-center gap-2 text-sm font-bold ${s.tint.text} transition-all duration-300 hover:gap-3.5`}
                  >
                    Start with {s.title}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Reveal>
              </div>
              <div className={flip ? "lg:order-1" : ""}>
                <Reveal delay={0.1}>
                  <div className="rounded-[20px] border border-mist/8 bg-ink-800/50 p-7 transition-colors duration-500 hover:border-mist/20 md:p-9">
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog">What&rsquo;s included</p>
                    <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-sm font-semibold text-mist/85">
                          <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${s.tint.chip} border`}>
                            <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <div className="gradient-border always relative overflow-hidden rounded-[26px] bg-ink-800/80 px-8 py-14 text-center md:px-16">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-royal/20 blur-[110px]" aria-hidden="true" />
            <Sparkles className="mx-auto h-8 w-8 text-royal" aria-hidden="true" />
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-mist sm:text-4xl">
              Not sure where to start? Let&rsquo;s figure it out together.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-fog">
              Book a free 30-minute consultation — we&rsquo;ll map your goals and recommend the smallest scope that
              delivers real results.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <PrimaryLink to="/contact">Get a Free Consultation</PrimaryLink>
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-lime-wa/40 px-7 py-3.5 text-sm font-bold text-lime-wa transition-all duration-300 hover:-translate-y-0.5 hover:bg-lime-wa/10"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}

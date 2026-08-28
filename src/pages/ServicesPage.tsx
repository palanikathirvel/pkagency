import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { services } from "../data/services";
import { faqs } from "../data/siteContent";
import { Eyebrow, Reveal, StaggerGroup, StaggerItem } from "../components/ui";
import { usePageMeta } from "../hooks/usePageMeta";
import { useState } from "react";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-mist/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span className="font-display text-base font-bold text-mist transition-colors group-hover:text-royal sm:text-lg">
          {q}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-royal transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-400 ease-out ${open ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <p className="overflow-hidden text-sm leading-relaxed text-fog">{a}</p>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const location = useLocation();
  usePageMeta(
    "Services | P.K Creative Agency — Web, UI/UX, Branding & Digital Solutions",
    "Website development, UI/UX design, branding, social media design and custom digital solutions — everything your brand needs under one roof."
  );

  /* deep-link: /services with state {scrollTo: slug} */
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (target) {
      const el = document.getElementById(target);
      if (el) setTimeout(() => el.scrollIntoView({ block: "start" }), 120);
    }
  }, [location.state]);

  return (
    <main className="pt-[72px]">
      {/* header */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="bg-grid-dark absolute inset-0" aria-hidden="true" />
        <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-royal/14 blur-[120px]" aria-hidden="true" />
        <div className="shell relative">
          <Reveal>
            <Eyebrow>What we do</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display mt-5 max-w-3xl text-4xl leading-[1.05] font-extrabold tracking-tight text-mist sm:text-5xl lg:text-6xl">
              Everything Your Brand Needs,{" "}
              <span className="grad-text">Under One Roof.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fog">
              Five disciplines, one accountable team. Mix and match services —
              we'll recommend exactly what your project needs, and nothing it
              doesn't.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary">
                Get a Custom Solution <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/work" className="btn-ghost">
                See the results <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* detailed service blocks */}
      <section className="py-6" aria-label="Service details">
        <div className="shell space-y-8">
          {services.map((s, i) => {
            const Icon = s.icon;
            const flip = i % 2 === 1;
            return (
              <Reveal key={s.slug} y={36}>
                <article
                  id={s.slug}
                  className="scroll-mt-28 overflow-hidden rounded-3xl border border-mist/10 bg-ink-850/80"
                >
                  <div
                    className={`grid gap-0 lg:grid-cols-[0.95fr_1.05fr] ${flip ? "lg:[direction:rtl]" : ""}`}
                  >
                    {/* visual side */}
                    <div
                      className={`relative flex flex-col justify-between overflow-hidden bg-gradient-to-br p-8 sm:p-10 lg:p-12 ${s.gradient} lg:[direction:ltr]`}
                    >
                      <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-ink-950/25 blur-2xl" aria-hidden="true" />
                      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-950/85 text-mist shadow-2xl">
                        <Icon className="h-8 w-8" />
                      </span>
                      <div className="mt-16">
                        <p className="font-mono text-[11px] font-semibold tracking-[0.24em] text-ink-950/70 uppercase">
                          Service 0{i + 1}
                        </p>
                        <h2 className="font-display mt-3 text-3xl leading-tight font-extrabold tracking-tight text-ink-950 sm:text-4xl">
                          {s.title}
                        </h2>
                      </div>
                      <p className="mt-4 hidden max-w-sm text-sm leading-relaxed font-semibold text-ink-950/75 lg:block">
                        Best for: {s.bestFor}
                      </p>
                    </div>

                    {/* content side */}
                    <div className="p-8 sm:p-10 lg:p-12 lg:[direction:ltr]">
                      <p className="max-w-xl leading-relaxed text-fog">
                        {s.description}
                      </p>

                      <div className="mt-8 grid gap-8 sm:grid-cols-2">
                        <div>
                          <h3 className="font-mono text-[11px] font-semibold tracking-[0.22em] text-royal uppercase">
                            What's included
                          </h3>
                          <ul className="mt-4 space-y-2.5">
                            {s.features.map((f) => (
                              <li key={f} className="flex items-start gap-2.5 text-sm text-mist/85">
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-cobalt" strokeWidth={3} />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-mono text-[11px] font-semibold tracking-[0.22em] text-flare uppercase">
                            You receive
                          </h3>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {s.deliverables.map((d) => (
                              <span
                                key={d}
                                className="rounded-full border border-mist/12 bg-mist/[0.05] px-3 py-1.5 text-xs font-semibold text-mist/80"
                              >
                                {d}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Link
                        to="/contact"
                        state={{ service: s.title }}
                        className="btn-primary btn-sm mt-9"
                      >
                        Start with {s.title.split(" ")[0]} <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28" aria-label="Frequently asked questions">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Eyebrow>FAQ</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display mt-4 text-3xl leading-tight font-bold tracking-tight text-mist sm:text-4xl">
                Questions? <span className="grad-text">Answered.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 max-w-sm text-fog">
                The things clients ask us most before starting. Anything else —
                just ask.
              </p>
            </Reveal>
          </div>
          <StaggerGroup>
            {faqs.map((f) => (
              <StaggerItem key={f.q}>
                <FaqItem q={f.q} a={f.a} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </main>
  );
}

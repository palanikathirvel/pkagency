import { Link } from "react-router-dom";
import { ArrowRight, Compass, Eye } from "lucide-react";
import { teamMembers, coreValues, studioImage } from "../data/siteContent";
import { agencyConfig } from "../config/agencyConfig";
import {
  Eyebrow,
  Reveal,
  StaggerGroup,
  StaggerItem,
  InitialsAvatar,
  StatCounter,
} from "../components/ui";
import { usePageMeta } from "../hooks/usePageMeta";

export default function AboutPage() {
  usePageMeta(
    "About | P.K Creative Agency — Digital Experiences With Purpose",
    "Meet P.K Creative Agency: a creative technology studio turning ideas into powerful digital experiences for businesses and creators."
  );

  return (
    <main className="pt-[72px]">
      {/* header + studio image */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="bg-grid-dark absolute inset-0" aria-hidden="true" />
        <div className="shell relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal>
              <Eyebrow>About the studio</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="font-display mt-5 text-4xl leading-[1.05] font-extrabold tracking-tight text-mist sm:text-5xl lg:text-6xl">
                We Create Digital Experiences{" "}
                <span className="grad-text">With Purpose.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-fog">
                P.K Creative was born from a simple frustration: too many
                businesses settle for generic templates and forgettable
                brands. We believe design and technology should work together
                to grow your business — not just decorate it.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-4 max-w-xl leading-relaxed text-fog">
                We're a small, senior team that treats every project like a
                partnership. We obsess over the details — the loading time,
                the micro-copy, the hover state — because that's where
                premium lives.
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link to="/contact" className="btn-primary">
                  Work With Us <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/work" className="btn-ghost">
                  See Our Work
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} y={40}>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-mist/12 shadow-[0_40px_90px_-30px_rgba(6,7,13,0.95)]">
                <img
                  src={studioImage}
                  alt="The P.K Creative studio workspace at dusk, with designs on screen and sketches on the desk"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out hover:scale-[1.04]"
                />
              </div>
              <div className="absolute -bottom-5 -left-4 rounded-2xl border border-mist/12 bg-ink-850/95 px-5 py-4 shadow-2xl backdrop-blur sm:-left-8">
                <p className="font-mono text-[10px] tracking-[0.22em] text-fog uppercase">
                  {agencyConfig.tagline}
                </p>
                <p className="font-display mt-1 text-lg font-bold text-mist">
                  Since 2021 · {agencyConfig.location.split("·")[0]}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* mission / vision */}
      <section className="py-16 lg:py-24" aria-label="Mission and vision">
        <div className="shell grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="card-line h-full p-8 sm:p-10">
              <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-royal to-cobalt text-ink-950">
                <Compass className="h-6 w-6" />
              </span>
              <h2 className="font-display mt-6 text-2xl font-bold tracking-tight text-mist sm:text-3xl">
                Our Mission
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-fog">
                To help businesses and individuals transform their ideas into
                powerful digital experiences — websites, brands and products
                that perform as beautifully as they look.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card-line h-full p-8 sm:p-10">
              <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-cobalt to-flare text-ink-950">
                <Eye className="h-6 w-6" />
              </span>
              <h2 className="font-display mt-6 text-2xl font-bold tracking-tight text-mist sm:text-3xl">
                Our Vision
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-fog">
                To become a trusted creative technology partner for businesses
                building their future online — the studio ambitious teams call
                first, not last.
              </p>
            </div>
          </Reveal>
        </div>

        {/* values */}
        <div className="shell mt-6 grid gap-px overflow-hidden rounded-3xl border border-mist/10 bg-mist/10 sm:grid-cols-2 lg:grid-cols-4">
          {coreValues.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06} className="h-full">
              <div className="group h-full bg-ink-900 p-7 transition-colors duration-500 hover:bg-ink-850">
                <p className="font-mono text-[11px] font-semibold tracking-[0.2em] text-royal">
                  0{i + 1}
                </p>
                <h3 className="font-display mt-3 text-base font-bold text-mist">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fog">
                  {v.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* stats strip */}
      <section className="border-y border-mist/8 bg-ink-900 py-14" aria-label="Studio statistics">
        <div className="shell grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {agencyConfig.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07} className={i === 0 ? "[&>div>span]:hidden" : ""}>
              <StatCounter value={s.value} suffix={s.suffix} label={s.label} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* team */}
      <section className="py-20 lg:py-28" aria-label="Team">
        <div className="shell">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>The team</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display mt-4 text-3xl leading-[1.08] font-bold tracking-tight text-mist sm:text-4xl lg:text-[2.75rem]">
                Meet the Creative Minds Behind{" "}
                <span className="grad-text">P.K Creative</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 text-fog">
                A compact team of strategists, designers and engineers — no
                account managers between you and the people doing the work.
              </p>
            </Reveal>
          </div>

          <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((m) => (
              <StaggerItem key={m.role}>
                <div className="card-line group h-full p-7 text-center">
                  <div className="relative mx-auto w-fit">
                    <InitialsAvatar initials={m.initials} gradient={m.gradient} size="lg" />
                    <span className="absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full border border-mist/15 bg-ink-950 font-mono text-[9px] text-fog" title="Placeholder profile">
                      ?
                    </span>
                  </div>
                  <h3 className="font-display mt-5 text-lg font-bold text-mist">
                    {m.name}
                  </h3>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.18em] text-royal uppercase">
                    {m.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-fog">{m.bio}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal>
            <p className="mt-8 text-center font-mono text-[10px] tracking-[0.2em] text-fog/50 uppercase">
              Team cards are placeholders — add real members & photos in src/data/siteContent.ts
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

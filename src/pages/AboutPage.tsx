import { Eye, Sparkles, Target } from "lucide-react";
import { team } from "../data/siteContent";
import { agency } from "../config/agencyConfig";
import { Eyebrow, PrimaryLink, Reveal, SectionHeading } from "../components/ui";
import { usePageMeta } from "../hooks/usePageMeta";

const studioImg = "https://image.qwenlm.ai/generated-images/74b71414-fc60-443c-b5a5-d24343a958fb/_result.png";

export default function AboutPage() {
  usePageMeta(
    "About | P.K Creative Agency — Digital Experiences With Purpose",
    "Meet P.K Creative Agency — a creative technology team helping businesses transform ideas into powerful digital experiences."
  );

  return (
    <main className="relative overflow-hidden pt-[130px]">
      <div className="absolute inset-0 bg-grid-dark [mask-image:radial-gradient(ellipse_70%_45%_at_50%_0%,black,transparent)]" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-20 left-0 h-[420px] w-[420px] rounded-full bg-cobalt/10 blur-[130px]" aria-hidden="true" />

      {/* Header */}
      <header className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-28">
        <div>
          <Reveal>
            <Eyebrow>About {agency.shortName}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-mist sm:text-5xl lg:text-[3.4rem]">
              We Create Digital Experiences <span className="text-cobalt">With Purpose.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-7 max-w-xl space-y-4 text-base leading-relaxed text-fog md:text-lg">
              <p>
                {agency.name} was born from a simple belief: great design and smart technology shouldn&rsquo;t be
                reserved for big brands with big budgets. We exist to help startups, local businesses and creators
                stand shoulder to shoulder with anyone online.
              </p>
              <p>
                We&rsquo;re passionate about the space where creativity meets technology — and obsessive about the
                details that make a product feel premium: rhythm, contrast, speed and clarity.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9">
              <PrimaryLink to="/contact">Work With Us</PrimaryLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} y={40}>
          <div className="group relative">
            <div className="gradient-border always overflow-hidden rounded-[26px]">
              <img
                src={studioImg}
                alt="The P.K Creative studio — a designer workspace glowing with violet and blue light"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl border border-mist/12 bg-ink-800/95 px-5 py-4 shadow-2xl backdrop-blur md:-left-8">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-royal to-cobalt text-ink-950">
                <Sparkles className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-sm font-bold text-mist">Creativity × Technology</p>
                <p className="font-mono text-[11px] text-fog">{agency.tagline}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </header>

      {/* Mission & Vision */}
      <section className="relative border-t border-mist/8 bg-ink-900/50 py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="What drives us"
            title={
              <>
                Mission & <span className="text-royal">Vision</span>
              </>
            }
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              {
                icon: Target,
                kicker: "Our Mission",
                title: "Transform ideas into powerful digital experiences.",
                body: "To help businesses and individuals transform their ideas into powerful digital experiences — with craft, honesty and speed.",
                tint: "text-royal",
                chip: "bg-royal/10 border-royal/25",
              },
              {
                icon: Eye,
                kicker: "Our Vision",
                title: "Be the creative technology partner behind great brands.",
                body: "To become a trusted creative technology partner for businesses building their future online — from first website to full digital ecosystem.",
                tint: "text-cobalt",
                chip: "bg-cobalt/10 border-cobalt/25",
              },
            ].map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal key={v.kicker} delay={i * 0.1}>
                  <article className="gradient-border group h-full rounded-[22px] border border-mist/8 bg-ink-800/60 p-9 transition-all duration-500 hover:-translate-y-2">
                    <span className={`flex h-13 w-13 items-center justify-center rounded-xl border p-3.5 ${v.chip} ${v.tint}`}>
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <p className={`mt-6 font-mono text-[11px] uppercase tracking-[0.22em] ${v.tint}`}>{v.kicker}</p>
                    <h3 className="mt-3 font-display text-2xl font-bold leading-snug text-mist">{v.title}</h3>
                    <p className="mt-4 leading-relaxed text-fog">{v.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            center
            eyebrow="The team"
            title={
              <>
                Meet the Creative Minds Behind <span className="text-flare">P.K Creative</span>
              </>
            }
            sub="A compact senior crew — strategist, designer and engineer on every project, no layers in between."
          />
          <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-5 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m.role} delay={i * 0.08}>
                <article className="group rounded-[20px] border border-mist/8 bg-ink-800/60 p-6 text-center transition-all duration-500 hover:-translate-y-2 hover:border-mist/25">
                  <span
                    className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br font-display text-xl font-extrabold text-ink-950 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 ${
                      ["from-royal to-cobalt", "from-cobalt to-flare", "from-flare to-royal", "from-royal to-flare"][i % 4]
                    }`}
                  >
                    {m.initials}
                  </span>
                  <h3 className="mt-5 font-display text-base font-bold text-mist">{m.name}</h3>
                  <p className="mt-1.5 text-xs font-semibold text-fog">{m.role}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <p className="mt-10 text-center font-mono text-[11px] text-fog/70">
              ※ Team profiles are placeholders — add real members in <span className="text-fog">src/data/siteContent.ts</span>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

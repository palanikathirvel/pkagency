import { whyUs } from "../data/siteContent";
import { PrimaryLink, Reveal, Eyebrow } from "./ui";

const tints = [
  { text: "text-royal", border: "group-hover:border-royal/50 group-hover:bg-royal/10" },
  { text: "text-cobalt", border: "group-hover:border-cobalt/50 group-hover:bg-cobalt/10" },
  { text: "text-flare", border: "group-hover:border-flare/50 group-hover:bg-flare/10" },
];

export default function WhyChooseUs() {
  return (
    <section className="relative border-t border-mist/8 bg-ink-900/50 py-24 lg:py-32">
      <div className="pointer-events-none absolute left-0 top-1/3 h-[420px] w-[420px] rounded-full bg-cobalt/8 blur-[140px]" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-16 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
        {/* Sticky intro column */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow>The P.K difference</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.06] tracking-tight text-mist sm:text-4xl lg:text-[2.75rem]">
              Why Choose
              <span className="block text-royal">P.K Creative?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-fog">
              We&rsquo;re a small, senior team that treats every project like it&rsquo;s our own brand on the line. No
              hand-offs to juniors, no disappearing acts — just craft, clarity and momentum.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9">
              <PrimaryLink to="/contact">Start Your Project</PrimaryLink>
            </div>
          </Reveal>
          <Reveal delay={0.32}>
            <p className="mt-10 select-none font-display text-[7rem] font-extrabold leading-none tracking-tight text-mist/[0.045] lg:text-[9rem]" aria-hidden="true">
              P·K
            </p>
          </Reveal>
        </div>

        {/* Six reasons */}
        <div>
          {whyUs.map((item, i) => {
            const Icon = item.icon;
            const tint = tints[i % tints.length];
            return (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="group flex gap-5 border-b border-mist/8 py-7 transition-transform duration-500 first:pt-0 hover:translate-x-2 md:gap-7 md:py-8">
                  <span className="mt-1 hidden font-mono text-xs text-fog/50 sm:block">0{i + 1}</span>
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-mist/12 text-fog transition-all duration-500 group-hover:-rotate-6 ${tint.border} ${tint.text}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-mist md:text-xl">{item.title}</h3>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-fog md:text-base">{item.body}</p>
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

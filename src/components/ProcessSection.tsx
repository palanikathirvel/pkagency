import { processSteps } from "../data/siteContent";
import { PrimaryLink, Reveal, SectionHeading } from "./ui";

/** Light "paper" section — deliberate contrast inside the dark site */
export default function ProcessSection() {
  return (
    <section className="relative overflow-hidden bg-paper py-24 text-ink-900 lg:py-32">
      <div className="absolute inset-0 bg-grid-light [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,black,transparent)]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 top-10 h-[360px] w-[360px] rounded-full bg-royal/15 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-[320px] w-[320px] rounded-full bg-cobalt/15 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            light
            eyebrow="Our process"
            title={
              <>
                How We <span className="text-royal">Work</span>
              </>
            }
            sub="A transparent five-step journey from the first call to launch day — you always know what's happening and what's next."
          />
          <Reveal delay={0.2} className="shrink-0">
            <p className="max-w-[220px] font-mono text-xs leading-relaxed text-ink-900/50">
              Average project timeline:
              <span className="block font-display text-2xl font-extrabold text-ink-900">2–6 weeks</span>
            </p>
          </Reveal>
        </div>

        {/* Timeline */}
        <div className="relative mt-16">
          <div className="absolute left-[22px] top-2 bottom-2 w-px bg-ink-900/12 lg:bottom-auto lg:left-0 lg:right-0 lg:top-[22px] lg:h-px lg:w-auto" aria-hidden="true" />
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-5">
            {processSteps.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.1} className="relative">
                <div className="group relative pl-16 lg:pl-0 lg:pt-12">
                  {/* Node */}
                  <span className="absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink-900/15 bg-paper font-mono text-xs font-semibold text-ink-900 transition-all duration-500 group-hover:border-royal group-hover:bg-royal group-hover:text-ink-950 group-hover:shadow-[0_0_0_6px_rgba(139,124,255,0.15)] lg:left-0">
                    {step.num}
                  </span>
                  <div className="rounded-[18px] border border-ink-900/10 bg-[#f7f8fc] p-6 transition-all duration-500 group-hover:-translate-y-2 group-hover:border-royal/40 group-hover:shadow-[0_24px_50px_-24px_rgba(10,12,22,0.35)]">
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-royal">Step {step.num}</span>
                    <h3 className="mt-2 font-display text-xl font-bold text-ink-900">{step.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink-900/65">{step.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-16 text-center">
          <PrimaryLink to="/contact">Let&rsquo;s Start Your Project</PrimaryLink>
        </Reveal>
      </div>
    </section>
  );
}

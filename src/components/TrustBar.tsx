import { Reveal, ClientMarquee, StatCounter, GradDivider } from "./ui";
import { agencyConfig } from "../config/agencyConfig";

export default function TrustBar() {
  return (
    <section className="relative py-14 lg:py-20" aria-label="Trusted by ambitious brands">
      <div className="shell">
        <Reveal>
          <p className="text-center font-mono text-[11px] tracking-[0.24em] text-fog uppercase">
            Helping ambitious brands build their digital presence
          </p>
        </Reveal>

        <div className="mt-8">
          <ClientMarquee />
        </div>
        <Reveal>
          <p className="mt-4 text-center font-mono text-[10px] tracking-[0.2em] text-fog/50 uppercase">
            Client names shown are placeholders — replace with real partners
          </p>
        </Reveal>

        <GradDivider className="my-12" />

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {agencyConfig.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className={i === 0 ? "[&>div>span]:hidden" : ""}>
              <StatCounter value={s.value} suffix={s.suffix} label={s.label} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 text-center font-mono text-[10px] tracking-[0.2em] text-fog/50 uppercase">
            Stats are editable placeholders — update them in src/config/agencyConfig.ts
          </p>
        </Reveal>
      </div>
    </section>
  );
}

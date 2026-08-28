import { agency } from "../config/agencyConfig";
import { marqueeItems } from "../data/siteContent";
import { Counter, Reveal } from "./ui";

function Spark() {
  return (
    <svg viewBox="0 0 12 12" className="h-3 w-3 text-royal/80" fill="currentColor" aria-hidden="true">
      <path d="M6 0l1.4 4.6L12 6 7.4 7.4 6 12 4.6 7.4 0 6l4.6-1.4z" />
    </svg>
  );
}

export default function TrustBar() {
  const doubled = [...marqueeItems, ...marqueeItems];
  return (
    <section aria-label="What we craft and agency statistics" className="relative border-y border-mist/8 bg-ink-900/70">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <Reveal>
          <p className="text-center font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-fog md:text-xs">
            Helping ambitious brands build their digital presence
          </p>
        </Reveal>

        {/* Capability marquee */}
        <div className="marquee-paused relative mt-9 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="marquee-track animate-marquee items-center gap-12">
            {doubled.map((item, i) => (
              <span key={i} className="flex items-center gap-12">
                <span className="whitespace-nowrap font-display text-2xl font-bold text-mist/35 transition-colors hover:text-mist/70">
                  {item}
                </span>
                <Spark />
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {agency.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="relative px-6 text-center lg:border-l lg:border-mist/8 lg:first:border-l-0">
              <p className="font-display text-4xl font-extrabold tracking-tight text-mist md:text-5xl">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fog">{s.label}</p>
              <span
                className={`mx-auto mt-4 block h-1 w-10 rounded-full ${
                  ["bg-royal", "bg-cobalt", "bg-flare", "bg-gradient-to-r from-royal to-cobalt"][i % 4]
                }`}
                aria-hidden="true"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

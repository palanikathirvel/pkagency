import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { projects } from "../data/projects";
import { SectionHead, StaggerGroup, StaggerItem } from "./ui";

export default function PortfolioSection() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="relative overflow-hidden py-20 lg:py-28" aria-label="Selected work">
      <div
        className="pointer-events-none absolute top-1/3 -right-40 h-[420px] w-[420px] rounded-full bg-flare/8 blur-[130px]"
        aria-hidden="true"
      />
      <div className="shell relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            eyebrow="Portfolio"
            title="Selected Work"
            sub="A selection of projects and digital experiences we've created."
          />
          <Link to="/work" className="btn-ghost btn-sm mb-1 hidden shrink-0 lg:inline-flex">
            View All Work <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <StaggerItem key={p.id}>
              <article className="card-line group flex h-full flex-col overflow-hidden p-0">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />
                  <span className="absolute top-4 left-4 rounded-full border border-mist/20 bg-ink-950/70 px-3 py-1 font-mono text-[10px] font-medium tracking-[0.16em] text-mist uppercase backdrop-blur">
                    {p.clientType}
                  </span>
                  <Link
                    to="/work"
                    aria-label={`View project: ${p.name}`}
                    className="absolute top-4 right-4 flex h-10 w-10 translate-y-1 items-center justify-center rounded-full bg-mist text-ink-950 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <span className="absolute bottom-4 left-4 font-mono text-[11px] tracking-[0.2em] text-mist/70 uppercase">
                    {p.year}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="font-display text-lg font-bold tracking-tight text-mist sm:text-xl">
                    {p.name}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-fog">
                    {p.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-mist/12 bg-mist/[0.05] px-2.5 py-1 font-mono text-[10px] font-medium tracking-wider text-mist/75"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link
                    to="/work"
                    className="group/vp mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold text-royal transition-colors hover:text-flare"
                  >
                    View Project
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/vp:translate-x-0.5 group-hover/vp:-translate-y-0.5" />
                  </Link>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* conversion banner */}
        <StaggerGroup className="mt-12">
          <StaggerItem>
            <div className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl border border-mist/10 bg-ink-850 px-7 py-8 sm:flex-row sm:items-center sm:px-10">
              <div className="pointer-events-none absolute -top-16 right-10 h-44 w-44 rounded-full bg-cobalt/15 blur-3xl" aria-hidden="true" />
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-royal to-flare text-ink-950">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-mist">
                    Build Something Like This
                  </h3>
                  <p className="mt-1 text-sm text-fog">
                    Your project could be our next case study.
                  </p>
                </div>
              </div>
              <Link to="/contact" className="btn-primary shrink-0">
                Start Your Project <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}

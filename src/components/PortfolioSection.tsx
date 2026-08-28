import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { projects, projectCategories } from "../data/projects";
import { Chip, GhostLink, PrimaryLink, Reveal, SectionHeading } from "./ui";

export default function PortfolioSection({
  featured = false,
  showHeader = true,
}: {
  featured?: boolean;
  showHeader?: boolean;
}) {
  const [filter, setFilter] = useState<(typeof projectCategories)[number]>("All");
  const reduced = useReducedMotion();

  const filtered = useMemo(() => {
    const list = filter === "All" ? projects : projects.filter((p) => p.category === filter);
    return featured ? list.slice(0, 3) : list;
  }, [filter, featured]);

  return (
    <section id="work" className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute left-1/4 top-0 h-[380px] w-[380px] rounded-full bg-flare/7 blur-[130px]" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {showHeader && (
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Portfolio"
              title={
                <>
                  Selected <span className="text-flare">Work</span>
                </>
              }
              sub="A selection of projects and digital experiences we've created."
            />
            {featured && (
              <Reveal delay={0.2} className="shrink-0">
                <GhostLink to="/work">View All Work</GhostLink>
              </Reveal>
            )}
          </div>
        )}

        {/* Filters */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-2.5" role="tablist" aria-label="Filter projects by category">
            {projectCategories.map((c) => {
              const count = c === "All" ? projects.length : projects.filter((p) => p.category === c).length;
              const active = filter === c;
              return (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(c)}
                  className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-r from-royal to-cobalt text-ink-950 shadow-[0_6px_24px_-6px_rgba(139,124,255,0.6)]"
                      : "border border-mist/12 text-fog hover:border-mist/30 hover:text-mist"
                  }`}
                >
                  {c} <span className={`ml-1 font-mono text-[11px] ${active ? "text-ink-950/70" : "text-fog/60"}`}>{count}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Grid */}
        <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.article
                layout={!reduced}
                key={p.id}
                initial={{ opacity: 0, scale: 0.94, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-[20px] border border-mist/8 bg-ink-800/60 transition-colors duration-500 hover:border-mist/20"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={`${p.name} — ${p.category} project by P.K Creative Agency`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" aria-hidden="true" />
                  <Chip className="absolute left-4 top-4 border-mist/15 bg-ink-950/70 text-mist backdrop-blur">{p.category}</Chip>
                  <span className="absolute right-4 top-4 font-mono text-[11px] text-mist/70">{p.year}</span>
                  <Link
                    to="/contact"
                    aria-label={`Start a project like ${p.name}`}
                    className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                  >
                    <span className="flex translate-y-3 items-center gap-2 rounded-full bg-mist px-6 py-3 text-sm font-bold text-ink-950 shadow-xl transition-transform duration-400 group-hover:translate-y-0">
                      View Project <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Link>
                </div>
                <div className="p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-royal">{p.client}</p>
                  <h3 className="mt-2 font-display text-xl font-bold text-mist">{p.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fog">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {!featured && (
          <Reveal className="mt-14 text-center">
            <p className="font-display text-2xl font-bold text-mist">Like what you see?</p>
            <p className="mt-2 text-fog">Your project could be next in this grid.</p>
            <div className="mt-7">
              <PrimaryLink to="/contact">Build Something Like This</PrimaryLink>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

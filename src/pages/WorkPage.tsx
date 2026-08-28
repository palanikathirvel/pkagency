import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, X, Check } from "lucide-react";
import { projects, projectCategories, type Project } from "../data/projects";
import { Eyebrow, Reveal } from "../components/ui";
import { usePageMeta } from "../hooks/usePageMeta";

export default function WorkPage() {
  usePageMeta(
    "Our Work | P.K Creative Agency — Selected Projects",
    "A selection of websites, brands and digital products created by P.K Creative Agency."
  );
  const [filter, setFilter] = useState<(typeof projectCategories)[number]>("All");
  const [active, setActive] = useState<Project | null>(null);
  const reduced = useReducedMotion();

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  const countFor = (c: (typeof projectCategories)[number]) =>
    c === "All" ? projects.length : projects.filter((p) => p.category === c).length;

  /* lock scroll while modal open + Esc to close */
  useEffect(() => {
    if (!active) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <main className="pt-[72px]">
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="bg-grid-dark absolute inset-0" aria-hidden="true" />
        <div className="pointer-events-none absolute -top-24 left-0 h-96 w-96 rounded-full bg-cobalt/12 blur-[120px]" aria-hidden="true" />
        <div className="shell relative">
          <Reveal>
            <Eyebrow>Portfolio</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display mt-5 max-w-3xl text-4xl leading-[1.05] font-extrabold tracking-tight text-mist sm:text-5xl lg:text-6xl">
              Selected <span className="grad-text">Work</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fog">
              A selection of projects and digital experiences we've created —
              each one built around a specific business goal.
            </p>
          </Reveal>

          {/* filters */}
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap gap-2.5" role="tablist" aria-label="Filter projects by category">
              {projectCategories.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={filter === c}
                  onClick={() => setFilter(c)}
                  className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
                    filter === c
                      ? "bg-gradient-to-r from-royal to-cobalt text-ink-950 shadow-[0_8px_26px_-8px_rgba(139,124,255,0.6)]"
                      : "border border-mist/15 text-fog hover:border-royal/50 hover:text-mist"
                  }`}
                >
                  {c}
                  <span className={`ml-2 font-mono text-[10px] ${filter === c ? "text-ink-950/70" : "text-fog/60"}`}>
                    {countFor(c)}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 lg:pb-28" aria-label="Project grid">
        <div className="shell">
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((p) => (
                <motion.article
                  layout
                  key={p.id}
                  initial={reduced ? false : { opacity: 0, scale: 0.94, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="card-line group flex flex-col overflow-hidden p-0"
                >
                  <button
                    type="button"
                    onClick={() => setActive(p)}
                    className="relative block aspect-[3/2] w-full cursor-pointer overflow-hidden text-left"
                    aria-label={`Open project details: ${p.name}`}
                  >
                    <img
                      src={p.image}
                      alt={p.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />
                    <span className="absolute top-4 left-4 rounded-full border border-mist/20 bg-ink-950/70 px-3 py-1 font-mono text-[10px] font-medium tracking-[0.16em] text-mist uppercase backdrop-blur">
                      {p.category}
                    </span>
                    <span className="absolute top-4 right-4 flex h-10 w-10 translate-y-1 items-center justify-center rounded-full bg-mist text-ink-950 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </button>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <p className="font-mono text-[10px] tracking-[0.2em] text-fog/70 uppercase">
                      {p.clientType} · {p.year}
                    </p>
                    <h2 className="font-display mt-2 text-lg font-bold tracking-tight text-mist sm:text-xl">
                      {p.name}
                    </h2>
                    <p className="mt-2.5 text-sm leading-relaxed text-fog">{p.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <span key={t} className="rounded-full border border-mist/12 bg-mist/[0.05] px-2.5 py-1 font-mono text-[10px] font-medium tracking-wider text-mist/75">
                          {t}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setActive(p)}
                      className="group/vp mt-auto inline-flex items-center gap-1.5 pt-5 text-left text-sm font-bold text-royal transition-colors hover:text-flare"
                    >
                      View Project
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/vp:translate-x-0.5 group-hover/vp:-translate-y-0.5" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          <Reveal className="mt-16">
            <div className="relative overflow-hidden rounded-3xl border border-mist/10 bg-ink-850 px-8 py-12 text-center">
              <div className="pointer-events-none absolute -top-20 left-1/3 h-56 w-56 rounded-full bg-royal/18 blur-[100px]" aria-hidden="true" />
              <h2 className="font-display text-2xl font-bold text-mist sm:text-3xl">
                Like what you see?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-fog">
                Let's make your project the next one on this page.
              </p>
              <Link to="/contact" className="btn-primary mt-7">
                Build Something Like This <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* project detail modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="modal"
            className="fixed inset-0 z-[70] flex items-end justify-center bg-ink-950/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${active.name} project details`}
          >
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 60, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-mist/12 bg-ink-900 sm:rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img src={active.image} alt={active.alt} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent" />
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Close project details"
                  className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-mist/20 bg-ink-950/80 text-mist backdrop-blur transition-colors hover:border-flare/60 hover:text-flare"
                >
                  <X className="h-5 w-5" />
                </button>
                <span className="absolute bottom-4 left-5 rounded-full border border-mist/20 bg-ink-950/70 px-3 py-1 font-mono text-[10px] font-medium tracking-[0.16em] text-mist uppercase backdrop-blur">
                  {active.clientType} · {active.year}
                </span>
              </div>
              <div className="p-7 sm:p-10">
                <h2 className="font-display text-2xl font-bold tracking-tight text-mist sm:text-3xl">
                  {active.name}
                </h2>
                <p className="mt-4 leading-relaxed text-fog">{active.longDescription}</p>

                <h3 className="mt-8 font-mono text-[11px] font-semibold tracking-[0.22em] text-royal uppercase">
                  Project highlights
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {active.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm text-mist/85">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-cobalt" strokeWidth={3} />
                      {h}
                    </li>
                  ))}
                </ul>

                <h3 className="mt-8 font-mono text-[11px] font-semibold tracking-[0.22em] text-flare uppercase">
                  Technologies
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {active.tech.map((t) => (
                    <span key={t} className="rounded-full border border-mist/12 bg-mist/[0.05] px-3 py-1.5 font-mono text-xs text-mist/80">
                      {t}
                    </span>
                  ))}
                </div>

                <Link to="/contact" className="btn-primary mt-9 w-full sm:w-auto">
                  Build Something Like This <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

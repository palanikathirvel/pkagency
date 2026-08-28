import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "../data/testimonials";
import { Reveal, SectionHeading } from "./ui";

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const count = testimonials.length;

  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 5500);
    return () => clearInterval(id);
  }, [reduced, paused, count]);

  const t = testimonials[index];

  return (
    <section
      className="relative border-t border-mist/8 py-24 lg:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute right-1/4 top-10 h-[360px] w-[360px] rounded-full bg-royal/8 blur-[130px]" aria-hidden="true" />
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <SectionHeading
          center
          eyebrow="Testimonials"
          title={
            <>
              What Our Clients <span className="text-cobalt">Say</span>
            </>
          }
        />

        <Reveal delay={0.15}>
          <div className="relative mt-14">
            <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 select-none font-display text-[9rem] font-extrabold leading-none text-royal/10" aria-hidden="true">
              &ldquo;
            </span>

            <div className="relative overflow-hidden rounded-[24px] border border-mist/10 bg-ink-800/70 px-7 py-10 md:px-14 md:py-14">
              <AnimatePresence mode="wait">
                <motion.figure
                  key={t.id}
                  initial={{ opacity: 0, x: reduced ? 0 : 46 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: reduced ? 0 : -46 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center"
                >
                  <div className="flex justify-center gap-1" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4.5 w-4.5 fill-royal text-royal" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed text-mist md:text-2xl md:leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-8 flex items-center justify-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-royal to-cobalt font-display text-sm font-bold text-ink-950">
                      {t.initials}
                    </span>
                    <span className="text-left">
                      <span className="block text-sm font-bold text-mist">{t.name}</span>
                      <span className="block font-mono text-[11px] text-fog">{t.company}</span>
                    </span>
                    {t.placeholder && (
                      <span className="rounded-full border border-flare/30 bg-flare/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-flare">
                        Placeholder
                      </span>
                    )}
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={() => setIndex((index - 1 + count) % count)}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-mist/12 text-fog transition-all duration-300 hover:-translate-y-0.5 hover:border-royal/50 hover:text-royal"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <div className="flex gap-2.5" role="tablist" aria-label="Choose testimonial">
                {testimonials.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Testimonial ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full transition-all duration-400 ${
                      i === index ? "w-8 bg-gradient-to-r from-royal to-cobalt" : "w-2 bg-mist/20 hover:bg-mist/40"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setIndex((index + 1) % count)}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-mist/12 text-fog transition-all duration-300 hover:-translate-y-0.5 hover:border-royal/50 hover:text-royal"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <p className="mt-8 text-center font-mono text-[11px] leading-relaxed text-fog/70">
              ※ Placeholder testimonials — replace with real client feedback in{" "}
              <span className="text-fog">src/data/testimonials.ts</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "../data/testimonials";
import { SectionHead, Stars, InitialsAvatar, Reveal } from "./ui";

export default function TestimonialsSection() {
  const [[index, dir], setIndex] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = testimonials.length;

  const go = useCallback(
    (next: number, direction: number) => {
      setIndex([((next % count) + count) % count, direction]);
    },
    [count]
  );

  /* autoplay — paused on hover / reduced motion */
  useEffect(() => {
    if (reduced || paused) return;
    timer.current = setInterval(() => {
      setIndex(([i]) => [(i + 1) % count, 1]);
    }, 6000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [reduced, paused, count]);

  const t = testimonials[index];

  return (
    <section className="relative overflow-hidden py-20 lg:py-28" aria-label="Testimonials">
      <div className="pointer-events-none absolute -top-20 left-1/4 h-80 w-80 rounded-full bg-royal/10 blur-[120px]" aria-hidden="true" />
      <div className="shell relative">
        <SectionHead
          eyebrow="Testimonials"
          title="What Our Clients Say"
          sub="Real words from the people we've partnered with."
          align="center"
        />

        <Reveal delay={0.1}>
          <div
            className="relative mx-auto mt-12 max-w-3xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <Quote className="absolute -top-6 -left-2 h-16 w-16 text-royal/15 sm:-left-8" aria-hidden="true" />

            <div className="overflow-hidden rounded-3xl border border-mist/10 bg-ink-850/90 shadow-[0_30px_80px_-30px_rgba(6,7,13,0.9)]">
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.figure
                  key={t.id}
                  custom={dir}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, x: dir >= 0 ? 70 : -70 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, x: dir >= 0 ? -70 : 70 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="p-8 sm:p-12"
                >
                  <div className="flex items-center justify-between gap-4">
                    <Stars value={t.rating} />
                    <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 font-mono text-[10px] font-medium tracking-[0.14em] text-amber-200 uppercase">
                      Sample — replace with real quote
                    </span>
                  </div>
                  <blockquote className="font-display mt-6 text-xl leading-snug font-semibold tracking-tight text-mist text-balance sm:text-2xl">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4">
                    <InitialsAvatar initials={t.initials} gradient={t.gradient} />
                    <div>
                      <p className="text-sm font-bold text-mist">
                        {t.name}
                        <span className="ml-2 font-mono text-[10px] font-medium tracking-wider text-fog/70 uppercase">
                          placeholder
                        </span>
                      </p>
                      <p className="mt-0.5 text-xs text-fog">
                        {t.role} · {t.company}
                      </p>
                    </div>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            {/* controls */}
            <div className="mt-7 flex items-center justify-between">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => go(i, i > index ? 1 : -1)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-400 ${
                      i === index ? "w-8 bg-gradient-to-r from-royal to-flare" : "w-3 bg-mist/20 hover:bg-mist/40"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => go(index - 1, -1)}
                  aria-label="Previous testimonial"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-mist/15 text-fog transition-all duration-300 hover:border-royal/60 hover:text-mist active:scale-95"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => go(index + 1, 1)}
                  aria-label="Next testimonial"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-mist/15 text-fog transition-all duration-300 hover:border-royal/60 hover:text-mist active:scale-95"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <p className="mt-5 text-center font-mono text-[10px] tracking-[0.18em] text-fog/50 uppercase">
              Testimonials above are placeholders — swap in real client feedback
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { agencyConfig } from "../config/agencyConfig";

/** Sets document title + meta description + OG tags per page (SEO). */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;

    const ensure = (attr: "name" | "property", key: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(
        `meta[${attr}="${key}"]`
      );
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      return el;
    };

    ensure("name", "description").content = description;
    ensure("property", "og:title").content = title;
    ensure("property", "og:description").content = description;
    ensure("property", "og:url").content = agencyConfig.siteUrl;
  }, [title, description]);
}

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#______";

/** Signature motion: scramble-decode text reveal. Respects reduced motion. */
export function useScramble(text: string, delayMs = 0) {
  const reduced = useReducedMotion();
  const [output, setOutput] = useState(reduced ? text : "");
  const frame = useRef(0);

  useEffect(() => {
    if (reduced) {
      setOutput(text);
      return;
    }
    let raf = 0;
    let started = false;
    const total = 46;
    const startAt = performance.now() + delayMs;

    const tick = (now: number) => {
      if (now < startAt) {
        raf = requestAnimationFrame(tick);
        return;
      }
      if (!started) {
        started = true;
        frame.current = 0;
      }
      frame.current += 1;
      const progress = frame.current / total;
      const revealed = Math.floor(progress * text.length);
      let next = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (i < revealed || ch === " ") next += ch;
        else
          next +=
            SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
      setOutput(next);
      if (frame.current < total) raf = requestAnimationFrame(tick);
      else setOutput(text);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, delayMs, reduced]);

  return output;
}

/** Animated integer counter (eased). Respects reduced motion. */
export function useCountUp(target: number, start: boolean, duration = 1700) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (reduced) {
      setValue(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration, reduced]);

  return value;
}

/** True once the ref'd element has entered the viewport (once). */
export function useInViewOnce<T extends HTMLElement>(margin = "-60px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: margin, threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [margin, inView]);

  return { ref, inView };
}

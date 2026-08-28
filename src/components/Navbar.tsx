import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { agencyConfig, whatsappLink } from "../config/agencyConfig";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-mist/10 bg-ink-950/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="shell flex h-[72px] items-center justify-between" aria-label="Main">
          <Logo />

          {/* desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {agencyConfig.navLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`group relative rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                    isActive(l.to) ? "text-mist" : "text-fog hover:text-mist"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute inset-x-4 -bottom-0.5 h-px origin-left bg-gradient-to-r from-royal to-flare transition-transform duration-300 ${
                      isActive(l.to)
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <Link to="/contact" className="btn-primary btn-sm">
              Let's Talk
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-mist/15 bg-mist/5 text-mist transition-colors hover:border-royal/60 lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "open"}
                initial={reduced ? false : { rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={reduced ? undefined : { rotate: 90, opacity: 0 }}
                transition={{ duration: 0.22 }}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </nav>
      </header>

      {/* mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-ink-950/97 backdrop-blur-2xl lg:hidden"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-grid-dark pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-royal/15 blur-[120px]" aria-hidden="true" />

            <div className="shell relative mt-[72px] flex flex-1 flex-col justify-between py-10">
              <ul className="space-y-2">
                {agencyConfig.navLinks.map((l, i) => (
                  <motion.li
                    key={l.to}
                    initial={reduced ? false : { opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.06, duration: 0.4 }}
                  >
                    <Link
                      to={l.to}
                      className={`font-display group flex items-baseline gap-4 py-2 text-4xl font-bold tracking-tight transition-colors ${
                        isActive(l.to) ? "grad-text" : "text-mist hover:text-royal"
                      }`}
                    >
                      <span className="font-mono text-xs font-medium text-fog">
                        0{i + 1}
                      </span>
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="space-y-5"
              >
                <div className="flex flex-wrap gap-3">
                  <Link to="/contact" className="btn-primary">
                    Let's Talk <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost"
                  >
                    WhatsApp Us
                  </a>
                </div>
                <p className="font-mono text-[11px] tracking-[0.2em] text-fog uppercase">
                  {agencyConfig.email} · {agencyConfig.phone}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

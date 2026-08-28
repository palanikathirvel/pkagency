import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import { GradDivider, Reveal } from "./ui";
import { agencyConfig } from "../config/agencyConfig";
import { services } from "../data/services";

const socialPaths: Record<string, string> = {
  LinkedIn:
    "M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.06c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.77 2.65 4.77 6.1V24h-4v-8.5c0-2.03-.04-4.64-2.83-4.64-2.83 0-3.27 2.2-3.27 4.5V24h-4V8z",
  Instagram:
    "M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.18 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.7 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.15A3.99 3.99 0 1 1 16 12a3.99 3.99 0 0 1-4 3.99zm6.41-11.85a1.44 1.44 0 1 0 1.43 1.44 1.44 1.44 0 0 0-1.43-1.44z",
  Behance:
    "M9.5 11.2c.9-.4 1.5-1.2 1.5-2.4 0-2.5-1.9-3.3-4.3-3.3H0v12.9h6.9c2.6 0 5.2-1.2 5.2-4.2 0-1.6-.8-2.6-2.6-3zM3 8h3.2c1.1 0 2 .4 2 1.6s-.8 1.6-1.9 1.6H3V8zm3.5 7.8H3v-3.4h3.6c1.4 0 2.3.6 2.3 1.8s-1 1.6-2.4 1.6zM21.9 12.2c0-3.2-2-5.6-5.3-5.6-3.2 0-5.5 2.4-5.5 5.6 0 3.3 2.2 5.6 5.6 5.6 2.6 0 4.3-1.2 5.1-3.3h-2.7c-.3.7-1.1 1.1-2.3 1.1-1.5 0-2.5-.8-2.7-2.4h7.8v-.9zm-7.8-1c.2-1.4 1.1-2.2 2.5-2.2s2.2.8 2.4 2.2h-4.9zM14.1 3.5h5.6V2h-5.6v1.5z",
  GitHub:
    "M12 .3a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.49 5.92.43.38.82 1.11.82 2.24v3.32c0 .32.21.7.82.58A12 12 0 0 0 12 .3z",
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-mist/10 bg-ink-900">
      {/* CTA banner */}
      <div className="shell pt-16 pb-4">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-mist/10 bg-ink-850 px-7 py-12 text-center sm:px-12 lg:py-16">
            <div className="pointer-events-none absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-royal/20 blur-[100px]" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-24 right-1/4 h-64 w-64 rounded-full bg-flare/15 blur-[100px]" aria-hidden="true" />
            <p className="eyebrow-mono justify-center text-royal">
              Ready when you are
            </p>
            <h2 className="font-display mx-auto mt-4 max-w-2xl text-3xl leading-tight font-bold tracking-tight text-mist text-balance sm:text-4xl lg:text-5xl">
              Ready to Build Something <span className="grad-text">Great?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-fog">
              Tell us about your idea — we'll reply {agencyConfig.responseTime} with
              honest advice and a clear plan.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact" className="btn-primary">
                Start Your Project <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href={`mailto:${agencyConfig.email}`}
                className="btn-ghost"
              >
                {agencyConfig.email}
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      {/* main footer */}
      <div className="shell grid gap-12 py-14 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-fog">
            Creating meaningful digital experiences for ambitious brands —
            websites, identities and products built with intent.
          </p>
          <p className="mt-5 font-mono text-[11px] tracking-[0.2em] text-fog/70 uppercase">
            {agencyConfig.tagline}
          </p>
          <div className="mt-6 flex gap-2.5">
            {agencyConfig.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${s.label} (placeholder link)`}
                title={`${s.label} — placeholder until real link is provided`}
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-mist/12 bg-mist/[0.04] text-fog transition-all duration-300 hover:-translate-y-1 hover:border-royal/60 hover:text-mist"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                  <path d={socialPaths[s.label]} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <p className="font-mono text-[11px] font-semibold tracking-[0.22em] text-mist uppercase">
            Navigate
          </p>
          <ul className="mt-5 space-y-3">
            {agencyConfig.navLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="group inline-flex items-center gap-1.5 text-sm text-fog transition-colors hover:text-mist"
                >
                  <span className="h-px w-0 bg-royal transition-all duration-300 group-hover:w-3" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer services">
          <p className="font-mono text-[11px] font-semibold tracking-[0.22em] text-mist uppercase">
            Services
          </p>
          <ul className="mt-5 space-y-3">
            {services.slice(0, 4).map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services"
                  state={{ scrollTo: s.slug }}
                  className="group inline-flex items-center gap-1.5 text-sm text-fog transition-colors hover:text-mist"
                >
                  <span className="h-px w-0 bg-flare transition-all duration-300 group-hover:w-3" />
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-mono text-[11px] font-semibold tracking-[0.22em] text-mist uppercase">
            Get in Touch
          </p>
          <ul className="mt-5 space-y-4 text-sm text-fog">
            <li>
              <a
                href={`mailto:${agencyConfig.email}`}
                className="flex items-center gap-3 transition-colors hover:text-mist"
              >
                <Mail className="h-4 w-4 text-royal" /> {agencyConfig.email}
              </a>
            </li>
            <li>
              <a
                href={agencyConfig.phoneHref}
                className="flex items-center gap-3 transition-colors hover:text-mist"
              >
                <Phone className="h-4 w-4 text-cobalt" /> {agencyConfig.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-flare" /> {agencyConfig.location}
            </li>
          </ul>
          <p className="mt-6 rounded-xl border border-mist/10 bg-ink-850/70 p-4 font-mono text-[11px] leading-relaxed text-fog">
            Avg. response time:{" "}
            <span className="text-mist">{agencyConfig.responseTime}</span>
          </p>
        </div>
      </div>

      <GradDivider />

      <div className="shell flex flex-col items-center justify-between gap-4 py-7 sm:flex-row">
        <p className="text-xs text-fog">
          © 2026 {agencyConfig.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-5 text-xs text-fog">
          <Link to="/admin" className="transition-colors hover:text-mist">
            Admin
          </Link>
          <span className="h-1 w-1 rounded-full bg-royal" aria-hidden="true" />
          <span className="font-mono tracking-wider uppercase">
            Made with intent by P.K Creative
          </span>
        </div>
      </div>
    </footer>
  );
}

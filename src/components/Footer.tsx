import { Link } from "react-router-dom";
import { Github, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone, ArrowUp } from "lucide-react";
import Logo from "./Logo";
import { agency, waLink } from "../config/agencyConfig";
import { navLinks, footerServices } from "../data/siteContent";
import { PrimaryLink } from "./ui";

const socialIcons: Record<string, typeof Linkedin> = {
  LinkedIn: Linkedin,
  Instagram: Instagram,
  GitHub: Github,
};

export default function Footer() {
  return (
    <footer className="relative border-t border-mist/8 bg-ink-900">
      {/* CTA band */}
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-mist/8 py-14 md:flex-row md:items-center lg:py-20">
          <div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-mist sm:text-4xl lg:text-5xl">
              Ready to Build
              <span className="text-royal"> Something Great?</span>
            </h2>
            <p className="mt-4 max-w-md text-fog">
              Tell us about your idea — we&rsquo;ll reply within one business day with honest advice and a clear plan.
            </p>
          </div>
          <PrimaryLink to="/contact" className="shrink-0">
            Start Your Project
          </PrimaryLink>
        </div>

        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-fog">
              Creating meaningful digital experiences for ambitious brands.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {agency.socials.map((s) => {
                const Icon = socialIcons[s.label];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    title={`${s.label} (placeholder link)`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-mist/12 text-fog transition-all duration-300 hover:-translate-y-1 hover:border-royal/50 hover:text-royal"
                  >
                    {Icon ? (
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <span className="font-display text-xs font-bold">Bé</span>
                    )}
                  </a>
                );
              })}
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-fog">Navigate</h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm font-semibold text-mist/75 transition-colors hover:text-royal">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer services">
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-fog">Services</h3>
            <ul className="mt-5 space-y-3">
              {footerServices.map((s) => (
                <li key={s}>
                  <Link to="/services" className="text-sm font-semibold text-mist/75 transition-colors hover:text-royal">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-fog">Get in touch</h3>
            <ul className="mt-5 space-y-3 text-sm text-mist/75">
              <li>
                <a href={`mailto:${agency.contact.email}`} className="flex items-center gap-2.5 transition-colors hover:text-royal">
                  <Mail className="h-4 w-4 text-royal" aria-hidden="true" /> {agency.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${agency.contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-2.5 transition-colors hover:text-royal">
                  <Phone className="h-4 w-4 text-cobalt" aria-hidden="true" /> {agency.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-flare" aria-hidden="true" /> {agency.contact.location}
              </li>
              <li>
                <a href={waLink} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 transition-colors hover:text-lime-wa">
                  <MessageCircle className="h-4 w-4 text-lime-wa" aria-hidden="true" /> WhatsApp — Chat With Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-mist/8 py-7 sm:flex-row">
          <p className="text-xs text-fog">© 2026 {agency.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/admin" className="font-mono text-[11px] uppercase tracking-widest text-fog/70 transition-colors hover:text-royal">
              Admin
            </Link>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-mist/12 text-fog transition-all duration-300 hover:-translate-y-1 hover:border-royal/50 hover:text-royal"
            >
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

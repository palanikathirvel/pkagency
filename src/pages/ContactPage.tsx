import { Link, useLocation } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  ArrowRight,
  FileSearch,
  CalendarCheck,
  SendHorizonal,
} from "lucide-react";
import ContactForm from "../components/ContactForm";
import { Eyebrow, Reveal } from "../components/ui";
import { agencyConfig, whatsappLink } from "../config/agencyConfig";
import { usePageMeta } from "../hooks/usePageMeta";

const nextSteps = [
  {
    icon: FileSearch,
    title: "We review your inquiry",
    text: `A real person reads every detail and replies ${agencyConfig.responseTime}.`,
  },
  {
    icon: CalendarCheck,
    title: "Discovery call",
    text: "A short call to understand your goals, scope and timeline — no pressure.",
  },
  {
    icon: SendHorizonal,
    title: "Proposal & plan",
    text: "You receive a fixed quote, timeline and clear next steps. Then we build.",
  },
];

export default function ContactPage() {
  usePageMeta(
    "Contact | P.K Creative Agency — Start Your Project",
    "Have a project in mind? Tell us about your idea and P.K Creative Agency will get back to you within 24 hours."
  );
  const location = useLocation();
  const prefillService = (location.state as { service?: string } | null)?.service;

  return (
    <main className="pt-[72px]">
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="bg-grid-dark absolute inset-0" aria-hidden="true" />
        <div className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-royal/13 blur-[120px]" aria-hidden="true" />
        <div className="pointer-events-none absolute top-40 -left-32 h-80 w-80 rounded-full bg-flare/10 blur-[120px]" aria-hidden="true" />

        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <Eyebrow>Start a project</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="font-display mt-5 text-4xl leading-[1.05] font-extrabold tracking-tight text-mist sm:text-5xl lg:text-6xl">
                Have a Project <span className="grad-text">in Mind?</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-fog">
                Tell us about your idea, and let's create something amazing
                together.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            {/* form */}
            <Reveal y={30}>
              <div className="rounded-3xl border border-mist/10 bg-ink-850/85 p-7 shadow-[0_30px_80px_-30px_rgba(6,7,13,0.9)] backdrop-blur sm:p-10">
                <div className="mb-8 flex items-center justify-between gap-4">
                  <h2 className="font-display text-xl font-bold text-mist">
                    Project Inquiry
                  </h2>
                  <span className="flex items-center gap-2 rounded-full border border-wa/25 bg-wa/10 px-3 py-1.5 font-mono text-[10px] font-medium tracking-wider text-wa uppercase">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-wa" />
                    Accepting new projects
                  </span>
                </div>
                <ContactForm prefillService={prefillService} />
              </div>
            </Reveal>

            {/* aside */}
            <div className="space-y-5">
              <Reveal delay={0.1}>
                <div className="card-line p-7">
                  <h3 className="font-mono text-[11px] font-semibold tracking-[0.22em] text-royal uppercase">
                    Prefer direct?
                  </h3>
                  <ul className="mt-5 space-y-4">
                    <li>
                      <a href={`mailto:${agencyConfig.email}`} className="group flex items-center gap-4">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-mist/12 bg-mist/[0.04] text-royal transition-colors group-hover:border-royal/50">
                          <Mail className="h-5 w-5" />
                        </span>
                        <span>
                          <span className="block text-xs text-fog">Email us</span>
                          <span className="text-sm font-bold text-mist transition-colors group-hover:text-royal">
                            {agencyConfig.email}
                          </span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href={agencyConfig.phoneHref} className="group flex items-center gap-4">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-mist/12 bg-mist/[0.04] text-cobalt transition-colors group-hover:border-cobalt/50">
                          <Phone className="h-5 w-5" />
                        </span>
                        <span>
                          <span className="block text-xs text-fog">Call us</span>
                          <span className="text-sm font-bold text-mist transition-colors group-hover:text-cobalt">
                            {agencyConfig.phone}
                          </span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href={whatsappLink()} target="_blank" rel="noreferrer" className="group flex items-center gap-4">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-wa/25 bg-wa/10 text-wa transition-transform group-hover:scale-105">
                          <MessageCircle className="h-5 w-5" />
                        </span>
                        <span>
                          <span className="block text-xs text-fog">WhatsApp</span>
                          <span className="text-sm font-bold text-mist transition-colors group-hover:text-wa">
                            Chat With Us — instant reply
                          </span>
                        </span>
                      </a>
                    </li>
                  </ul>
                  <div className="mt-6 space-y-3 border-t border-mist/10 pt-5 text-sm text-fog">
                    <p className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-flare" /> {agencyConfig.location}
                    </p>
                    <p className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-royal" /> Response {agencyConfig.responseTime}
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="card-line p-7">
                  <h3 className="font-mono text-[11px] font-semibold tracking-[0.22em] text-flare uppercase">
                    What happens next
                  </h3>
                  <ol className="mt-5 space-y-5">
                    {nextSteps.map((s, i) => {
                      const Icon = s.icon;
                      return (
                        <li key={s.title} className="flex gap-4">
                          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-royal/20 to-flare/20 text-royal ring-1 ring-royal/25">
                            <Icon className="h-4.5 w-4.5" />
                            <span className="absolute -top-1.5 -right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-ink-950 font-mono text-[9px] text-mist ring-1 ring-mist/20">
                              {i + 1}
                            </span>
                          </span>
                          <div>
                            <p className="text-sm font-bold text-mist">{s.title}</p>
                            <p className="mt-1 text-xs leading-relaxed text-fog">{s.text}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </Reveal>

              <Reveal delay={0.26}>
                <div className="relative overflow-hidden rounded-2xl border border-royal/25 bg-gradient-to-br from-royal/12 via-ink-850 to-flare/8 p-7">
                  <p className="font-display text-lg leading-snug font-bold text-mist">
                    Not ready for a form?
                  </p>
                  <p className="mt-2 text-sm text-fog">
                    Browse our packages and see what fits — you can always
                    adjust scope later.
                  </p>
                  <Link to="/" className="group mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-royal transition-colors hover:text-flare">
                    View packages
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

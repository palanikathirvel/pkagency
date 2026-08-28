import { Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import ContactForm from "../components/ContactForm";
import { Eyebrow, Reveal } from "../components/ui";
import { agency, waLink } from "../config/agencyConfig";
import { usePageMeta } from "../hooks/usePageMeta";

const nextSteps = [
  { num: "1", title: "We review your inquiry", body: "Every detail is read by a founder — not a bot — within one business day." },
  { num: "2", title: "A short discovery call", body: "30 minutes to understand your goals, scope and timeline. Free, always." },
  { num: "3", title: "You get a clear proposal", body: "Scope, plan and transparent pricing. No pressure and no surprises." },
];

export default function ContactPage() {
  usePageMeta(
    "Contact | P.K Creative Agency — Start Your Project",
    "Have a project in mind? Tell P.K Creative Agency about your idea and get a free consultation within one business day."
  );

  return (
    <main className="relative overflow-hidden pt-[130px] pb-24">
      <div className="absolute inset-0 bg-grid-dark [mask-image:radial-gradient(ellipse_70%_45%_at_50%_0%,black,transparent)]" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-24 right-1/4 h-[420px] w-[420px] rounded-full bg-royal/12 blur-[130px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <header className="max-w-3xl">
          <Reveal>
            <Eyebrow>Contact us</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-mist sm:text-5xl lg:text-6xl">
              Have a Project <span className="text-royal">in Mind?</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 text-base leading-relaxed text-fog md:text-lg">
              Tell us about your idea, and let&rsquo;s create something amazing together.
            </p>
          </Reveal>
        </header>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Info column */}
          <div className="space-y-5">
            <Reveal delay={0.1}>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <a
                  href={`mailto:${agency.contact.email}`}
                  className="group rounded-[18px] border border-mist/10 bg-ink-800/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-royal/40"
                >
                  <Mail className="h-5 w-5 text-royal" aria-hidden="true" />
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-fog">Email</p>
                  <p className="mt-1 text-sm font-bold text-mist break-all">{agency.contact.email}</p>
                </a>
                <a
                  href={`tel:${agency.contact.phone.replace(/\s/g, "")}`}
                  className="group rounded-[18px] border border-mist/10 bg-ink-800/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cobalt/40"
                >
                  <Phone className="h-5 w-5 text-cobalt" aria-hidden="true" />
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-fog">Phone</p>
                  <p className="mt-1 text-sm font-bold text-mist">{agency.contact.phone}</p>
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-[18px] border border-lime-wa/25 bg-lime-wa/8 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-lime-wa/12"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-lime-wa text-ink-950">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-mist">Prefer WhatsApp?</span>
                  <span className="block text-xs text-fog">Chat With Us — replies within minutes, 10am–7pm IST.</span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="flex items-start gap-3 rounded-[18px] border border-mist/10 bg-ink-800/60 p-5">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-flare" aria-hidden="true" />
                <p className="text-sm font-semibold text-mist/85">{agency.contact.location}</p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="rounded-[18px] border border-mist/10 bg-ink-800/60 p-6">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-fog">
                  <Clock3 className="h-4 w-4 text-royal" aria-hidden="true" /> What happens next
                </p>
                <ol className="mt-5 space-y-5">
                  {nextSteps.map((s) => (
                    <li key={s.num} className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-royal to-cobalt font-display text-xs font-extrabold text-ink-950">
                        {s.num}
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-mist">{s.title}</span>
                        <span className="mt-1 block text-xs leading-relaxed text-fog">{s.body}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.15} y={40}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </main>
  );
}

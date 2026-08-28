import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronDown, Loader2, Send } from "lucide-react";
import { budgetOptions, serviceOptions, timelineOptions } from "../data/siteContent";
import { submitInquiry, type InquiryInput } from "../services/inquiryService";

const emptyForm: InquiryInput = {
  name: "",
  email: "",
  phone: "",
  company: "",
  website: "",
  service: "",
  budget: "",
  timeline: "",
  description: "",
};

type Errors = Partial<Record<keyof InquiryInput, string>>;

function validate(v: InquiryInput): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please tell us your name.";
  if (!v.email.trim()) e.email = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) e.email = "That email doesn't look right.";
  if (!v.phone.trim()) e.phone = "Phone number is required.";
  else if (v.phone.replace(/\D/g, "").length < 7) e.phone = "Please enter a valid phone number.";
  if (!v.service) e.service = "Choose the service you need.";
  if (!v.budget) e.budget = "Select an estimated budget.";
  if (!v.timeline) e.timeline = "Select a timeline.";
  if (v.description.trim().length < 10) e.description = "Tell us a little more (at least 10 characters).";
  return e;
}

const inputCls = (err?: string) =>
  `w-full rounded-xl border bg-ink-900/80 px-4 py-3.5 text-sm font-medium text-mist placeholder:text-fog/45 outline-none transition-all duration-300 focus:ring-2 ${
    err
      ? "border-flare/60 focus:border-flare focus:ring-flare/15"
      : "border-mist/12 focus:border-royal/60 focus:ring-royal/15"
  }`;

function Field({
  label,
  required,
  error,
  children,
  className = "",
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 flex items-baseline gap-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-fog">
        {label}
        {required ? <span className="text-flare">*</span> : <span className="normal-case tracking-normal text-fog/60">(optional)</span>}
      </span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 block text-xs font-semibold text-flare"
            role="alert"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}

function SelectWrap({ children }: { children: ReactNode }) {
  return (
    <span className="relative block">
      {children}
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fog" aria-hidden="true" />
    </span>
  );
}

export default function ContactForm() {
  const [values, setValues] = useState<InquiryInput>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const set = (key: keyof InquiryInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setStatus("submitting");
    try {
      await submitInquiry({ ...values, name: values.name.trim(), email: values.email.trim() });
      setStatus("success");
    } catch {
      setStatus("idle");
      setErrors({ description: "Something went wrong sending your inquiry. Please try again or reach us on WhatsApp." });
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-[22px] border border-lime-wa/25 bg-ink-800/70 p-10 text-center md:p-14"
      >
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime-wa/15 text-lime-wa">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </span>
        <h3 className="mt-6 font-display text-2xl font-bold text-mist md:text-3xl">Thank you!</h3>
        <p className="mx-auto mt-3 max-w-md text-fog">
          We&rsquo;ve received your project inquiry. Our team will get back to you soon — usually within one business day.
        </p>
        <p className="mx-auto mt-5 max-w-md font-mono text-[11px] leading-relaxed text-fog/70">
          A confirmation email will be sent automatically once email delivery is connected to your backend.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(emptyForm);
            setStatus("idle");
          }}
          className="mt-8 rounded-full border border-mist/15 px-6 py-3 text-sm font-bold text-mist transition-all duration-300 hover:border-royal/50 hover:text-royal"
        >
          Send another inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-[22px] border border-mist/10 bg-ink-800/60 p-7 md:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" required error={errors.name}>
          <input type="text" value={values.name} onChange={set("name")} placeholder="Priya Sharma" aria-invalid={!!errors.name} className={inputCls(errors.name)} />
        </Field>
        <Field label="Email Address" required error={errors.email}>
          <input type="email" value={values.email} onChange={set("email")} placeholder="you@company.com" aria-invalid={!!errors.email} className={inputCls(errors.email)} />
        </Field>
        <Field label="Phone Number" required error={errors.phone}>
          <input type="tel" value={values.phone} onChange={set("phone")} placeholder="+91 98XXX XXXXX" aria-invalid={!!errors.phone} className={inputCls(errors.phone)} />
        </Field>
        <Field label="Company Name" error={undefined}>
          <input type="text" value={values.company} onChange={set("company")} placeholder="Your company" className={inputCls()} />
        </Field>
        <Field label="Website" error={undefined}>
          <input type="url" value={values.website} onChange={set("website")} placeholder="https://yourbusiness.com" className={inputCls()} />
        </Field>
        <Field label="Service Interested In" required error={errors.service}>
          <SelectWrap>
            <select value={values.service} onChange={set("service")} aria-invalid={!!errors.service} className={`${inputCls(errors.service)} appearance-none pr-10 ${values.service ? "" : "text-fog/45"}`}>
              <option value="" disabled>
                Select a service
              </option>
              {serviceOptions.map((s) => (
                <option key={s} value={s} className="bg-ink-900 text-mist">
                  {s}
                </option>
              ))}
            </select>
          </SelectWrap>
        </Field>
        <Field label="Estimated Budget" required error={errors.budget}>
          <SelectWrap>
            <select value={values.budget} onChange={set("budget")} aria-invalid={!!errors.budget} className={`${inputCls(errors.budget)} appearance-none pr-10 ${values.budget ? "" : "text-fog/45"}`}>
              <option value="" disabled>
                Select a range
              </option>
              {budgetOptions.map((b) => (
                <option key={b} value={b} className="bg-ink-900 text-mist">
                  {b}
                </option>
              ))}
            </select>
          </SelectWrap>
        </Field>
        <Field label="Project Timeline" required error={errors.timeline}>
          <SelectWrap>
            <select value={values.timeline} onChange={set("timeline")} aria-invalid={!!errors.timeline} className={`${inputCls(errors.timeline)} appearance-none pr-10 ${values.timeline ? "" : "text-fog/45"}`}>
              <option value="" disabled>
                When do you want to start?
              </option>
              {timelineOptions.map((t) => (
                <option key={t} value={t} className="bg-ink-900 text-mist">
                  {t}
                </option>
              ))}
            </select>
          </SelectWrap>
        </Field>
        <Field label="Project Description" required error={errors.description} className="sm:col-span-2">
          <textarea
            rows={5}
            value={values.description}
            onChange={set("description")}
            placeholder="Tell us about your project — goals, audience, references, anything that helps us understand your vision…"
            aria-invalid={!!errors.description}
            className={`${inputCls(errors.description)} resize-none`}
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group mt-8 flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-royal to-cobalt px-8 py-4 text-sm font-bold text-ink-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_-8px_rgba(139,124,255,0.6)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4.5 w-4.5 animate-spin" aria-hidden="true" /> Sending your inquiry…
          </>
        ) : (
          <>
            Send Project Inquiry
            <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" aria-hidden="true" />
          </>
        )}
      </button>
      <p className="mt-4 text-center text-xs text-fog/70">
        No spam, no obligation — just an honest conversation about your project.
      </p>
    </form>
  );
}

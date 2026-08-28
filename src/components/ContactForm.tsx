import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import { agencyConfig } from "../config/agencyConfig";
import {
  submitInquiry,
  type InquiryPayload,
} from "../services/inquiryService";

const emptyForm: InquiryPayload = {
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

type Errors = Partial<Record<keyof InquiryPayload, string>>;

function validate(form: InquiryPayload): Errors {
  const errors: Errors = {};
  if (!form.name.trim()) errors.name = "Please enter your full name.";
  if (!form.email.trim()) errors.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (!form.phone.trim()) errors.phone = "Please enter your phone number.";
  else if (!/^[+\d][\d\s\-()]{7,}$/.test(form.phone.trim()))
    errors.phone = "Please enter a valid phone number.";
  if (form.website.trim() && !/^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#].*)?$/i.test(form.website.trim()))
    errors.website = "Please enter a valid URL (or leave blank).";
  if (!form.service) errors.service = "Please select a service.";
  if (!form.budget) errors.budget = "Please select a budget range.";
  if (!form.timeline) errors.timeline = "Please select a timeline.";
  if (!form.description.trim())
    errors.description = "Please tell us a little about your project.";
  else if (form.description.trim().length < 20)
    errors.description = "A few more details help us respond better (20+ characters).";
  return errors;
}

function Field({
  label,
  required,
  error,
  children,
  hint,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="label">
        {label} {required ? <span className="text-flare">*</span> : <span className="text-fog/50">(optional)</span>}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-flare" role="alert">
          <AlertCircle className="h-3.5 w-3.5" /> {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-[11px] text-fog/60">{hint}</p>
      ) : null}
    </div>
  );
}

export default function ContactForm({ prefillService }: { prefillService?: string }) {
  const [form, setForm] = useState<InquiryPayload>({
    ...emptyForm,
    service: prefillService ?? "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const reduced = useReducedMotion();

  const set =
    (key: keyof InquiryPayload) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setErrors((er) => ({ ...er, [key]: undefined }));
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      // focus first invalid field
      const firstKey = Object.keys(nextErrors)[0];
      document
        .getElementById(`field-${firstKey}`)
        ?.focus();
      return;
    }
    setStatus("submitting");
    try {
      await submitInquiry(form);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center rounded-3xl border border-wa/25 bg-ink-850 px-8 py-14 text-center"
        role="status"
      >
        <span className="relative flex h-20 w-20 items-center justify-center">
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-wa/30 motion-reduce:hidden" />
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-wa/15 text-wa">
            <CheckCircle2 className="h-10 w-10" />
          </span>
        </span>
        <h3 className="font-display mt-6 text-2xl font-bold text-mist sm:text-3xl">
          Inquiry Received!
        </h3>
        <p className="mt-3 max-w-md leading-relaxed text-fog">
          Thank you! We've received your project inquiry. Our team will get
          back to you {agencyConfig.responseTime}.
        </p>
        <p className="mt-2 font-mono text-[11px] tracking-[0.18em] text-fog/60 uppercase">
          A confirmation email has been sent to {form.email}
        </p>
        <button
          type="button"
          className="btn-ghost mt-8"
          onClick={() => {
            setForm(emptyForm);
            setStatus("idle");
          }}
        >
          <RotateCcw className="h-4 w-4" /> Send another inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {status === "error" && (
        <div className="flex items-center gap-3 rounded-xl border border-flare/30 bg-flare/10 px-4 py-3 text-sm text-flare" role="alert">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Something went wrong sending your inquiry. Please try again or reach us on WhatsApp.
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" required error={errors.name}>
          <input
            id="field-name"
            type="text"
            autoComplete="name"
            placeholder="Priya Sharma"
            className={`input ${errors.name ? "input-error" : ""}`}
            value={form.name}
            onChange={set("name")}
          />
        </Field>
        <Field label="Email Address" required error={errors.email}>
          <input
            id="field-email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            className={`input ${errors.email ? "input-error" : ""}`}
            value={form.email}
            onChange={set("email")}
          />
        </Field>
        <Field label="Phone Number" required error={errors.phone}>
          <input
            id="field-phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            className={`input ${errors.phone ? "input-error" : ""}`}
            value={form.phone}
            onChange={set("phone")}
          />
        </Field>
        <Field label="Company Name" error={errors.company}>
          <input
            id="field-company"
            type="text"
            autoComplete="organization"
            placeholder="Your business or brand"
            className="input"
            value={form.company}
            onChange={set("company")}
          />
        </Field>
      </div>

      <Field label="Website" error={errors.website} hint="Current website or social profile, if any.">
        <input
          id="field-website"
          type="url"
          autoComplete="url"
          placeholder="https://yourwebsite.com"
          className={`input ${errors.website ? "input-error" : ""}`}
          value={form.website}
          onChange={set("website")}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Service Interested In" required error={errors.service}>
          <select
            id="field-service"
            className={`input appearance-none ${errors.service ? "input-error" : ""} ${form.service ? "text-mist" : "text-fog/50"}`}
            value={form.service}
            onChange={set("service")}
          >
            <option value="" disabled>
              Select a service
            </option>
            {agencyConfig.serviceOptions.map((s) => (
              <option key={s} value={s} className="bg-ink-800 text-mist">
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Estimated Budget" required error={errors.budget}>
          <select
            id="field-budget"
            className={`input appearance-none ${errors.budget ? "input-error" : ""} ${form.budget ? "text-mist" : "text-fog/50"}`}
            value={form.budget}
            onChange={set("budget")}
          >
            <option value="" disabled>
              Select a range
            </option>
            {agencyConfig.budgetOptions.map((b) => (
              <option key={b} value={b} className="bg-ink-800 text-mist">
                {b}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Project Timeline" required error={errors.timeline}>
          <select
            id="field-timeline"
            className={`input appearance-none ${errors.timeline ? "input-error" : ""} ${form.timeline ? "text-mist" : "text-fog/50"}`}
            value={form.timeline}
            onChange={set("timeline")}
          >
            <option value="" disabled>
              Select timeline
            </option>
            {agencyConfig.timelineOptions.map((t) => (
              <option key={t} value={t} className="bg-ink-800 text-mist">
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="Project Description"
        required
        error={errors.description}
        hint="Goals, scope, references — anything that helps us understand your vision."
      >
        <textarea
          id="field-description"
          rows={5}
          placeholder="Tell us about your project, goals, and anything else we should know…"
          className={`input resize-y ${errors.description ? "input-error" : ""}`}
          value={form.description}
          onChange={set("description")}
        />
      </Field>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn-primary" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" />
              Sending your inquiry…
            </>
          ) : (
            <>
              Send Project Inquiry <Send className="h-4 w-4" />
            </>
          )}
        </button>
        <p className="text-xs leading-relaxed text-fog/70">
          We reply {agencyConfig.responseTime}.
          <br className="hidden sm:block" /> No spam, no obligations — ever.
        </p>
      </div>
    </form>
  );
}

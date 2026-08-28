import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Lock,
  Search,
  Eye,
  Trash2,
  X,
  Inbox,
  Users,
  PhoneCall,
  CheckCircle2,
  Loader2,
  FlaskConical,
  LogOut,
  ShieldAlert,
} from "lucide-react";
import { agencyConfig } from "../config/agencyConfig";
import {
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
  seedDemoInquiries,
  INQUIRY_STATUSES,
  type Inquiry,
  type InquiryStatus,
} from "../services/inquiryService";
import { usePageMeta } from "../hooks/usePageMeta";
import { Eyebrow } from "../components/ui";

const AUTH_KEY = "pk_admin_authed";

const statusStyles: Record<InquiryStatus, string> = {
  NEW: "bg-cobalt/15 text-cobalt border-cobalt/30",
  CONTACTED: "bg-royal/15 text-royal border-royal/30",
  IN_DISCUSSION: "bg-amber-300/15 text-amber-200 border-amber-300/30",
  CONVERTED: "bg-wa/15 text-wa border-wa/30",
  CLOSED: "bg-mist/10 text-fog border-mist/20",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminPage() {
  usePageMeta(
    "Admin Dashboard | P.K Creative Agency",
    "Protected admin dashboard for managing client inquiries at P.K Creative Agency."
  );
  const reduced = useReducedMotion();
  const [authed, setAuthed] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState(false);

  const [items, setItems] = useState<Inquiry[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | InquiryStatus>("ALL");
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const list = await getInquiries();
    setItems(list);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authed) void load();
  }, [authed, load]);

  const tryLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === agencyConfig.adminPasscode) {
      try {
        sessionStorage.setItem(AUTH_KEY, "1");
      } catch {
        /* noop */
      }
      setAuthed(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const logout = () => {
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch {
      /* noop */
    }
    setAuthed(false);
    setItems(null);
    setPasscode("");
  };

  const changeStatus = async (id: string, status: InquiryStatus) => {
    setItems((prev) => prev?.map((i) => (i.id === id ? { ...i, status } : i)) ?? prev);
    const list = await updateInquiryStatus(id, status);
    setItems(list);
    setSelected((s) => (s && s.id === id ? { ...s, status } : s));
  };

  const remove = async (id: string) => {
    const list = await deleteInquiry(id);
    setItems(list);
    setConfirmDelete(null);
    setSelected((s) => (s?.id === id ? null : s));
  };

  const filtered = useMemo(() => {
    if (!items) return [];
    const q = query.trim().toLowerCase();
    return items.filter((i) => {
      const matchesQ =
        !q ||
        [i.name, i.company, i.email, i.service].some((v) =>
          v.toLowerCase().includes(q)
        );
      const matchesS = statusFilter === "ALL" || i.status === statusFilter;
      return matchesQ && matchesS;
    });
  }, [items, query, statusFilter]);

  const stats = useMemo(() => {
    const list = items ?? [];
    return {
      total: list.length,
      fresh: list.filter((i) => i.status === "NEW").length,
      contacted: list.filter((i) =>
        ["CONTACTED", "IN_DISCUSSION"].includes(i.status)
      ).length,
      converted: list.filter((i) => i.status === "CONVERTED").length,
    };
  }, [items]);

  /* ---------------- gate ---------------- */
  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center pt-[72px]">
        <div className="bg-grid-dark absolute inset-0" aria-hidden="true" />
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-md px-5"
        >
          <div className="rounded-3xl border border-mist/12 bg-ink-850/90 p-8 text-center shadow-2xl backdrop-blur sm:p-10">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-royal to-flare text-ink-950">
              <Lock className="h-7 w-7" />
            </span>
            <h1 className="font-display mt-6 text-2xl font-bold text-mist">
              Admin Access
            </h1>
            <p className="mt-2 text-sm text-fog">
              This area is protected for the agency owner.
            </p>
            <form onSubmit={tryLogin} className="mt-7 space-y-4 text-left">
              <div>
                <label className="label" htmlFor="passcode">
                  Passcode
                </label>
                <input
                  id="passcode"
                  type="password"
                  className={`input ${authError ? "input-error" : ""}`}
                  placeholder="Enter admin passcode"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setAuthError(false);
                  }}
                />
                {authError && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-flare" role="alert">
                    <ShieldAlert className="h-3.5 w-3.5" /> Incorrect passcode. Try again.
                  </p>
                )}
              </div>
              <button type="submit" className="btn-primary w-full">
                Unlock Dashboard
              </button>
            </form>
            <p className="mt-5 font-mono text-[10px] leading-relaxed tracking-wider text-fog/60 uppercase">
              Placeholder passcode: {agencyConfig.adminPasscode}
              <br />
              Move authentication server-side for production.
            </p>
            <Link to="/" className="mt-4 inline-block text-xs text-fog transition-colors hover:text-mist">
              ← Back to website
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  /* ---------------- dashboard ---------------- */
  const statCards = [
    { label: "Total Inquiries", value: stats.total, icon: Inbox, tint: "text-royal", ring: "border-royal/30 bg-royal/10" },
    { label: "New Inquiries", value: stats.fresh, icon: Users, tint: "text-cobalt", ring: "border-cobalt/30 bg-cobalt/10" },
    { label: "Contacted", value: stats.contacted, icon: PhoneCall, tint: "text-amber-200", ring: "border-amber-300/30 bg-amber-300/10" },
    { label: "Converted", value: stats.converted, icon: CheckCircle2, tint: "text-wa", ring: "border-wa/30 bg-wa/10" },
  ];

  return (
    <main className="min-h-screen pt-[100px] pb-20">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <Eyebrow>Admin</Eyebrow>
            <h1 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-mist sm:text-4xl">
              Inquiry Dashboard
            </h1>
            <p className="mt-2 text-sm text-fog">
              Every lead from the contact form lands here — follow up fast.
            </p>
          </div>
          <div className="flex gap-3">
            {items && items.length === 0 && (
              <button
                type="button"
                onClick={async () => {
                  setLoading(true);
                  const list = await seedDemoInquiries();
                  setItems(list);
                  setLoading(false);
                }}
                className="btn-ghost btn-sm"
              >
                <FlaskConical className="h-4 w-4" /> Load demo inquiries
              </button>
            )}
            <button type="button" onClick={logout} className="btn-ghost btn-sm">
              <LogOut className="h-4 w-4" /> Log out
            </button>
          </div>
        </div>

        {/* stat cards */}
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {statCards.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={reduced ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
                className="card-line flex items-center gap-4 p-5"
              >
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${s.ring} ${s.tint}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-2xl leading-none font-extrabold text-mist">
                    {loading ? "–" : s.value}
                  </p>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.16em] text-fog uppercase">
                    {s.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* toolbar */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-fog" />
            <input
              type="search"
              className="input pl-11"
              placeholder="Search by name, company, email or service…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search inquiries"
            />
          </div>
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {(["ALL", ...INQUIRY_STATUSES] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(s)}
                className={`rounded-full px-4 py-2 font-mono text-[11px] font-medium tracking-wider whitespace-nowrap transition-all ${
                  statusFilter === s
                    ? "bg-mist text-ink-950"
                    : "border border-mist/15 text-fog hover:border-royal/50 hover:text-mist"
                }`}
              >
                {s.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* table */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-mist/10 bg-ink-850/80">
          {loading ? (
            <div className="flex items-center justify-center gap-3 py-24 text-fog">
              <Loader2 className="h-5 w-5 animate-spin motion-reduce:animate-none" />
              Loading inquiries…
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
              <Inbox className="h-10 w-10 text-mist/20" />
              <p className="font-display mt-4 text-lg font-bold text-mist">
                {items && items.length === 0 ? "No inquiries yet" : "No matches found"}
              </p>
              <p className="mt-2 max-w-sm text-sm text-fog">
                {items && items.length === 0
                  ? "When a visitor submits the contact form, the inquiry appears here instantly. You can also load clearly-labeled demo data to explore."
                  : "Try a different search term or status filter."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-left text-sm">
                <thead>
                  <tr className="border-b border-mist/10 font-mono text-[10px] tracking-[0.18em] text-fog uppercase">
                    <th className="px-5 py-4 font-medium">Name</th>
                    <th className="px-5 py-4 font-medium">Company</th>
                    <th className="px-5 py-4 font-medium">Service</th>
                    <th className="px-5 py-4 font-medium">Budget</th>
                    <th className="px-5 py-4 font-medium">Date</th>
                    <th className="px-5 py-4 font-medium">Status</th>
                    <th className="px-5 py-4 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-mist/6">
                  {filtered.map((i) => (
                    <tr key={i.id} className="group transition-colors hover:bg-mist/[0.03]">
                      <td className="px-5 py-4">
                        <p className="font-bold text-mist">{i.name}</p>
                        <p className="text-xs text-fog">{i.email}</p>
                      </td>
                      <td className="px-5 py-4 text-mist/80">{i.company || "—"}</td>
                      <td className="px-5 py-4 text-mist/80">{i.service}</td>
                      <td className="px-5 py-4 whitespace-nowrap text-mist/80">{i.budget}</td>
                      <td className="px-5 py-4 whitespace-nowrap text-fog">{formatDate(i.createdAt)}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex rounded-full border px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wider ${statusStyles[i.status]}`}>
                          {i.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setSelected(i)}
                            aria-label={`View inquiry from ${i.name}`}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-mist/12 text-fog transition-colors hover:border-royal/50 hover:text-royal"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {confirmDelete === i.id ? (
                            <span className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => void remove(i.id)}
                                className="rounded-lg bg-flare/20 px-2.5 py-1.5 text-[11px] font-bold text-flare transition-colors hover:bg-flare/30"
                              >
                                Confirm
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmDelete(null)}
                                className="rounded-lg px-2 py-1.5 text-[11px] font-bold text-fog hover:text-mist"
                              >
                                Cancel
                              </button>
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setConfirmDelete(i.id)}
                              aria-label={`Delete inquiry from ${i.name}`}
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-mist/12 text-fog transition-colors hover:border-flare/50 hover:text-flare"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="mt-4 font-mono text-[10px] tracking-[0.16em] text-fog/50 uppercase">
          Data currently stored locally — connect the Spring Boot API in src/services/inquiryService.ts for production
        </p>
      </div>

      {/* detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="detail"
            className="fixed inset-0 z-[70] flex items-end justify-center bg-ink-950/80 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Inquiry from ${selected.name}`}
          >
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-mist/12 bg-ink-900 p-7 sm:rounded-3xl sm:p-9"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-fog uppercase">
                    {formatDate(selected.createdAt)} · {selected.id}
                  </p>
                  <h2 className="font-display mt-2 text-2xl font-bold text-mist">
                    {selected.name}
                  </h2>
                  <p className="mt-1 text-sm text-fog">
                    {selected.company || "Independent"} · {selected.service}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Close inquiry details"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-mist/15 text-fog transition-colors hover:border-flare/60 hover:text-flare"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  ["Email", selected.email],
                  ["Phone", selected.phone],
                  ["Website", selected.website || "—"],
                  ["Budget", selected.budget],
                  ["Timeline", selected.timeline],
                  ["Service", selected.service],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl border border-mist/10 bg-ink-850 px-4 py-3">
                    <p className="font-mono text-[10px] tracking-[0.18em] text-fog uppercase">{k}</p>
                    <p className="mt-1 text-sm font-semibold break-words text-mist">{v}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-mist/10 bg-ink-850 px-4 py-4">
                <p className="font-mono text-[10px] tracking-[0.18em] text-fog uppercase">
                  Project description
                </p>
                <p className="mt-2 text-sm leading-relaxed whitespace-pre-wrap text-mist/90">
                  {selected.description}
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <label className="label" htmlFor="status-select">
                    Update status
                  </label>
                  <select
                    id="status-select"
                    className="input w-auto appearance-none py-2.5"
                    value={selected.status}
                    onChange={(e) =>
                      void changeStatus(selected.id, e.target.value as InquiryStatus)
                    }
                  >
                    {INQUIRY_STATUSES.map((s) => (
                      <option key={s} value={s} className="bg-ink-800 text-mist">
                        {s.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-3 sm:pb-1">
                  <a href={`mailto:${selected.email}`} className="btn-ghost btn-sm">
                    Reply by email
                  </a>
                  <a
                    href={`tel:${selected.phone.replace(/[^\d+]/g, "")}`}
                    className="btn-primary btn-sm"
                  >
                    Call client
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

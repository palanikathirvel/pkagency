import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck,
  Eye,
  Inbox,
  Loader2,
  LockKeyhole,
  LogOut,
  RefreshCw,
  Search,
  Trash2,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import {
  INQUIRY_STATUSES,
  deleteInquiry,
  fetchInquiries,
  updateInquiryStatus,
  type Inquiry,
  type InquiryStatus,
} from "../services/inquiryService";
import { agency } from "../config/agencyConfig";
import { usePageMeta } from "../hooks/usePageMeta";

const statusTint: Record<InquiryStatus, string> = {
  NEW: "border-royal/35 bg-royal/12 text-royal",
  CONTACTED: "border-cobalt/35 bg-cobalt/12 text-cobalt",
  IN_DISCUSSION: "border-flare/35 bg-flare/12 text-flare",
  CONVERTED: "border-lime-wa/35 bg-lime-wa/12 text-lime-wa",
  CLOSED: "border-mist/15 bg-mist/8 text-fog",
};

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

export default function AdminPage() {
  usePageMeta("Admin Dashboard | P.K Creative Agency");
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("pk_admin_auth") === "1");
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState(false);

  const [inquiries, setInquiries] = useState<Inquiry[] | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | InquiryStatus>("ALL");
  const [viewing, setViewing] = useState<Inquiry | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setBusy(true);
    setInquiries(await fetchInquiries());
    setBusy(false);
  }, []);

  useEffect(() => {
    if (authed) load();
  }, [authed, load]);

  const tryLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === agency.adminPassphrase) {
      sessionStorage.setItem("pk_admin_auth", "1");
      setAuthed(true);
      setPassError(false);
    } else {
      setPassError(true);
    }
  };

  const filtered = useMemo(() => {
    if (!inquiries) return [];
    const q = search.trim().toLowerCase();
    return inquiries.filter((i) => {
      const matchesQ =
        !q || [i.name, i.email, i.company, i.service].some((v) => v.toLowerCase().includes(q));
      const matchesS = statusFilter === "ALL" || i.status === statusFilter;
      return matchesQ && matchesS;
    });
  }, [inquiries, search, statusFilter]);

  const stats = useMemo(() => {
    const list = inquiries ?? [];
    return {
      total: list.length,
      fresh: list.filter((i) => i.status === "NEW").length,
      contacted: list.filter((i) => i.status === "CONTACTED" || i.status === "IN_DISCUSSION").length,
      converted: list.filter((i) => i.status === "CONVERTED").length,
    };
  }, [inquiries]);

  const changeStatus = async (id: string, status: InquiryStatus) => {
    const updated = await updateInquiryStatus(id, status);
    setInquiries((list) => list?.map((i) => (i.id === id ? updated : i)) ?? list);
    setViewing((v) => (v && v.id === id ? updated : v));
  };

  const remove = async (id: string) => {
    await deleteInquiry(id);
    setInquiries((list) => list?.filter((i) => i.id !== id) ?? list);
    setConfirmDelete(null);
    setViewing((v) => (v?.id === id ? null : v));
  };

  /* ── Login gate ── */
  if (!authed) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pt-24">
        <div className="absolute inset-0 bg-grid-dark [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,black,transparent)]" aria-hidden="true" />
        <motion.form
          key={passError ? "err" : "ok"}
          onSubmit={tryLogin}
          initial={{ opacity: 0, y: 24, x: 0 }}
          animate={{ opacity: 1, y: 0, x: passError ? [0, -10, 10, -6, 6, 0] : 0 }}
          transition={{ duration: 0.45 }}
          className="relative w-full max-w-sm rounded-[22px] border border-mist/10 bg-ink-800/80 p-8"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-royal/12 text-royal">
            <LockKeyhole className="h-5 w-5" aria-hidden="true" />
          </span>
          <h1 className="mt-5 font-display text-2xl font-bold text-mist">Admin Access</h1>
          <p className="mt-2 text-sm text-fog">Enter the agency passphrase to manage client inquiries.</p>
          <input
            type="password"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
              setPassError(false);
            }}
            placeholder="Passphrase"
            aria-label="Admin passphrase"
            className={`mt-6 w-full rounded-xl border bg-ink-900/80 px-4 py-3.5 text-sm text-mist outline-none transition-all focus:ring-2 ${
              passError ? "border-flare/60 focus:ring-flare/15" : "border-mist/12 focus:border-royal/60 focus:ring-royal/15"
            }`}
          />
          {passError && (
            <p className="mt-2 text-xs font-semibold text-flare" role="alert">
              Incorrect passphrase. Try again.
            </p>
          )}
          <button
            type="submit"
            className="mt-5 w-full rounded-full bg-gradient-to-r from-royal to-cobalt px-6 py-3.5 text-sm font-bold text-ink-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_-8px_rgba(139,124,255,0.6)]"
          >
            Unlock Dashboard
          </button>
          <p className="mt-4 text-center font-mono text-[10px] text-fog/60">
            Demo passphrase: <span className="text-fog">{agency.adminPassphrase}</span> — change in agencyConfig.ts
          </p>
        </motion.form>
      </main>
    );
  }

  /* ── Dashboard ── */
  return (
    <main className="relative min-h-screen overflow-hidden px-5 pb-24 pt-[120px] lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-fog">Agency admin</p>
            <h1 className="mt-2 font-display text-3xl font-extrabold text-mist md:text-4xl">Inquiry Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={load}
              className="flex items-center gap-2 rounded-full border border-mist/12 px-5 py-2.5 text-sm font-bold text-fog transition-colors hover:border-royal/50 hover:text-royal"
            >
              <RefreshCw className={`h-4 w-4 ${busy ? "animate-spin" : ""}`} aria-hidden="true" /> Refresh
            </button>
            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem("pk_admin_auth");
                setAuthed(false);
              }}
              className="flex items-center gap-2 rounded-full border border-mist/12 px-5 py-2.5 text-sm font-bold text-fog transition-colors hover:border-flare/50 hover:text-flare"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" /> Log out
            </button>
          </div>
        </div>

        {/* Stat tiles */}
        <div className="mt-9 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: "Total Inquiries", value: stats.total, icon: Users, tint: "text-royal bg-royal/12" },
            { label: "New Inquiries", value: stats.fresh, icon: Inbox, tint: "text-cobalt bg-cobalt/12" },
            { label: "In Conversation", value: stats.contacted, icon: UserCheck, tint: "text-flare bg-flare/12" },
            { label: "Converted Clients", value: stats.converted, icon: BadgeCheck, tint: "text-lime-wa bg-lime-wa/12" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="rounded-[18px] border border-mist/10 bg-ink-800/60 p-5 transition-transform duration-300 hover:-translate-y-1">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.tint}`}>
                  <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <p className="mt-4 font-display text-3xl font-extrabold text-mist">{inquiries ? s.value : "—"}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fog">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <span className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fog" aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, company or service…"
              aria-label="Search inquiries"
              className="w-full rounded-full border border-mist/12 bg-ink-900/70 py-3 pl-11 pr-5 text-sm text-mist outline-none transition-all placeholder:text-fog/50 focus:border-royal/60 focus:ring-2 focus:ring-royal/15"
            />
          </span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "ALL" | InquiryStatus)}
            aria-label="Filter by status"
            className="rounded-full border border-mist/12 bg-ink-900/70 px-5 py-3 text-sm font-bold text-mist outline-none focus:border-royal/60"
          >
            <option value="ALL" className="bg-ink-900">All statuses</option>
            {INQUIRY_STATUSES.map((s) => (
              <option key={s} value={s} className="bg-ink-900">{s.replace("_", " ")}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-hidden rounded-[20px] border border-mist/10 bg-ink-800/50">
          {!inquiries ? (
            <div className="flex items-center justify-center gap-3 py-20 text-fog">
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Loading inquiries…
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
              <Inbox className="h-8 w-8 text-fog/50" aria-hidden="true" />
              <p className="text-sm font-semibold text-fog">No inquiries match your filters.</p>
              <p className="text-xs text-fog/70">New submissions from the contact form appear here instantly.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] text-left text-sm">
                <thead>
                  <tr className="border-b border-mist/10 font-mono text-[10px] uppercase tracking-[0.18em] text-fog">
                    <th className="px-5 py-4 font-medium">Name</th>
                    <th className="px-5 py-4 font-medium">Company</th>
                    <th className="px-5 py-4 font-medium">Service</th>
                    <th className="px-5 py-4 font-medium">Budget</th>
                    <th className="px-5 py-4 font-medium">Date</th>
                    <th className="px-5 py-4 font-medium">Status</th>
                    <th className="px-5 py-4 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((i) => (
                    <tr key={i.id} className="border-b border-mist/6 transition-colors last:border-b-0 hover:bg-mist/[0.03]">
                      <td className="px-5 py-4">
                        <p className="font-bold text-mist">{i.name}</p>
                        <p className="text-xs text-fog">{i.email}</p>
                      </td>
                      <td className="px-5 py-4 text-fog">{i.company || "—"}</td>
                      <td className="px-5 py-4 text-mist/85">{i.service}</td>
                      <td className="px-5 py-4 text-fog">{i.budget}</td>
                      <td className="px-5 py-4 font-mono text-xs text-fog">{fmtDate(i.createdAt)}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex rounded-full border px-3 py-1 font-mono text-[10px] font-semibold tracking-wide ${statusTint[i.status]}`}>
                          {i.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {confirmDelete === i.id ? (
                            <>
                              <button
                                type="button"
                                onClick={() => remove(i.id)}
                                className="rounded-full bg-flare/15 px-3 py-1.5 text-xs font-bold text-flare transition-colors hover:bg-flare/25"
                              >
                                Confirm
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmDelete(null)}
                                aria-label="Cancel delete"
                                className="rounded-full border border-mist/12 p-1.5 text-fog hover:text-mist"
                              >
                                <X className="h-3.5 w-3.5" aria-hidden="true" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() => setViewing(i)}
                                aria-label={`View inquiry from ${i.name}`}
                                className="rounded-full border border-mist/12 p-2 text-fog transition-colors hover:border-royal/50 hover:text-royal"
                              >
                                <Eye className="h-4 w-4" aria-hidden="true" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmDelete(i.id)}
                                aria-label={`Delete inquiry from ${i.name}`}
                                className="rounded-full border border-mist/12 p-2 text-fog transition-colors hover:border-flare/50 hover:text-flare"
                              >
                                <Trash2 className="h-4 w-4" aria-hidden="true" />
                              </button>
                            </>
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

        <p className="mt-5 font-mono text-[10px] text-fog/60">
          Demo storage: inquiries persist in this browser. Connect the Spring Boot API in src/services/inquiryService.ts for production.
        </p>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {viewing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink-950/80 p-5 backdrop-blur-sm"
            onClick={() => setViewing(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Inquiry from ${viewing.name}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-[22px] border border-mist/12 bg-ink-800 p-7 md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">Inquiry detail</p>
                  <h2 className="mt-1.5 font-display text-2xl font-bold text-mist">{viewing.name}</h2>
                  <p className="mt-1 text-xs text-fog">{fmtDate(viewing.createdAt)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setViewing(null)}
                  aria-label="Close details"
                  className="rounded-full border border-mist/12 p-2 text-fog transition-colors hover:text-mist"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <dl className="mt-6 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                {[
                  ["Email", viewing.email],
                  ["Phone", viewing.phone],
                  ["Company", viewing.company || "—"],
                  ["Website", viewing.website || "—"],
                  ["Service", viewing.service],
                  ["Budget", viewing.budget],
                  ["Timeline", viewing.timeline],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl border border-mist/8 bg-ink-900/60 p-3.5">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-fog">{k}</dt>
                    <dd className="mt-1 break-words font-semibold text-mist">{v}</dd>
                  </div>
                ))}
                <div className="rounded-xl border border-mist/8 bg-ink-900/60 p-3.5 sm:col-span-2">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-fog">Project description</dt>
                  <dd className="mt-1 leading-relaxed text-mist/90">{viewing.description}</dd>
                </div>
              </dl>

              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-fog">Update status</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {INQUIRY_STATUSES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => changeStatus(viewing.id, s)}
                    className={`rounded-full border px-4 py-2 font-mono text-[11px] font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 ${
                      viewing.status === s ? statusTint[s] : "border-mist/12 text-fog hover:text-mist"
                    }`}
                  >
                    {s.replace("_", " ")}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

import { agency } from "../config/agencyConfig";

/**
 * ─────────────────────────────────────────────────────────────
 *  INQUIRY / LEAD SERVICE LAYER
 *
 *  This module is the single place that talks to the backend.
 *  It currently persists inquiries to localStorage so the full
 *  lead flow (submit → store → admin dashboard) works end-to-end
 *  in this static demo build.
 *
 *  To connect the Spring Boot backend, replace the bodies with:
 *    submitInquiry      → POST   `${agency.apiBase}/inquiries`
 *    fetchInquiries     → GET    `${agency.apiBase}/inquiries`        (admin protected)
 *    fetchInquiry       → GET    `${agency.apiBase}/inquiries/{id}`
 *    updateInquiryStatus→ PUT    `${agency.apiBase}/inquiries/{id}/status`
 *    deleteInquiry      → DELETE `${agency.apiBase}/inquiries/{id}`
 * ─────────────────────────────────────────────────────────────
 */

export const INQUIRY_STATUSES = ["NEW", "CONTACTED", "IN_DISCUSSION", "CONVERTED", "CLOSED"] as const;
export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];

export type InquiryInput = {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  service: string;
  budget: string;
  timeline: string;
  description: string;
};

export type Inquiry = InquiryInput & {
  id: string;
  status: InquiryStatus;
  createdAt: string;
};

const STORAGE_KEY = "pk_inquiries_v1";
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

function read(): Inquiry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Inquiry[];
  } catch {
    /* corrupted storage — fall through to seed */
  }
  const seeded = seedSamples();
  write(seeded);
  return seeded;
}

function write(list: Inquiry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

/** Demo data so the admin dashboard can be explored immediately */
function seedSamples(): Inquiry[] {
  const now = Date.now();
  const day = 86_400_000;
  const mk = (p: Partial<Inquiry> & { id: string; name: string; createdAt: string }): Inquiry => ({
    email: "sample@example.com",
    phone: "+91 00000 00000",
    company: "Sample Co.",
    website: "",
    service: "Website Development",
    budget: "₹25,000 – ₹50,000",
    timeline: "Within 1 Month",
    description: "This is sample data for demonstration. Replace with real inquiries.",
    status: "NEW",
    ...p,
  });
  return [
    mk({
      id: "inq-seed-1",
      name: "Sample — Aarav Kapoor",
      service: "Website Development",
      status: "NEW",
      createdAt: new Date(now - 1 * day).toISOString(),
    }),
    mk({
      id: "inq-seed-2",
      name: "Sample — Meera Nair",
      company: "Sample Studio",
      service: "Branding",
      budget: "₹50,000 – ₹1,00,000",
      status: "CONTACTED",
      createdAt: new Date(now - 3 * day).toISOString(),
    }),
    mk({
      id: "inq-seed-3",
      name: "Sample — Dev Patel",
      company: "Sample Mart",
      service: "Digital Solutions",
      budget: "₹1,00,000+",
      status: "IN_DISCUSSION",
      createdAt: new Date(now - 6 * day).toISOString(),
    }),
    mk({
      id: "inq-seed-4",
      name: "Sample — Sana Iqbal",
      company: "Sample Brands",
      service: "UI/UX Design",
      budget: "Under ₹25,000",
      status: "CONVERTED",
      createdAt: new Date(now - 12 * day).toISOString(),
    }),
  ];
}

function uid() {
  return `inq-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function submitInquiry(input: InquiryInput): Promise<Inquiry> {
  // Simulated network latency for a realistic loading state
  await delay(1100);
  const list = read();
  const inquiry: Inquiry = {
    ...input,
    id: uid(),
    status: "NEW",
    createdAt: new Date().toISOString(),
  };
  write([inquiry, ...list]);
  // TODO(backend): POST `${agency.apiBase}/inquiries` then trigger
  // confirmation email to client + notification email to the agency owner.
  return inquiry;
}

export async function fetchInquiries(): Promise<Inquiry[]> {
  await delay(350);
  return read().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function updateInquiryStatus(id: string, status: InquiryStatus): Promise<Inquiry> {
  await delay(200);
  const list = read();
  const idx = list.findIndex((i) => i.id === id);
  if (idx === -1) throw new Error("Inquiry not found");
  list[idx] = { ...list[idx], status };
  write(list);
  return list[idx];
}

export async function deleteInquiry(id: string): Promise<void> {
  await delay(200);
  write(read().filter((i) => i.id !== id));
}

export { agency };

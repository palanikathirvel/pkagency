/**
 * ============================================================
 *  INQUIRY SERVICE LAYER
 *  Mirrors the Spring Boot REST API contract:
 *
 *    POST /api/inquiries            → submitInquiry()
 *    GET  /api/inquiries            → getInquiries()      (admin)
 *    GET  /api/inquiries/{id}       → getInquiry()        (admin)
 *    PUT  /api/inquiries/{id}/status→ updateInquiryStatus()
 *    DELETE /api/inquiries/{id}     → deleteInquiry()
 *
 *  Currently persists to localStorage so the full lead flow
 *  works in this frontend build. To go live, swap the internals
 *  with fetch() calls to the endpoints above — signatures stay
 *  identical, no component changes required.
 * ============================================================
 */

export const API_BASE = "/api/inquiries"; // future Spring Boot endpoint

export type InquiryStatus =
  | "NEW"
  | "CONTACTED"
  | "IN_DISCUSSION"
  | "CONVERTED"
  | "CLOSED";

export const INQUIRY_STATUSES: InquiryStatus[] = [
  "NEW",
  "CONTACTED",
  "IN_DISCUSSION",
  "CONVERTED",
  "CLOSED",
];

export interface InquiryPayload {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  service: string;
  budget: string;
  timeline: string;
  description: string;
}

export interface Inquiry extends InquiryPayload {
  id: string;
  status: InquiryStatus;
  createdAt: string; // ISO date
}

const STORAGE_KEY = "pk_creative_inquiries";
const DEMO_KEY = "pk_creative_inquiries_demo";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

function readStore(): Inquiry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Inquiry[]) : [];
  } catch {
    return [];
  }
}

function writeStore(items: Inquiry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* storage unavailable — inquiry still resolves for the session */
  }
}

/** POST /api/inquiries — validates, persists, and (in production) emails client + agency. */
export async function submitInquiry(
  payload: InquiryPayload
): Promise<Inquiry> {
  await delay(1400); // simulated network + email dispatch latency

  if (!payload.name.trim() || !payload.email.trim()) {
    throw new Error("Name and email are required.");
  }

  const inquiry: Inquiry = {
    ...payload,
    id: `inq_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    status: "NEW",
    createdAt: new Date().toISOString(),
  };

  const items = readStore();
  items.unshift(inquiry);
  writeStore(items);

  // Production hooks (wire when backend is live):
  // await fetch(API_BASE, { method: "POST", body: JSON.stringify(inquiry) });
  // await sendConfirmationEmail(inquiry.email);
  // await notifyAgencyOwner(inquiry);

  return inquiry;
}

/** GET /api/inquiries (admin, protected) */
export async function getInquiries(): Promise<Inquiry[]> {
  await delay(500);
  return readStore();
}

/** GET /api/inquiries/{id} */
export async function getInquiry(id: string): Promise<Inquiry | undefined> {
  await delay(200);
  return readStore().find((i) => i.id === id);
}

/** PUT /api/inquiries/{id}/status */
export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus
): Promise<Inquiry[]> {
  await delay(350);
  const items = readStore().map((i) => (i.id === id ? { ...i, status } : i));
  writeStore(items);
  return items;
}

/** DELETE /api/inquiries/{id} */
export async function deleteInquiry(id: string): Promise<Inquiry[]> {
  await delay(350);
  const items = readStore().filter((i) => i.id !== id);
  writeStore(items);
  return items;
}

/** Clearly-labeled demo data so the admin dashboard can be explored. */
export async function seedDemoInquiries(): Promise<Inquiry[]> {
  await delay(600);
  const demo: Inquiry[] = [
    {
      id: "demo_1",
      name: "Aarav Mehta",
      email: "aarav@novatech.example",
      phone: "+91 98123 45670",
      company: "NovaTech Solutions",
      website: "novatech.example",
      service: "Website Development",
      budget: "₹50,000 – ₹1,00,000",
      timeline: "Within 1 Month",
      description:
        "We need a complete business website with services pages, case studies and lead capture before our funding announcement.",
      status: "NEW",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    },
    {
      id: "demo_2",
      name: "Sara Iqbal",
      email: "sara@bloomco.example",
      phone: "+91 99887 76655",
      company: "Bloom & Co",
      website: "",
      service: "Branding",
      budget: "₹25,000 – ₹50,000",
      timeline: "1–3 Months",
      description:
        "Rebrand for our studio — logo, color system and brand guidelines we can hand to vendors.",
      status: "IN_DISCUSSION",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
    },
    {
      id: "demo_3",
      name: "Dev Patel",
      email: "dev@zenithfit.example",
      phone: "+91 91234 56789",
      company: "Zenith Fitness",
      website: "zenithfit.example",
      service: "Digital Solutions",
      budget: "₹1,00,000+",
      timeline: "Flexible",
      description:
        "Member dashboard with class bookings, payments and trainer management. Replacing our current spreadsheet system.",
      status: "CONVERTED",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    },
  ];
  const items = [...demo, ...readStore()];
  writeStore(items);
  try {
    sessionStorage.setItem(DEMO_KEY, "1");
  } catch {
    /* noop */
  }
  return items;
}

export const hasDemoData = () => {
  try {
    return sessionStorage.getItem(DEMO_KEY) === "1";
  } catch {
    return false;
  }
};

/**
 * ============================================================
 *  P.K CREATIVE AGENCY — CENTRAL CONFIGURATION
 *  Edit everything about the agency's identity here.
 *  No component hardcodes these values.
 * ============================================================
 */

export const agencyConfig = {
  name: "P.K Creative Agency",
  shortName: "P.K Creative",
  tagline: "Turning Ideas Into Digital Experiences",
  siteUrl: "https://pkcreative.agency",
  logoSrc:
    "https://image.qwenlm.ai/generated-images/880fc2b0-57a5-46ab-96e8-67bc09f4001b/_result.png",

  /* ---------------- contact ---------------- */
  email: "hello@pkcreative.agency", // placeholder — replace with real email
  phone: "+91 98765 43210", // placeholder — replace with real phone
  phoneHref: "tel:+919876543210",
  location: "Bengaluru, India · Working worldwide", // placeholder
  responseTime: "within 24 hours",

  /* ---------------- WhatsApp ---------------- */
  // International format, digits only (no + or spaces)
  whatsappNumber: "919876543210", // placeholder — replace with real number
  whatsappMessage:
    "Hi P.K Creative Agency! I'm interested in discussing a project.",

  /* ---------------- admin ---------------- */
  adminPasscode: "pk-admin-2026", // placeholder — replace + move auth server-side in production

  /* ---------------- socials (placeholders until real links exist) ---------------- */
  socials: [
    { label: "LinkedIn", href: "#", handle: "@pkcreative" },
    { label: "Instagram", href: "#", handle: "@pk.creative" },
    { label: "Behance", href: "#", handle: "/pkcreative" },
    { label: "GitHub", href: "#", handle: "/pkcreative" },
  ] as const,

  /* ---------------- stats (edit freely) ---------------- */
  stats: [
    { value: 50, suffix: "+", label: "Projects Completed" },
    { value: 30, suffix: "+", label: "Happy Clients" },
    { value: 10, suffix: "+", label: "Industries Served" },
    { value: 5, suffix: "+", label: "Years of Experience" },
  ],

  /* ---------------- navigation ---------------- */
  navLinks: [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services" },
    { label: "Work", to: "/work" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ],

  /* ---------------- form options ---------------- */
  serviceOptions: [
    "Website Development",
    "UI/UX Design",
    "Branding",
    "Social Media Design",
    "Digital Solutions",
    "Other",
  ],
  budgetOptions: [
    "Under ₹25,000",
    "₹25,000 – ₹50,000",
    "₹50,000 – ₹1,00,000",
    "₹1,00,000+",
    "Let's Discuss",
  ],
  timelineOptions: ["ASAP", "Within 1 Month", "1–3 Months", "Flexible"],
};

export type AgencyConfig = typeof agencyConfig;

/* WhatsApp deep link builder — used everywhere from this one place */
export const whatsappLink = (message?: string) =>
  `https://wa.me/${agencyConfig.whatsappNumber}?text=${encodeURIComponent(
    message ?? agencyConfig.whatsappMessage
  )}`;

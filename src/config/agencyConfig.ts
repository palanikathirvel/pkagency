/**
 * ─────────────────────────────────────────────────────────────
 *  CENTRAL AGENCY CONFIGURATION
 *  Update everything about the agency from this single file.
 *  Nothing here should be hardcoded anywhere else.
 * ─────────────────────────────────────────────────────────────
 */
export const agency = {
  name: "P.K Creative Agency",
  shortName: "P.K Creative",
  tagline: "Turning Ideas Into Digital Experiences",

  contact: {
    email: "hello@pkcreative.agency",
    phone: "+91 98765 43210",
    location: "Mumbai, India · Working worldwide",
  },

  /** WhatsApp number in international format, digits only (no +, spaces or dashes) */
  whatsapp: {
    number: "919876543210",
    prefillMessage: "Hi P.K Creative Agency! I'm interested in discussing a project.",
  },

  /** Replace "#" with real profile URLs when available */
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Behance", href: "#" },
    { label: "GitHub", href: "#" },
  ] as { label: string; href: string }[],

  /** Editable statistics — values update everywhere automatically */
  stats: [
    { value: 50, suffix: "+", label: "Projects Completed" },
    { value: 30, suffix: "+", label: "Happy Clients" },
    { value: 10, suffix: "+", label: "Industries Served" },
    { value: 4, suffix: "+", label: "Years of Experience" },
  ],

  /** Passphrase for the demo admin dashboard at #/admin — change before production */
  adminPassphrase: "pkcreative",

  /** Point this at your Spring Boot backend when deployed (POST/GET /api/inquiries) */
  apiBase: "/api",
};

export const waLink = `https://wa.me/${agency.whatsapp.number}?text=${encodeURIComponent(
  agency.whatsapp.prefillMessage
)}`;

export const seo = {
  siteUrl: "https://pkcreative.agency",
  defaultTitle: "P.K Creative Agency | Websites, Branding & Digital Experiences",
  defaultDescription:
    "P.K Creative Agency helps businesses build powerful websites, memorable brands, and modern digital experiences.",
};

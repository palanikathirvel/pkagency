import {
  Globe,
  PenTool,
  Megaphone,
  Layers,
  Rocket,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  slug: string;
  icon: LucideIcon;
  title: string;
  short: string;
  description: string;
  features: string[];
  deliverables: string[];
  gradient: string; // tailwind gradient classes for the icon tile
  glow: string; // rgba glow used on hover
  bestFor: string;
}

export const services: Service[] = [
  {
    slug: "website-development",
    icon: Globe,
    title: "Website Development",
    short:
      "Fast, responsive, conversion-ready websites — from landing pages to full web applications.",
    description:
      "We engineer websites that load fast, rank well and turn visitors into customers. Every build is responsive by default, SEO-friendly and crafted around your business goals.",
    features: [
      "Business websites",
      "Portfolio websites",
      "High-converting landing pages",
      "E-commerce websites",
      "Custom web applications",
    ],
    deliverables: [
      "Responsive build",
      "CMS setup",
      "SEO foundation",
      "Analytics & tracking",
      "Launch support",
    ],
    gradient: "from-royal to-cobalt",
    glow: "rgba(139,124,255,0.4)",
    bestFor: "Businesses that need a website that actually works for them.",
  },
  {
    slug: "ui-ux-design",
    icon: PenTool,
    title: "UI/UX Design",
    short:
      "Modern, intuitive interfaces designed around your users — from wireframe to clickable prototype.",
    description:
      "Great products feel effortless. We design clean, user-centred interfaces for web and mobile, validating ideas with wireframes and interactive prototypes before a single line of code.",
    features: [
      "Modern website UI",
      "Mobile app UI",
      "Dashboard design",
      "Wireframes & user flows",
      "Interactive prototypes",
    ],
    deliverables: [
      "UX research & flows",
      "Wireframes",
      "Hi-fi UI screens",
      "Design system",
      "Clickable prototype",
    ],
    gradient: "from-cobalt to-flare",
    glow: "rgba(78,162,255,0.4)",
    bestFor: "Startups and product teams who care about user experience.",
  },
  {
    slug: "social-media-design",
    icon: Megaphone,
    title: "Social Media & Creative Design",
    short:
      "Scroll-stopping creatives for Instagram, LinkedIn and campaigns that keep your brand visible.",
    description:
      "Consistent, on-brand creatives that make people stop scrolling. We design posts, banners and campaign visuals that carry your brand voice across every platform.",
    features: [
      "Instagram creatives",
      "LinkedIn creatives",
      "Marketing banners",
      "Posters & campaign art",
      "Brand visuals",
    ],
    deliverables: [
      "Post & story templates",
      "Campaign creatives",
      "Ad banners",
      "Content calendars",
      "Highlight covers",
    ],
    gradient: "from-flare to-royal",
    glow: "rgba(255,110,199,0.4)",
    bestFor: "Creators and brands building an active online presence.",
  },
  {
    slug: "branding",
    icon: Layers,
    title: "Branding",
    short:
      "Memorable identities — logos, color systems and guidelines that make your brand unmistakable.",
    description:
      "Your brand is more than a logo. We craft complete identity systems — marks, colour, typography and voice — with guidelines that keep everything consistent as you grow.",
    features: [
      "Logo design",
      "Brand identity",
      "Color systems",
      "Typography",
      "Brand guidelines",
    ],
    deliverables: [
      "Logo suite & marks",
      "Colour & type system",
      "Stationery design",
      "Brand guideline book",
      "Social kit",
    ],
    gradient: "from-royal to-flare",
    glow: "rgba(139,124,255,0.45)",
    bestFor: "New ventures and rebrands that need to look established.",
  },
  {
    slug: "digital-solutions",
    icon: Rocket,
    title: "Digital Solutions",
    short:
      "Custom tools, automations and dashboards that remove busywork and scale with your business.",
    description:
      "Beyond websites — we build the digital backbone of your business: custom tools, automations and dashboards that save hours every week and grow with you.",
    features: [
      "Custom solutions for businesses",
      "Automation integrations",
      "Business dashboards",
      "Digital transformation solutions",
      "API & tool integrations",
    ],
    deliverables: [
      "Process audit",
      "Custom tool build",
      "Automation setup",
      "Reporting dashboards",
      "Training & handover",
    ],
    gradient: "from-cobalt to-royal",
    glow: "rgba(78,162,255,0.45)",
    bestFor: "Teams drowning in manual work and scattered tools.",
  },
];

export const getService = (slug: string) =>
  services.find((s) => s.slug === slug);

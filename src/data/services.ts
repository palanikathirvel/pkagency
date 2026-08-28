import { Globe2, PenTool, Megaphone, Fingerprint, Rocket, type LucideIcon } from "lucide-react";

export type Service = {
  id: string;
  icon: LucideIcon;
  title: string;
  blurb: string;
  features: string[];
  /** Tailwind class fragments — kept here so cards can be tinted per service */
  tint: {
    text: string;
    chip: string;
    gradient: string;
    shadow: string;
  };
};

export const services: Service[] = [
  {
    id: "web-development",
    icon: Globe2,
    title: "Website Development",
    blurb: "High-performance websites and web apps engineered to turn visitors into customers.",
    features: [
      "Business websites",
      "Portfolio websites",
      "Landing pages",
      "E-commerce websites",
      "Custom web applications",
    ],
    tint: {
      text: "text-royal",
      chip: "bg-royal/10 text-royal border-royal/25",
      gradient: "from-royal to-cobalt",
      shadow: "group-hover:shadow-royal/20",
    },
  },
  {
    id: "ui-ux",
    icon: PenTool,
    title: "UI/UX Design",
    blurb: "Intuitive, research-driven interfaces that feel effortless and look unforgettable.",
    features: [
      "Modern website UI",
      "Mobile app UI",
      "Dashboard design",
      "Wireframes",
      "Interactive prototypes",
    ],
    tint: {
      text: "text-cobalt",
      chip: "bg-cobalt/10 text-cobalt border-cobalt/25",
      gradient: "from-cobalt to-royal",
      shadow: "group-hover:shadow-cobalt/20",
    },
  },
  {
    id: "social-creative",
    icon: Megaphone,
    title: "Social Media & Creative Design",
    blurb: "Scroll-stopping creative for every platform your audience lives on.",
    features: [
      "Instagram creatives",
      "LinkedIn creatives",
      "Marketing banners",
      "Posters",
      "Brand visuals",
    ],
    tint: {
      text: "text-flare",
      chip: "bg-flare/10 text-flare border-flare/25",
      gradient: "from-flare to-royal",
      shadow: "group-hover:shadow-flare/20",
    },
  },
  {
    id: "branding",
    icon: Fingerprint,
    title: "Branding",
    blurb: "Identities with substance — built to be recognized, trusted and remembered.",
    features: [
      "Logo design",
      "Brand identity",
      "Color systems",
      "Typography",
      "Brand guidelines",
    ],
    tint: {
      text: "text-cobalt",
      chip: "bg-cobalt/10 text-cobalt border-cobalt/25",
      gradient: "from-cobalt to-flare",
      shadow: "group-hover:shadow-cobalt/20",
    },
  },
  {
    id: "digital-solutions",
    icon: Rocket,
    title: "Digital Solutions",
    blurb: "Automation, dashboards and custom tooling that move your business forward.",
    features: [
      "Custom business solutions",
      "Automation integrations",
      "Business dashboards",
      "Digital transformation",
      "Process optimization",
    ],
    tint: {
      text: "text-royal",
      chip: "bg-royal/10 text-royal border-royal/25",
      gradient: "from-royal to-flare",
      shadow: "group-hover:shadow-royal/20",
    },
  },
];

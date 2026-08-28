export type ProjectCategory =
  | "Websites"
  | "Branding"
  | "UI/UX"
  | "Digital Products";

export interface Project {
  id: string;
  name: string;
  category: ProjectCategory;
  clientType: string; // e.g. "Business · Website"
  description: string;
  longDescription: string;
  tech: string[];
  image: string;
  alt: string;
  year: string;
  featured?: boolean;
  highlights: string[];
}

/**
 * Portfolio data — fully dynamic. Replace entries with real projects
 * (name, description, tech, image) without touching any component.
 */
export const projects: Project[] = [
  {
    id: "modern-business-website",
    name: "Modern Business Website",
    category: "Websites",
    clientType: "Business · Website",
    description:
      "A professional website designed to help a growing business establish a strong online presence.",
    longDescription:
      "A complete business website built to establish credibility and drive enquiries. We designed a clean, confident interface with clear service storytelling, fast load times and a conversion-focused contact flow.",
    tech: ["React", "Tailwind CSS"],
    image:
      "https://image.qwenlm.ai/generated-images/03c7632f-fec7-48f0-a6af-02f71a241145/_result.png",
    alt: "Modern business website displayed on a laptop mockup with dark UI and purple-blue accents",
    year: "2025",
    featured: true,
    highlights: [
      "Conversion-focused layout & CTAs",
      "90+ Lighthouse performance score",
      "Fully responsive across devices",
    ],
  },
  {
    id: "ecommerce-platform",
    name: "E-Commerce Platform",
    category: "Websites",
    clientType: "Retail · E-Commerce",
    description:
      "A modern shopping experience with product browsing, cart functionality, and secure checkout.",
    longDescription:
      "A full shopping experience from browsing to checkout — product catalogues with smart filtering, a persistent cart, and a secure, minimal checkout flow designed to reduce drop-off.",
    tech: ["React", "Spring Boot", "MongoDB"],
    image:
      "https://image.qwenlm.ai/generated-images/f79acd82-4999-457e-b212-d451845334b3/_result.png",
    alt: "E-commerce website mockup showing a product grid in a floating browser window",
    year: "2025",
    featured: true,
    highlights: [
      "Product browsing with filters & search",
      "Persistent cart & secure checkout",
      "Admin inventory dashboard",
    ],
  },
  {
    id: "personal-portfolio",
    name: "Personal Portfolio",
    category: "Websites",
    clientType: "Personal Brand · Portfolio",
    description:
      "A creative portfolio designed to showcase skills, projects, and professional experience.",
    longDescription:
      "A bold personal portfolio that puts the work front and centre — expressive typography, an asymmetric project grid and buttery-smooth interactions that make the owner memorable.",
    tech: ["React", "Vite", "Tailwind CSS"],
    image:
      "https://image.qwenlm.ai/generated-images/7c687b54-0c40-4376-bb1a-f55a6d02a70a/_result.png",
    alt: "Creative personal portfolio website with bold typography and an asymmetric project grid",
    year: "2024",
    featured: true,
    highlights: [
      "Distinctive typographic identity",
      "Case-study driven structure",
      "Contact funnel to bookings",
    ],
  },
  {
    id: "startup-brand-identity",
    name: "Startup Brand Identity",
    category: "Branding",
    clientType: "Startup · Branding",
    description:
      "A complete identity system — logo, color palette, typography and brand guidelines for a new venture.",
    longDescription:
      "From naming workshop to final guideline book: a geometric logo suite, a confident colour system and typography rules that let the founding team produce on-brand assets without a designer.",
    tech: ["Illustrator", "Figma", "Brand Guidelines"],
    image:
      "https://image.qwenlm.ai/generated-images/91120edd-e16a-455c-ba49-0da205e064eb/_result.png",
    alt: "Brand identity stationery flat lay with business cards, letterhead and color swatches",
    year: "2025",
    highlights: [
      "Logo suite & usage rules",
      "Color & typography system",
      "40-page brand guideline book",
    ],
  },
  {
    id: "fitness-app-ui",
    name: "Fitness App UI/UX",
    category: "UI/UX",
    clientType: "Mobile App · UI/UX",
    description:
      "A dark-mode fitness tracking app with vivid data visualisation, designed from wireframe to prototype.",
    longDescription:
      "A mobile experience that makes tracking feel rewarding — activity rings, gradient progress charts and a frictionless logging flow, validated with a clickable prototype before development.",
    tech: ["Figma", "Prototyping", "Design System"],
    image:
      "https://image.qwenlm.ai/generated-images/61c740a7-402a-4f16-8f49-20b39ae6ef2d/_result.png",
    alt: "Two smartphone screens showing a dark fitness tracking app with gradient charts",
    year: "2024",
    highlights: [
      "60+ designed screens",
      "Reusable component library",
      "Interactive prototype for testing",
    ],
  },
  {
    id: "analytics-dashboard",
    name: "Business Analytics Dashboard",
    category: "Digital Products",
    clientType: "SaaS · Digital Product",
    description:
      "A real-time business dashboard unifying sales, marketing and operations data in one view.",
    longDescription:
      "A custom dashboard that replaced five spreadsheets with one live view — KPI cards, trend charts and automated reporting that saves the team hours every single week.",
    tech: ["React", "REST APIs", "Data Viz"],
    image:
      "https://image.qwenlm.ai/generated-images/d745b186-9f19-4c57-a02f-65a0d02e3a3f/_result.png",
    alt: "SaaS analytics dashboard with dark theme charts and KPI cards on a monitor mockup",
    year: "2025",
    highlights: [
      "Live KPI & trend visualisation",
      "Automated weekly reports",
      "Role-based access views",
    ],
  },
];

export const projectCategories = [
  "All",
  "Websites",
  "Branding",
  "UI/UX",
  "Digital Products",
] as const;

import {
  Lightbulb,
  HeartHandshake,
  Cpu,
  MessageSquare,
  Gem,
  LifeBuoy,
  Search,
  Map,
  Palette,
  Code2,
  Rocket,
  type LucideIcon,
} from "lucide-react";

/* ---------------- Why Choose Us ---------------- */
export interface WhyPoint {
  num: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const whyPoints: WhyPoint[] = [
  {
    num: "01",
    icon: Lightbulb,
    title: "Creative Thinking",
    description:
      "We don't just build websites. We create experiences that represent your brand and make people remember it.",
  },
  {
    num: "02",
    icon: HeartHandshake,
    title: "Client-Focused Approach",
    description:
      "Every project starts by understanding your business, your audience and your goals — not by opening a template.",
  },
  {
    num: "03",
    icon: Cpu,
    title: "Modern Technology",
    description:
      "We use modern tools and technologies to build fast, secure and scalable digital products that last.",
  },
  {
    num: "04",
    icon: MessageSquare,
    title: "Transparent Communication",
    description:
      "Clear communication and regular updates throughout the project. You always know what's happening and what's next.",
  },
  {
    num: "05",
    icon: Gem,
    title: "Quality First",
    description:
      "We focus on clean design, performance, and attention to detail — the small things that make work feel premium.",
  },
  {
    num: "06",
    icon: LifeBuoy,
    title: "End-to-End Support",
    description:
      "From idea and design to launch and beyond — we stay with you after go-live with support and iteration.",
  },
];

/* ---------------- Process ---------------- */
export interface ProcessStep {
  num: string;
  icon: LucideIcon;
  title: string;
  description: string;
  detail: string;
}

export const processSteps: ProcessStep[] = [
  {
    num: "01",
    icon: Search,
    title: "Discover",
    description:
      "We understand your business, goals, audience, and project requirements.",
    detail: "Kickoff call · questionnaires · competitor scan",
  },
  {
    num: "02",
    icon: Map,
    title: "Strategy",
    description:
      "We create a clear plan and define the best approach for your project.",
    detail: "Sitemap · scope · timeline · success metrics",
  },
  {
    num: "03",
    icon: Palette,
    title: "Design",
    description: "We design a modern and user-friendly experience.",
    detail: "Wireframes · UI design · interactive prototype",
  },
  {
    num: "04",
    icon: Code2,
    title: "Build",
    description:
      "We develop the solution using modern technologies and best practices.",
    detail: "Development · reviews · weekly progress demos",
  },
  {
    num: "05",
    icon: Rocket,
    title: "Launch",
    description: "We test, optimize, and launch your project.",
    detail: "QA · performance pass · deployment · handover",
  },
];

/* ---------------- Pricing ---------------- */
export interface PricingTier {
  id: string;
  name: string;
  audience: string;
  // No fixed prices until provided — "Starting from ₹XX,XXX" is the editable placeholder.
  priceNote: string;
  features: string[];
  cta: string;
  featured?: boolean;
  gradient: string;
}

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    audience: "For individuals and small businesses.",
    priceNote: "Starting from ₹XX,XXX",
    features: [
      "Landing page",
      "Responsive design",
      "Basic SEO",
      "Contact form",
    ],
    cta: "Get a Quote",
    gradient: "from-royal to-cobalt",
  },
  {
    id: "business",
    name: "Business",
    audience: "For growing businesses.",
    priceNote: "Starting from ₹XX,XXX",
    features: [
      "Multi-page website",
      "Custom design",
      "SEO optimization",
      "Analytics integration",
    ],
    cta: "Get a Quote",
    featured: true,
    gradient: "from-royal via-cobalt to-flare",
  },
  {
    id: "custom",
    name: "Custom",
    audience: "For advanced projects.",
    priceNote: "Starting from ₹XX,XXX",
    features: [
      "Custom web application",
      "Advanced functionality",
      "Backend development",
      "Database integration",
    ],
    cta: "Discuss Your Project",
    gradient: "from-cobalt to-flare",
  },
];

/* ---------------- Team (placeholders until real team is added) ---------------- */
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
  gradient: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Team Member",
    role: "Founder & Creative Director",
    bio: "Leads strategy, brand direction and the creative bar on every project.",
    initials: "PK",
    gradient: "from-royal to-cobalt",
  },
  {
    name: "Team Member",
    role: "Lead UI/UX Designer",
    bio: "Turns messy problems into clean, intuitive interfaces people love using.",
    initials: "UX",
    gradient: "from-cobalt to-flare",
  },
  {
    name: "Team Member",
    role: "Full-Stack Developer",
    bio: "Builds fast, scalable products with modern web technologies.",
    initials: "FS",
    gradient: "from-flare to-royal",
  },
  {
    name: "Team Member",
    role: "Brand & Content Strategist",
    bio: "Shapes brand voices, campaigns and content that connect with audiences.",
    initials: "BR",
    gradient: "from-royal to-flare",
  },
];

/* ---------------- Trusted-by marquee (placeholder wordmarks) ---------------- */
export const clientWordmarks = [
  "NOVATECH",
  "BLOOM & CO",
  "KIRANA MART",
  "ZENITH FITNESS",
  "AURORA CAFÉ",
  "PIXELPLAY",
  "GREENLEAF",
  "URBANEST",
];

/* ---------------- FAQs (Services page) ---------------- */
export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "How long does a typical project take?",
    a: "Landing pages usually take 1–2 weeks, business websites 2–4 weeks, and larger applications 6+ weeks. You'll get a clear timeline in our proposal before we start.",
  },
  {
    q: "How much does a website cost?",
    a: "Every quote is tailored to scope. Packages start from an editable placeholder range (₹XX,XXX) — share your requirements and we'll send a fixed, transparent quote within 24 hours.",
  },
  {
    q: "What does the process look like?",
    a: "Discover → Strategy → Design → Build → Launch. You'll see progress in weekly demos and always know exactly what's happening and what's next.",
  },
  {
    q: "Do you provide support after launch?",
    a: "Yes. Every project includes a post-launch support window, and we offer ongoing care plans for updates, security and growth.",
  },
  {
    q: "Which technologies do you work with?",
    a: "React, Vite, Tailwind CSS and TypeScript on the frontend; Spring Boot, Node.js, MongoDB and PostgreSQL on the backend — chosen to fit your project, not the other way round.",
  },
];

/* ---------------- About page values ---------------- */
export const studioImage =
  "https://image.qwenlm.ai/generated-images/6262a973-9140-40f0-b15b-e1a35d9ef960/_result.png";

export const coreValues = [
  {
    title: "Craft over templates",
    description: "Every project is designed from scratch around the client — never drag-and-drop.",
  },
  {
    title: "Clarity in communication",
    description: "Plain language, honest timelines, and updates you don't have to chase.",
  },
  {
    title: "Partnership, not vendorship",
    description: "We measure success by your growth, not just delivery dates.",
  },
  {
    title: "Impact you can measure",
    description: "Enquiries, conversions, hours saved — design decisions tied to results.",
  },
];

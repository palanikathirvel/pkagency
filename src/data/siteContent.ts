import {
  Lightbulb,
  HeartHandshake,
  Cpu,
  MessagesSquare,
  Gem,
  Orbit,
  type LucideIcon,
} from "lucide-react";

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const marqueeItems = [
  "Websites",
  "Branding",
  "UI/UX",
  "E-Commerce",
  "Web Apps",
  "Logo Design",
  "Social Creative",
  "Prototypes",
  "Dashboards",
  "Landing Pages",
];

export type WhyUsItem = { icon: LucideIcon; title: string; body: string };

export const whyUs: WhyUsItem[] = [
  {
    icon: Lightbulb,
    title: "Creative Thinking",
    body: "We don't just build websites. We create experiences that represent your brand.",
  },
  {
    icon: HeartHandshake,
    title: "Client-Focused Approach",
    body: "Every project starts by understanding your business and your goals.",
  },
  {
    icon: Cpu,
    title: "Modern Technology",
    body: "We use modern tools and technologies to build fast and scalable digital products.",
  },
  {
    icon: MessagesSquare,
    title: "Transparent Communication",
    body: "Clear communication and regular updates throughout the project.",
  },
  {
    icon: Gem,
    title: "Quality First",
    body: "We focus on clean design, performance, and attention to detail.",
  },
  {
    icon: Orbit,
    title: "End-to-End Support",
    body: "From idea and design to launch and beyond.",
  },
];

export type ProcessStep = { num: string; title: string; body: string };

export const processSteps: ProcessStep[] = [
  {
    num: "01",
    title: "Discover",
    body: "We understand your business, goals, audience, and project requirements.",
  },
  {
    num: "02",
    title: "Strategy",
    body: "We create a clear plan and define the best approach for your project.",
  },
  {
    num: "03",
    title: "Design",
    body: "We design a modern and user-friendly experience.",
  },
  {
    num: "04",
    title: "Build",
    body: "We develop the solution using modern technologies and best practices.",
  },
  {
    num: "05",
    title: "Launch",
    body: "We test, optimize, and launch your project.",
  },
];

export type PricingPlan = {
  id: string;
  name: string;
  audience: string;
  features: string[];
  cta: string;
  featured?: boolean;
  /** Editable price placeholder — replace when real pricing is decided */
  priceNote: string;
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    audience: "For individuals and small businesses.",
    features: ["Landing page", "Responsive design", "Basic SEO", "Contact form"],
    cta: "Get a Quote",
    priceNote: "Starting from ₹XX,XXX",
  },
  {
    id: "business",
    name: "Business",
    audience: "For growing businesses.",
    features: [
      "Multi-page website",
      "Custom design",
      "SEO optimization",
      "Analytics integration",
    ],
    cta: "Get a Quote",
    featured: true,
    priceNote: "Starting from ₹XX,XXX",
  },
  {
    id: "custom",
    name: "Custom",
    audience: "For advanced projects.",
    features: [
      "Custom web application",
      "Advanced functionality",
      "Backend development",
      "Database integration",
    ],
    cta: "Discuss Your Project",
    priceNote: "Let's talk",
  },
];

export type TeamMember = { initials: string; name: string; role: string };

/** Placeholder team — swap in real members in src/data/siteContent.ts */
export const team: TeamMember[] = [
  { initials: "PK", name: "Placeholder Name", role: "Founder & Creative Director" },
  { initials: "LD", name: "Placeholder Name", role: "Lead UI/UX Designer" },
  { initials: "FD", name: "Placeholder Name", role: "Full-Stack Developer" },
  { initials: "BS", name: "Placeholder Name", role: "Brand Strategist" },
];

export const serviceOptions = [
  "Website Development",
  "UI/UX Design",
  "Branding",
  "Social Media Design",
  "Digital Solutions",
  "Other",
];

export const budgetOptions = [
  "Under ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000+",
  "Let's Discuss",
];

export const timelineOptions = ["ASAP", "Within 1 Month", "1–3 Months", "Flexible"];

export const footerServices = [
  "Website Development",
  "UI/UX Design",
  "Branding",
  "Creative Design",
];

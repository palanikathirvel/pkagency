export interface Testimonial {
  id: number;
  quote: string;
  name: string; // placeholder — replace with real clients
  role: string;
  company: string;
  rating: number;
  initials: string;
  gradient: string;
}

/**
 * PLACEHOLDER TESTIMONIALS
 * Replace with real client quotes as soon as they are available.
 * The UI clearly marks these as samples.
 */
export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "P.K Creative Agency understood exactly what we needed and delivered a website that exceeded our expectations. Enquiries started coming in within the first week of launch.",
    name: "Client Name",
    role: "Founder",
    company: "Your Company",
    rating: 5,
    initials: "YC",
    gradient: "from-royal to-cobalt",
  },
  {
    id: 2,
    quote:
      "From the first call they felt like part of our team. Clear updates, honest timelines, and a brand identity we're genuinely proud to show investors.",
    name: "Client Name",
    role: "Co-founder",
    company: "Startup Co.",
    rating: 5,
    initials: "SC",
    gradient: "from-cobalt to-flare",
  },
  {
    id: 3,
    quote:
      "The dashboard they built replaced five spreadsheets and hours of weekly manual work. It paid for itself within the first month.",
    name: "Client Name",
    role: "Operations Head",
    company: "SMB Client",
    rating: 5,
    initials: "SM",
    gradient: "from-flare to-royal",
  },
  {
    id: 4,
    quote:
      "Our Instagram finally looks like our brand. Consistent, premium creatives — and the engagement growth speaks for itself.",
    name: "Client Name",
    role: "Marketing Lead",
    company: "D2C Brand",
    rating: 4,
    initials: "D2",
    gradient: "from-royal to-flare",
  },
];

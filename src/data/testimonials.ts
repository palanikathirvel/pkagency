export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  company: string;
  rating: number;
  initials: string;
  /** All entries are placeholders until real client feedback is collected */
  placeholder: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "P.K Creative Agency understood exactly what we needed and delivered a website that exceeded our expectations.",
    name: "Sample Client Name",
    company: "Your Company · Placeholder",
    rating: 5,
    initials: "SC",
    placeholder: true,
  },
  {
    id: "t2",
    quote:
      "From the first call to launch day, the process was clear, fast and collaborative. Our new brand finally feels like us.",
    name: "Sample Client Name",
    company: "Your Company · Placeholder",
    rating: 5,
    initials: "SC",
    placeholder: true,
  },
  {
    id: "t3",
    quote:
      "The dashboard they designed turned our messy data into something our whole team actually enjoys using every day.",
    name: "Sample Client Name",
    company: "Your Company · Placeholder",
    rating: 5,
    initials: "SC",
    placeholder: true,
  },
  {
    id: "t4",
    quote:
      "Regular updates, honest advice and pixel-perfect delivery. It felt like having an in-house design team on demand.",
    name: "Sample Client Name",
    company: "Your Company · Placeholder",
    rating: 5,
    initials: "SC",
    placeholder: true,
  },
];

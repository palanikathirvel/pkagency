import PortfolioSection from "../components/PortfolioSection";
import { Chip, Eyebrow, Reveal } from "../components/ui";
import { projects, projectCategories } from "../data/projects";
import { usePageMeta } from "../hooks/usePageMeta";

export default function WorkPage() {
  usePageMeta(
    "Selected Work | P.K Creative Agency — Websites, Brands & Digital Products",
    "A selection of projects and digital experiences created by P.K Creative Agency — business websites, e-commerce, branding, UI/UX and dashboards."
  );

  return (
    <main className="relative overflow-hidden pt-[130px]">
      <div className="absolute inset-0 bg-grid-dark [mask-image:radial-gradient(ellipse_70%_45%_at_50%_0%,black,transparent)]" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-24 left-1/4 h-[400px] w-[400px] rounded-full bg-flare/10 blur-[130px]" aria-hidden="true" />

      <header className="relative mx-auto max-w-7xl px-5 pb-6 lg:px-8">
        <Reveal>
          <Eyebrow>Our work</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-mist sm:text-5xl lg:text-6xl">
            Work that <span className="text-flare">ships</span> — and sells.
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-fog md:text-lg">
            Every project below started as a conversation. Filter by discipline, and when you&rsquo;re ready, start
            yours.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-8 flex flex-wrap gap-2.5">
            <Chip className="text-mist">{projects.length} projects</Chip>
            <Chip>{projectCategories.length - 1} disciplines</Chip>
            <Chip>100% crafted in-house</Chip>
          </div>
        </Reveal>
      </header>

      <PortfolioSection showHeader={false} />
    </main>
  );
}

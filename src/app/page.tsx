import Hero from "@/components/sections/Hero";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import ServicesOverview from "@/components/sections/ServicesOverview";
import ThreeDShowcase from "@/components/sections/ThreeDShowcase";
import CTABanner from "@/components/sections/CTABanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <ServicesOverview />
      <ThreeDShowcase />
      <CTABanner />
    </>
  );
}

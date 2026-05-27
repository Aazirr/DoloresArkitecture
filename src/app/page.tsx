import Hero from "@/components/sections/Hero";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import ServicesOverview from "@/components/sections/ServicesOverview";
import CTABanner from "@/components/sections/CTABanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <ServicesOverview />
      <CTABanner />
    </>
  );
}

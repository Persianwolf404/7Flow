import Carousel from "./components/Carousel";
import FeatureShowcase from "./components/FeatureShowcase";
import Hero from "./components/Hero";
import ProjectManagement from "./components/ProjectManagement";
import FAQ from "./components/FAQ";

export default function Home() {
  return (
    <div className="container">
      <Hero />
      <FeatureShowcase />
      <Carousel />
      <ProjectManagement />
      <FAQ />
    </div>
  );
}

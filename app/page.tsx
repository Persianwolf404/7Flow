import Carousel from "./components/Carousel";
import FeatureShowcase from "./components/FeatureShowcase";
import Hero from "./components/Hero";
import ProjectManagement from "./components/ProjectManagement";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeatureShowcase />
      <Carousel />
      <ProjectManagement />
    </div>
  );
}

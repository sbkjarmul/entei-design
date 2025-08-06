import PortfolioAboutMe from "./components/portfolio-about-me";
import PortfolioHero from "./components/portfolio-hero";
import PortfolioProjects from "./components/portfolio-projects";
import PortfolioWhy from "./components/portfolio-why";

export default function Portfolio() {
  return (
    <>
      <PortfolioHero />
      <PortfolioAboutMe />
      <PortfolioWhy />
      <PortfolioProjects />
    </>
  );
}

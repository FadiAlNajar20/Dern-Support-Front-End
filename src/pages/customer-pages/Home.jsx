import Hero from "../../components/home-page-components/Hero";
import Services from "../../components/home-page-components/Services";
import ExplainList from "../../components/Explain/ExplainList";
import FAQ from "../../components/home-page-components/FAQ";
import Articles from "../../components/home-page-components/Articles";
import WhoWeAreSection from "../../components/home-page-components/WhoWeAreSection";
import Stats from "../../components/home-page-components/Stats";
import Testmonials from "../../components/home-page-components/Testmonials";

export default function Home() {
  return (
    <>
      <div className="">
        <Hero />
        <Services />
        <Stats />
        <ExplainList />
        <Articles />
        <WhoWeAreSection />
        <Testmonials />
        <FAQ />
      </div>
    </>
  );
}

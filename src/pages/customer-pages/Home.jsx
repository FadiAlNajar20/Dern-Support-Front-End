import React, { useState, useEffect } from "react";
import Hero from "../../components/home-page-components/Hero";
import Services from "../../components/home-page-components/Services";
import ExplainList from "../../components/Explain/ExplainList";
// import Products from "../components/Products";

import FAQ from "../../components/home-page-components/FAQ";
// import FAQ from "../../components/FAQ";
import Articles from "../../components/home-page-components/Articles";
import ExplainListv2 from "../../components/Explain/ExplainListv2";
import Loading from "../../components/Loading";
import WhoWeAreSection from "../../components/home-page-components/WhoWeAreSection";
import Stats from "../../components/home-page-components/Stats";
import Testmonials from "../../components/home-page-components/Testmonials";

export default function Home() {
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <>
      <div className="">
        <Hero />
        <Services />
        <Stats />
        <ExplainList />
        {/* <Products /> */}
        <WhoWeAreSection />
        <Articles />
        <Testmonials />
        {/* <ExplainListv2 /> */}
        <FAQ />
      </div>
    </>
  );
}

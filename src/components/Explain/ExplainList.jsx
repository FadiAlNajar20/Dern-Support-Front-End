import React from "react";
import Explain from "./Explain";
import image1 from "../../assets/banner/3.jpg";
import image2 from "../../assets/banner/1.jpg";
import Seperator from "../home-page-components/Seperator";

const ExplainList = () => {
  return (
    <div className="container mx-auto px-4 ">
      <Seperator
        heading="Our Services"
        text="Expert support for both hardware repairs and software installations—keeping your systems running smoothly and efficiently."
      />

      <div className="flex flex-col md:flex-row lg:flex-wrap gap-12 -mt-32">
        <Explain
          id="1"
          title="Hardware Issues "
          text="Dern-Support is an IT technical support company that repairs computer systems for businesses and individual customers. Our skilled technicians handle a wide range of issues, including hardware repairs, software troubleshooting, and system optimization. Whether it's a malfunctioning printer, a slow computer, or Wi-Fi connectivity problems, we've got you covered."
          image={image1}
        />
        <Explain
          id="2"
          title="Software Issues "
          text="At Dern-Support, we provide comprehensive support for printers, computers, and Wi-Fi networks. Our services include diagnosing and fixing hardware issues, setting up and configuring software, and ensuring seamless connectivity. We pride ourselves on efficient problem-solving and personalized assistance."
          image={image2}
        />
      </div>
    </div>
  );
};

export default ExplainList;

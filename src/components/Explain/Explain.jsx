import React from "react";

const Explain = ({ id, title, text, image }) => {
  return (
    <div className="container mx-auto my-12 p-5">
      <div
        className={`flex flex-col-reverse justify-center items-center lg:gap-8 bg-gray-50 rounded shadow-md ${
          id === "2" ? "lg:flex-row" : "lg:flex-row-reverse"
        }`}
      >
        <div className="lg:w-1/2 lg:order-1 flex flex-col justify-center items-center lg:items-start lg:px-0">
          <h2 className="pl-5 pr-5 pt-5 text-2xl sm:text-3xl lg:text-4xl font-bold text-sky-600 mb-6">
            {title}
          </h2>

          <p className="p-8 text-left text-sm sm:text-base lg:text-lg leading-loose tracking-[1px]">
            {text}
          </p>
        </div>
        <div className="lg:w-1/2 lg:order-2">
          <img
            src={image}
            alt="Network Security"
            className="w-full h-auto rounded-lg shadow-lg object-cover aspect-video"
          />
        </div>
      </div>
    </div>
  );
};

export default Explain;

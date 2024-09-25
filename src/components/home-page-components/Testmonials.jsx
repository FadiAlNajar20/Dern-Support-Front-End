import "../../CSS/Testmonials.css";
import { useState } from "react";
import Seperator from "./Seperator";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [clickedImageIndex, setClickedImageIndex] = useState(null);

  const testimonials = [
    {
      name: "Mohammad Al-Badr",
      quote:
        "Dern Support keeps our systems running smoothly with quick, reliable service. Their expertise has minimized our downtime, and we couldn't be happier.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNiW7-hOJPXZpMWaMepX0yFGLHG7myAzzpgQ&usqp=CAU",
    },
    {
      name: "Ali Al-Ahmad",
      quote:
        "The team at Dern Support is outstanding! Their professional and expert service keeps our IT infrastructure in top shape.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbSg1BDA7rkzQpJ0NE5yPW6l4CVaRuElBXuQ&usqp=CAU",
    },
    {
      name: "Sara Al-Khatib",
      quote:
        "As a small business owner, Dern Support has been a lifesaver. They fix any issue quickly and efficiently, allowing me to focus on my business.",
      image:
        "https://t4.ftcdn.net/jpg/03/57/24/13/240_F_357241363_lJ8LcvKQ43OI1a94LCgIbNvwy6LkjN6K.jpg",
    },
  ];

  const handleIndicatorClick = (index) => {
    setActiveIndex(index);
    setClickedImageIndex(index);
  };

  return (
    <>
      <Seperator
        heading="Testmonials"
        text="Hear from our satisfied customers who trust us for their computer repair and support needs."
      />
      <section
        className="mb-20 testimonials text-center relative py-[100px] bg-cover bg-center bg-no-repeat text-white"
        style={{ backgroundImage: "url(../img/testbcg.jpg)" }}
      >
        <div className="absolute inset-0 bg-indigo-500 opacity-70"></div>
        <div className="container mx-auto relative">
          <div className="flex flex-wrap justify-center">
            <div className="w-full">
              <div id="quote-carousel" className="relative">
                <ol className="flex justify-center items-center mb-4">
                  {testimonials.map((testimonial, index) => (
                    <li
                      key={index}
                      className={`w-[90px] h-[90px] cursor-pointer border-2 border-gray-300 rounded-full overflow-hidden transition-opacity ease-in ${
                        activeIndex === index
                          ? "opacity-100 scale-105 border-sky-400"
                          : "opacity-50"
                      }`}
                      onClick={() => handleIndicatorClick(index)}
                    >
                      <img
                        className={`grayscale ${
                          activeIndex === index ? "grayscale-0" : ""
                        } transition-all ${
                          clickedImageIndex === index ? "scale-110" : ""
                        }`}
                        src={testimonial.image}
                        alt={testimonial.name}
                      />
                    </li>
                  ))}
                </ol>
                <div className="text-center space-y-8">
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className={`${
                        activeIndex === index ? "block" : "hidden"
                      }`}
                    >
                      <div className="max-w-3xl mx-auto relative">
                        <h4 className="bg-sky-400 text-sm p-2 rounded-md mx-auto absolute inset-x-0 top-[-20px] w-48 font-bold">
                          {testimonial.name}
                        </h4>
                        <blockquote className="border-2 border-white p-12 mt-20">
                          <p className="">{testimonial.quote}</p>
                        </blockquote>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

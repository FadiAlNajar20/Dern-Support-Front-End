import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";

export default function CustomCards() {
  return (
    <div className="">
      <>
        <div className="flex items-center justify-center mb-10">
          <div className="relative inline-block mt-10">
            <span className="text-xl md:text-3xl font-bold text-black">
              Featured Services
            </span>
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-600 rounded-full" />
          </div>
        </div>
        <section className="p-4 md:p-8">
          <div className="mx-auto max-w-5xl mb-20">
            <Link
              to="#about"
              heading="About"
              subheading="Learn what we do here"
              imgSrc="https://www.shutterstock.com/image-photo/service-support-customer-help-call-260nw-2512015909.jpg"
            />
            <Link
              to="#clients"
              heading="Clients"
              subheading="We work with great people"
              imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgL1QOp1fsFsmG8YwwEG_ZYoA04UIFaKQpMA&s"
            />
            <Link
              to="#services"
              heading="Our Service"
              subheading="Our work speaks for itself"
              imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAcdCX4UjYeWrjGSUBG25uzJjNcdSjR0SbqA&s"
            />
          </div>
        </section>
      </>
    </div>
  );
}

const Link = ({ heading, imgSrc, subheading, href }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b-2 border-neutral-700 py-4 transition-colors duration-500 hover:border-neutral-50 md:py-8"
    >
      <div>
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -16 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.075,
            delayChildren: 0.25,
          }}
          className="relative z-10 block text-2xl font-bold text-black transition-colors duration-500 group-hover:text-black md:text-3xl"
        >
          {heading.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 16 },
              }}
              transition={{ type: "spring" }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </motion.span>
        <span className="relative z-10 mt-2 block text-base text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50 bg-[#e5e5e5]">
          {subheading}
        </span>
      </div>

      <motion.img
        style={{
          top,
          left,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={{
          initial: { scale: 0, rotate: "-12.5deg" },
          whileHover: { scale: 1, rotate: "12.5deg" },
        }}
        transition={{ type: "spring" }}
        src={imgSrc}
        className="absolute z-0 h-24 w-32 rounded-lg object-cover md:h-48 md:w-64 bg-[#e5e5e5]"
        alt={`Image representing a link for ${heading}`}
      />

      <motion.div
        variants={{
          initial: {
            x: "25%",
            opacity: 0,
          },
          whileHover: {
            x: "0%",
            opacity: 1,
          },
        }}
        transition={{ type: "spring" }}
        className="relative z-10 p-4"
      >
        <FiArrowRight className="text-5xl text-neutral-50 bg-[#e5e5e5]" />
      </motion.div>
    </motion.a>
  );
};
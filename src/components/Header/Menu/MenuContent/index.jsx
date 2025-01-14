import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";

import aboutImage from "../../../../../assets/images/menu/aboutImage.webp";
import projectImage from "../../../../../assets/images/menu/projectImage.webp";
import contactImage from "../../../../../assets/images/menu/contactImage.webp";

export default function MenuContent({ onLinkClick }) {
  return (
    <div className="mx-auto max-w-5xl">
      <div onClick={() => onLinkClick()}>
        <Link
          heading="Sobre"
          subheading="Um pouco sobre minha jornada como programador"
          imgSrc={aboutImage}
          alt="Imagem do link de sobre no menu"
          href="#about"
        />
      </div>
      <div onClick={() => onLinkClick()}>
        <Link
          heading="Projetos"
          subheading="Exibindo meus projetos e minha paixão por desenvolvimento"
          imgSrc={projectImage}
          alt="Imagem do link de projetos no menu"
          href="#project"
        />
      </div>
      <div onClick={() => onLinkClick()}>
        <Link
          heading="Contatos"
          subheading="Conecte-se comigo"
          imgSrc={contactImage}
          alt="Imagem do link de sobre no menu"
          href="#contact"
        />
      </div>
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
      className="group relative flex items-center justify-between border-b-2 border-white py-4 transition-colors duration-500 hover:border-neutral-50 md:py-8"
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
          className="relative z-10 block text-4xl font-bold  text-neutral-50 transition-colors duration-500 group-hover:text-neutral-400 md:text-6xl max-[480px]:text-3xl"
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
        <span className="relative z-10 mt-2 block text-base text-neutral-100 transition-colors duration-500 group-hover:text-neutral-400 max-sm:text-sm ">
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
        className="absolute z-0 h-24 w-32 rounded-lg object-cover md:h-48 md:w-64"
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
        <FiArrowRight className="text-5xl text-neutral-300" />
      </motion.div>
    </motion.a>
  );
};

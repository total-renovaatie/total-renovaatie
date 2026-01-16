"use client";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  activeIndex: number;
  title: string;
  services: { text: string }[]; // Array from Payload
}

export default function HomeHeading({ activeIndex, title, services }: Props) {
  // 1. Changed "hero" to "Hero" to match your JSON key
  const currentService = services?.[activeIndex]?.text ?? "";
  return (
    <h1 className="text-center font-sans text-3xl leading-tight font-bold md:text-5xl">
      {title}
      <br />
      {/* Added border-b-4 and min-width to prevent layout jumping */}
      <span className="text-primary border-primary relative inline-block min-w-[320px] font-mono">
        <AnimatePresence mode="wait">
          <motion.span
            key={activeIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="inline-block"
          >
            {/* 2. Access the nested services object using the dot notation */}
            {currentService}
          </motion.span>
        </AnimatePresence>
      </span>
    </h1>
  );
}

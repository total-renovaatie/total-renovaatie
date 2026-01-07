"use client";
import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Whatsapp from "./icons/whatsapp";
import { Button } from "./ui/button";

export default function FloatingActions() {
  const [isFooterInView, setIsFooterInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Updates state based on whether the contact-section is visible
        setIsFooterInView(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when 10% of the footer is visible
        rootMargin: "0px 0px -50px 0px", // Slight offset to hide just before impact
      },
    );

    const contactSection = document.getElementById("contact");
    if (contactSection) observer.observe(contactSection);

    return () => {
      if (contactSection) observer.unobserve(contactSection);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isFooterInView && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed right-6 bottom-6 z-40 flex flex-col gap-3 lg:hidden"
        >
          <Button
            size="icon"
            className="shadow-primary/40 h-14 w-14 rounded-full shadow-2xl"
            asChild
          >
            <a href="mailto:contact@example.com">
              <Mail className="h-6 w-6" />
            </a>
          </Button>

          <Button
            size="icon"
            variant="outline"
            className="bg-secondary h-14 w-14 rounded-full border-2 shadow-xl"
            asChild
          >
            <a href="https://wa.me/32473260030">
              <Whatsapp className="text-background h-7 w-7 fill-white text-2xl" />
            </a>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

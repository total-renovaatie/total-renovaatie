"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "~/i18n/routing";
import { useTranslations } from "next-intl";
import { Mail, X, Menu } from "lucide-react";
import { Button } from "./ui/button";
import Whatsapp from "./icons/whatsapp";
import LanguageSwitcher from "./language-switcher";

interface MobileMenuProps {
  navItems: string[];
}

export default function MobileMenu({ navItems }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Navbar");

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const menuVariants = {
    closed: {
      x: 100,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <>
      {/* TRIGGER BUTTON */}
      <Button
        variant="ghost"
        size="icon"
        className="relative z-110 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* FULL SCREEN OPAQUE OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            // 1. Force solid color (e.g., bg-black or bg-white)
            // 2. Force full screen dimensions (h-screen w-screen)
            // 3. Prevent content overflow (flex-col + overflow-y-auto)
            className="bg-background fixed inset-0 z-[100] flex h-screen w-screen flex-col overflow-y-auto p-8 pt-24 md:hidden"
          >
            {/* WRAPPER TO ENSURE CONTENT FITS & SCROLLS */}
            <div className="flex flex-col md:hidden">
              {/* NAV LINKS */}
              <div className="mb-4 flex items-center justify-between text-white">
                <span className="text-sm font-medium tracking-widest text-slate-400 uppercase">
                  Language
                </span>
                <LanguageSwitcher />
              </div>
              <nav className="flex flex-col gap-6 border-b border-white/10 pb-4">
                {navItems.map((item) => (
                  <motion.div key={item} variants={itemVariants}>
                    <Link
                      href={`#${item}`}
                      onClick={() => setIsOpen(false)}
                      className="hover:text-primary text-4xl font-bold tracking-tight"
                    >
                      {t(item)}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* BOTTOM SECTION (CTAs) */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-4 pt-10 pb-10"
              >
                <Button
                  asChild
                  className="bg-primary justify-between rounded-2xl py-7 text-lg text-white"
                >
                  <a href="mailto:contact@example.com">
                    {t("email_us")}
                    <Mail size={20} />
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="bg-secondary justify-between rounded-2xl border-2 border-white/20 py-7 text-lg text-white"
                >
                  <a href="https://wa.me/32473260030">
                    WhatsApp
                    <Whatsapp className="h-6 w-6 fill-current" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

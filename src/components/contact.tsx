"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { LegalModal } from "./legal-modal";

export default function Contact() {
  const t = useTranslations("Contact");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full" id="contact">
      {/* MAIN CONTACT BLUE BOX */}
      <div className="mx-6 mb-6 overflow-hidden rounded-[2.5rem] bg-[#43749B] py-24 md:mx-12 md:py-32">
        <div className="container mx-auto flex flex-col items-center px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 max-w-3xl text-4xl font-bold tracking-tight text-white md:text-6xl"
          >
            {t("title")}
          </motion.h2>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            {/* Email Button */}
            <Link
              href="mailto:hello@yourcompany.com"
              className="flex items-center gap-3 rounded-full bg-white px-8 py-4 font-medium text-[#43749B] transition-transform hover:scale-105 active:scale-95"
            >
              <Mail size={20} />
              {t("email")}
            </Link>

            {/* WhatsApp Button */}
            <Link
              href="https://wa.me/32473200030"
              target="_blank"
              className="flex items-center gap-3 rounded-full bg-[#51B14E] px-8 py-4 font-medium text-white transition-transform hover:scale-105 active:scale-95"
            >
              <MessageCircle size={20} />
              {t("whatsapp")}
            </Link>
          </div>
        </div>
      </div>

      {/* LEGAL FOOTER */}
      <div className="px-6 pb-12 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-6 border-t border-slate-200 pt-8 md:flex-row">
            <p className="text-sm text-slate-500">
              © {currentYear} Total Renovaatie. {t("legal.rights")}
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-600">
              <LegalModal triggerText={t("legal.privacy")} />
              <LegalModal triggerText={t("legal.terms")} />
              <LegalModal triggerText={t("legal.cookies")} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

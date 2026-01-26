"use client";
import { motion } from "framer-motion";
import {
  Mail,
  MessageCircle,
  Building2,
  Phone,
  Landmark,
  Hash,
} from "lucide-react";
import Link from "next/link";
import { LegalModal } from "./legal-modal";
import type { SiteSetting } from "~/payload-types";

export default function Contact({
  settings,
  locale,
}: {
  settings: SiteSetting;
  locale: string;
}) {
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
            {settings.contactSectionTitle}
          </motion.h2>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            {/* Email Button */}
            <Link
              href="mailto:Info@comfort-home.pro"
              className="flex items-center gap-3 rounded-full bg-white px-8 py-4 font-medium text-[#43749B] shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              <Mail size={20} />
              {settings.emailButtonText}
            </Link>

            {/* WhatsApp Button */}
            <Link
              href="https://wa.me/32473200030?text=Hello, I am interested in your services."
              target="_blank"
              className="flex items-center gap-3 rounded-full bg-[#51B14E] px-8 py-4 font-medium text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              <MessageCircle size={20} />
              {settings.whatsappButtonText}
            </Link>
          </div>
        </div>
      </div>

      {/* PARENT COMPANY & LEGAL FOOTER */}
      <div className="px-6 pb-12 md:px-12">
        <div className="mx-auto max-w-7xl">
          {/* HARD-CODED PARENT COMPANY INFO BOX */}
          <div className="mb-12 grid grid-cols-1 gap-8 rounded-3xl border border-slate-100 bg-slate-50/50 p-8 md:grid-cols-3">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#003358] uppercase">
                <Building2 size={16} className="text-[#f37021]" />
                Headquarters
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Bevatix bv</h4>
                <p className="text-sm leading-relaxed text-slate-500">
                  St-Theresiastraat, 7 bus 5/01
                  <br />
                  8430 Middelkerke, Belgium
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#003358] uppercase">
                <Hash size={16} className="text-[#f37021]" />
                Administrative
              </div>
              <div className="space-y-2">
                <p className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="font-semibold text-slate-400">BTW:</span>{" "}
                  BE-0860.057.131
                </p>
                <Link
                  href="tel:+32473260030"
                  className="flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-[#f37021]"
                >
                  <Phone size={14} className="text-slate-400" /> +32 473 26 00
                  30
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#003358] uppercase">
                <Landmark size={16} className="text-[#f37021]" />
                Banking (Crelan)
              </div>
              <p className="rounded-lg border border-slate-100 bg-white p-3 font-mono text-sm break-all text-slate-600">
                BE35 8508 1963 4537
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-6 border-t border-slate-200 pt-8 md:flex-row">
            <p className="text-sm text-slate-500">
              © {currentYear} {settings.address} | Member of Bevatix Group
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-600">
              <LegalModal settings={settings} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

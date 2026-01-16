"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import LogoImage from "../../public/logo.png";
import { useLivePreview } from "@payloadcms/live-preview-react";
import type { SiteSetting } from "~/payload-types";
export default function AboutSection({
  initialData,
}: {
  initialData: SiteSetting;
}) {
  const t = useTranslations("AboutUs");

  const { data } = useLivePreview({
    initialData,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000",
  });
  return (
    <section id="about" className="px-6 py-24 md:px-12 lg:py-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-5xl leading-[1.1] font-bold tracking-tight md:text-6xl">
            {data?.aboutTitle}
          </h2>

          <div className="space-y-6 text-xl leading-relaxed whitespace-pre-line text-slate-700">
            {data?.aboutDescription}
          </div>
        </motion.div>

        {/* VISUAL ELEMENT (Image or Abstract Architecture) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-square overflow-hidden rounded-2xl shadow-2xl"
        >
          {/* Replace with your high-end interior or renovation photo */}
          <div className="absolute inset-0 bg-linear-to-tr from-black/20 to-transparent" />
          <Image
            src={LogoImage}
            alt="Luxury Renovation"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}

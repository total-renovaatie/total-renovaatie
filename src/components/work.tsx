"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { MasonryPhotoAlbum } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import { motion } from "framer-motion";

// Plugins & CSS
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "react-photo-album/masonry.css";
import "yet-another-react-lightbox/styles.css";

import NextJsImage from "./next-image";
import { MOCK_PROJECTS } from "~/lib/utils";
import type { CategoryWithServices } from "~/server/db/types";

export default function PhotoGallery({
  data,
  locale,
}: {
  data: CategoryWithServices[];
  locale: string;
}) {
  const categorySlugs = data.map((cat) => cat.slug);
  console.log("slugs", categorySlugs);
  const t = useTranslations("Work");
  const [index, setIndex] = useState(-1);
  const [filter, setFilter] = useState("structural"); // Default to first category

  // The grid and slideshow will now always stay synced to the filtered list
  const filteredPhotos = MOCK_PROJECTS.filter(
    (p) => p.category?.toLowerCase() === filter,
  );

  return (
    <section id="work" className="w-full px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* HEADER SECTION (Right Aligned) */}
        <div className="mb-16 flex flex-col items-end text-right">
          <h2 className="text-6xl font-bold tracking-tight md:text-8xl">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-slate-500">
            {t("description")}
          </p>
        </div>

        {/* CONTROLS */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* VIEW ALL: Now opens the lightbox for the current category */}
          <button
            onClick={() => setIndex(0)}
            className="order-4 rounded-full border border-slate-300 px-8 py-2 text-sm font-medium transition-colors hover:bg-black hover:text-white md:order-1"
          >
            {t("viewAll")}
          </button>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3">
            {/* Map over the full data objects from the DB */}
            {data.map((category) => {
              const key = category.slug;

              // 1. Get the localized label from the DB object
              const displayLabel =
                locale === "fr"
                  ? category.nameFr
                  : locale === "nl"
                    ? category.nameNl
                    : category.nameEn;

              return (
                <button
                  key={category.id} // Use the DB ID for the key
                  onClick={() => setFilter(key)}
                  className={`relative rounded-full px-6 py-2 text-sm font-medium transition-all ${
                    filter === key
                      ? "text-white"
                      : "border border-slate-300 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {filter === key && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 z-0 rounded-full bg-[#4A789C]"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  {/* 2. Show the label from the DB instead of the t() function */}
                  <span className="relative z-10">{displayLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* GALLERY (Shows filtered photos) */}
        <MasonryPhotoAlbum
          photos={filteredPhotos}
          render={{ image: NextJsImage }}
          onClick={({ index }) => setIndex(index)}
          columns={(w) => (w < 640 ? 2 : w < 1024 ? 3 : 4)}
          spacing={24}
        />

        {/* LIGHTBOX (Slideshow mode for filtered photos) */}
        <Lightbox
          slides={filteredPhotos}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          plugins={[Fullscreen, Slideshow, Zoom]}
          // Enable auto-play when opened via "View All" if desired
          slideshow={{ autoplay: false, delay: 3000 }}
        />
      </div>
    </section>
  );
}

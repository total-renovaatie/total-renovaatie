"use client";
import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { MasonryPhotoAlbum } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import { motion } from "framer-motion";

// Plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

// Styles
import "react-photo-album/masonry.css";
import "yet-another-react-lightbox/styles.css";

import NextJsImage from "./next-image";
import type { Category, WorkImage, Media } from "~/payload-types";
import type { SiteSetting } from "~/payload-types";

// Define the shape for the gallery
interface GalleryPhoto {
  src: string;
  width: number;
  height: number;
  categorySlug: string;
  isFavorite: boolean;
  alt: string;
}

export default function PhotoGallery({
  categories,
  workImages,
  locale,
  settings,
}: {
  categories: Category[];
  workImages: WorkImage[];
  locale: string;
  settings: SiteSetting;
}) {
  const t = useTranslations("Work");
  const [index, setIndex] = useState(-1);
  const [filter, setFilter] = useState(categories[0]?.slug ?? "structural");

  // 1. Transform Payload data to Gallery format
  // 1. Transform Payload data to Gallery format
  const allPhotos = useMemo(() => {
    const mapped = workImages.map((img): GalleryPhoto => {
      const media = img.image as Media;

      // Access real dimensions from the Media object
      const width = media?.width ?? 1080;
      const height = media?.height ?? 1080;
      const category = img.category as Category;
      const slug =
        typeof category === "object" ? category?.slug : "NO_SLUG_FOUND";

      // Log one sample to see what's happening
      console.log("Image:", img.id, "Slug:", slug);

      return {
        src: media?.url ?? "",
        width,
        height,
        // Safely access the slug for filtering
        categorySlug: typeof category === "object" ? category.slug : "",
        isFavorite: !!img.isFavorite,
        alt: media?.alt ?? "Project Gallery Image",
      };
    });
    return mapped;
  }, [workImages]);

  // 2. Filter logic (Same as Services component)
  const filteredPhotos = useMemo(
    () => allPhotos.filter((p) => p.categorySlug === filter),
    [allPhotos, filter],
  );

  // 3. Display only favorites in the grid, or a subset
  const gridPhotos = useMemo(() => {
    // If filteredPhotos only has 1 item, slice(0, 15) will still show that 1 item.
    return filteredPhotos.slice(0, 50);
  }, [filteredPhotos]);

  return (
    <section id="work" className="w-full px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* HEADER SECTION - Matches Services Style */}
        <div className="mb-16 flex flex-col items-end text-right">
          <h2 className="text-6xl font-bold tracking-tight text-slate-900 md:text-8xl">
            {settings.workTitle} {/* 👈 Changed */}
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-slate-500 italic">
            {settings.workDescription} {/* 👈 Changed */}
          </p>
        </div>

        {/* NAVIGATION DOCK - Matches Services Navigation */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <button
            onClick={() => setIndex(0)}
            className="group flex items-center gap-2 rounded-full border border-slate-300 px-8 py-3 text-sm font-medium transition-all hover:bg-black hover:text-white"
          >
            {t("viewAll")}
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>

          <div className="flex flex-wrap gap-2 rounded-full border border-black/5 bg-slate-50/50 p-1.5 backdrop-blur-sm">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.slug)}
                className={`relative rounded-full px-6 py-2 text-sm font-medium transition-all ${
                  filter === category.slug
                    ? "text-white"
                    : "text-slate-600 hover:text-black"
                }`}
              >
                {filter === category.slug && (
                  <motion.div
                    layoutId="activeWorkTab"
                    className="bg-primary absolute inset-0 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* MASONRY ALBUM */}
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <MasonryPhotoAlbum
            photos={gridPhotos}
            render={{ image: NextJsImage }}
            onClick={({ index }) => setIndex(index)}
            columns={(w) => (w < 640 ? 2 : w < 1024 ? 3 : 4)}
            spacing={20}
          />
        </motion.div>

        {/* LIGHTBOX */}
        <Lightbox
          slides={filteredPhotos}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          plugins={[Fullscreen, Slideshow, Zoom]}
        />
      </div>
    </section>
  );
}

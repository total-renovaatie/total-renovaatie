"use client";
import { useState, useMemo } from "react";
import { MasonryPhotoAlbum } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import { motion } from "framer-motion";

// Plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"; // 1. Import Thumbnails

// Styles
import "react-photo-album/masonry.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css"; // 2. Import Thumbnail CSS

import NextJsImage from "./next-image";
import type { Category, WorkImage, Media } from "~/payload-types";
import type { SiteSetting } from "~/payload-types";

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
  const [index, setIndex] = useState(-1);
  const [filter, setFilter] = useState(categories[0]?.slug);

  // 3. New State: Decide if Lightbox shows "filtered" list or "all" list
  const [lightboxMode, setLightboxMode] = useState<"filtered" | "all">(
    "filtered",
  );

  // --- DATA PREPARATION ---

  // A. Format all photos from Payload
  const allPhotos = useMemo(() => {
    return workImages.map((img): GalleryPhoto => {
      const media = img.image as Media;
      return {
        src: media?.url ?? "",
        width: media?.width ?? 1080,
        height: media?.height ?? 1080,
        categorySlug: typeof img.category === "object" ? img.category.slug : "",
        isFavorite: !!img.isFavorite,
        alt: media?.alt ?? "Project Gallery Image",
      };
    });
  }, [workImages]);

  // B. "All Photos" List (Sorted: Favorites first, then others)
  // This is what we show when clicking "View All"
  const allPhotosSorted = useMemo(() => {
    const favorites = allPhotos.filter((p) => p.isFavorite);
    const others = allPhotos.filter((p) => !p.isFavorite);
    return [...favorites, ...others];
  }, [allPhotos]);

  // C. "Category" List (Filtered by Tab + Sorted)
  // This is what we show in the Grid and when clicking a Grid image
  const categoryPhotos = useMemo(() => {
    // Filter
    const filtered = allPhotos.filter((p) => p.categorySlug === filter);
    // Sort
    const favorites = filtered.filter((p) => p.isFavorite);
    const others = filtered.filter((p) => !p.isFavorite);
    return [...favorites, ...others];
  }, [allPhotos, filter]);

  // D. Grid Display Items (Limit to 12)
  const gridPhotos = useMemo(() => {
    return categoryPhotos.slice(0, 12);
  }, [categoryPhotos]);

  // E. Determine which list to feed the Lightbox
  const lightboxSlides =
    lightboxMode === "all" ? allPhotosSorted : categoryPhotos;

  return (
    <section id="work" className="w-full px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-16 flex flex-col items-end text-right">
          <h2 className="text-6xl font-bold tracking-tight text-slate-900 md:text-8xl">
            {settings.workTitle}
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-slate-500 italic">
            {settings.workDescription}
          </p>
        </div>

        {/* NAVIGATION */}
        <div className="mb-12 flex flex-col gap-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* VIEW ALL BUTTON */}
            <button
              onClick={() => {
                setLightboxMode("all"); // Switch Lightbox to "Show Everything" mode
                setIndex(0); // Open Lightbox immediately
              }}
              className="group flex w-fit items-center gap-2 rounded-full border border-slate-300 px-8 py-3 text-sm font-medium transition-all hover:bg-black hover:text-white"
            >
              {settings.viewAllText}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>

            {/* CATEGORY TABS */}
            <div className="relative max-w-full">
              <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-2 transition-all md:pb-0">
                <div className="flex gap-2 rounded-full border border-black/5 bg-slate-50/50 p-1.5 backdrop-blur-sm">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setFilter(category.slug)}
                      className={`relative shrink-0 rounded-full px-6 py-2 text-sm font-medium whitespace-nowrap transition-all ${
                        filter === category.slug
                          ? "text-white"
                          : "text-slate-600 hover:text-black"
                      }`}
                    >
                      {filter === category.slug && (
                        <motion.div
                          layoutId="activeWorkTab"
                          className="bg-primary absolute inset-0 rounded-full"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                      <span className="relative z-10">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GRID (Always shows Category Favorites) */}
        <motion.div
          layout
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <MasonryPhotoAlbum
            photos={gridPhotos}
            render={{ image: NextJsImage }}
            onClick={({ index }) => {
              setLightboxMode("filtered"); // Switch Lightbox to "Category Only" mode
              setIndex(index);
            }}
            columns={(w) => (w < 640 ? 2 : w < 1024 ? 3 : 4)}
            spacing={20}
          />
        </motion.div>

        {/* LIGHTBOX */}
        <Lightbox
          slides={lightboxSlides}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          // 4. Added Thumbnails to plugins
          plugins={[Fullscreen, Slideshow, Zoom, Thumbnails]}
        />
      </div>
    </section>
  );
}

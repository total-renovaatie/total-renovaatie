"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import MorphingIcon from "./morphing-icon";
import type { SiteSetting } from "~/payload-types";

export default function ImageGrid({
  activeIndex,
  heroImages,
}: {
  activeIndex: number;
  heroImages: SiteSetting["heroImages"];
}) {
  console.log("these are the hero images", heroImages);

  if (!heroImages || heroImages.length === 0) return null;

  return (
    <div className="mx-auto mt-16 w-full max-w-7xl px-4">
      <div className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:gap-8">
        {/* LEFT GROUP */}
        <div className="grid w-full grid-cols-3 items-center gap-2 md:w-[70%] md:gap-4 lg:w-[45%]">
          {heroImages.slice(0, 3).map((img, index) => (
            <ImageCard
              key={img.id}
              item={img} // Fixed: Passing as 'item' to match the component below
              id={index} // Fixed: Passing index so 'isRevealed' works
              activeIndex={activeIndex}
            />
          ))}
        </div>

        {/* CENTER ICON */}
        <div className="flex shrink-0 items-center justify-center py-4 md:py-0">
          <MorphingIcon activeIndex={activeIndex} />
        </div>

        {/* RIGHT GROUP */}
        <div className="grid w-full grid-cols-3 items-center gap-2 md:w-[70%] md:gap-4 lg:w-[45%]">
          {heroImages.slice(3, 6).map((img, index) => (
            <ImageCard
              key={img.id}
              item={img} // Fixed: Passing as 'item'
              id={index + 3} // Fixed: Offset by 3 for the right side logic
              activeIndex={activeIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ImageCard({
  item,
  id,
  activeIndex,
}: {
  item: any;
  id: number;
  activeIndex: number;
}) {
  // This logic works now because 'id' is no longer undefined
  const isRevealed = activeIndex >= id;

  const relativeUrl = item?.image?.url;

  const src = relativeUrl
    ? relativeUrl.startsWith("http")
      ? relativeUrl
      : `http://localhost:3000${relativeUrl}`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: isRevealed ? 1 : 0,
        y: isRevealed ? 0 : 10,
        scale: isRevealed ? 1 : 0.95,
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-xl bg-slate-200 shadow-xl ${item?.aspect ?? "aspect-square"}`}
    >
      {src ? (
        <Image
          src={src}
          alt={item?.image?.alt || "Project detail"}
          fill
          unoptimized
          className="object-cover"
          sizes="(max-width: 768px) 33vw, 20vw"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-slate-300">
          <span className="text-[10px] text-slate-500">Image Missing</span>
        </div>
      )}
    </motion.div>
  );
}

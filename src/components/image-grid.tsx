"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import MorphingIcon from "./morphing-icon";
interface ProjectImage {
  src: string;
  aspect: string;
  id: number;
}

interface ImageCardProps {
  img: ProjectImage;
  activeIndex: number;
}
export default function ImageGrid({ activeIndex }: { activeIndex: number }) {
  const images = [
    { src: "/1.jpg", aspect: "aspect-[2/3]", id: 0 },
    { src: "/3.jpg", aspect: "aspect-[3/4]", id: 1 },
    { src: "/2.jpg", aspect: "aspect-square", id: 2 },
    { src: "/5.jpg", aspect: "aspect-square", id: 3 },
    { src: "/4.jpg", aspect: "aspect-[3/4]", id: 4 },
    { src: "/6.jpg", aspect: "aspect-[2/3]", id: 5 },
  ];

  return (
    <div className="mx-auto mt-16 w-full max-w-7xl px-4">
      <div className="flex flex-col items-center justify-center gap-4 md:flex-row lg:gap-8">
        {/* LEFT GROUP */}
        <div className="grid w-full grid-cols-3 items-center gap-2 md:w-[45%] md:gap-4">
          {images.slice(0, 3).map((img) => (
            <ImageCard key={img.id} img={img} activeIndex={activeIndex} />
          ))}
        </div>

        {/* CENTER ICON - Always visible or synced with first image */}
        <div className="flex shrink-0 items-center justify-center py-4 md:py-0">
          <MorphingIcon activeIndex={activeIndex} />
        </div>

        {/* RIGHT GROUP */}
        <div className="grid w-full grid-cols-3 items-center gap-2 md:w-[45%] md:gap-4">
          {images.slice(3, 6).map((img) => (
            <ImageCard key={img.id} img={img} activeIndex={activeIndex} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ImageCard({ img, activeIndex }: ImageCardProps) {
  const isRevealed = activeIndex >= img.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: isRevealed ? 1 : 0,
        y: isRevealed ? 0 : 10,
        scale: isRevealed ? 1 : 0.95,
      }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
      // We use a template literal and ensure aspect is treated as a string
      className={`relative overflow-hidden rounded-xl shadow-xl ${img.aspect ?? ""}`}
    >
      <Image
        src={img.src}
        alt="Project detail"
        fill
        // priority helps with Largest Contentful Paint for the first images
        priority={img.id <= 1}
        className="object-cover"
        sizes="(max-width: 768px) 33vw, 20vw"
      />
    </motion.div>
  );
}

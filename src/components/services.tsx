"use client";

import { useTranslations } from "next-intl";
import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useSpring,
  useMotionValue,
} from "framer-motion";
import * as LucideIcons from "lucide-react";
import Image from "next/image";
import type { SiteSetting } from "~/payload-types";

export default function ServicesSection({
  data,
  locale,
  settings,
}: {
  data: CategoryWithServices[];
  locale: string;
  settings: SiteSetting;
}) {
  const categorySlugs = data.map((cat) => cat.slug);
  const t = useTranslations("Services");

  const [activeTab, setActiveTab] = useState(categorySlugs[0] ?? "structural");
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Mouse Tracking Logic using Motion Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth Spring Physics for the floating image
  const smoothConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const springX = useSpring(mouseX, smoothConfig);
  const springY = useSpring(mouseY, smoothConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    // Set coordinates relative to viewport
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 2. Icon Helper
  const getIcon = (iconName: string) => {
    // Look up the icon by the string name stored in Payload
    // Fallback to 'Home' if the name doesn't match
    const IconComponent = LucideIcons[iconName] ?? LucideIcons.Home;
    return IconComponent;
  };

  // 3. Scroll Tracking Logic for auto-switching tabs
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isMobile) return;
    const index = Math.floor(latest * data.length);
    const safeIndex = Math.min(index, data.length - 1);
    const nextCategory = categorySlugs[safeIndex];

    if (nextCategory && nextCategory !== activeTab) {
      setActiveTab(nextCategory);
    }
  });

  return (
    <div id="services" className="overflow-visible px-6 pt-12 md:px-12 lg:pt-8">
      <div
        ref={containerRef}
        className={`relative mx-auto max-w-7xl py-24`}
        style={{
          // If mobile, use auto height.
          // If desktop, multiply number of categories by 100vh
          minHeight: isMobile ? "auto" : `${data.length * 100}vh`,
        }}
      >
        {/* FLOATING IMAGE (Follows Spring Values) */}
        <AnimatePresence>
          {hoveredImage && !isMobile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="pointer-events-none fixed z-9999 h-80 w-64 overflow-hidden rounded-xl border-4 border-white shadow-2xl"
              style={{
                left: springX,
                top: springY,
                x: "-50%", // Offset from cursor
                y: "-110%",
              }}
            >
              <Image
                src={hoveredImage}
                alt="Service Preview"
                fill
                unoptimized={true} // Bypasses local /api/media/ path issues
                className="object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <section
          onMouseMove={handleMouseMove}
          className={`${
            isMobile
              ? "relative py-12"
              : "sticky top-0 flex min-h-screen flex-col justify-between py-24"
          }`}
        >
          {/* HEADER */}
          <div className="mb-12 flex max-w-4xl flex-col items-center justify-center text-center md:items-start md:justify-start md:text-left">
            <h2 className="text-5xl leading-[1.1] font-bold tracking-tight text-slate-900 md:text-6xl">
              {settings.servicesTitle}
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl text-lg">
              {settings.servicesDescription} {/* 👈 Changed */}{" "}
            </p>
          </div>

          {/* ACTIVE CONTENT */}
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <AnimatePresence mode="wait">
              {(() => {
                const currentCategory = data.find(
                  (cat) => cat.slug === activeTab,
                );
                if (!currentCategory) return null;

                return (
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-5xl"
                  >
                    <h3 className="text-primary mb-12 font-mono text-3xl font-bold tracking-widest uppercase">
                      {currentCategory.name}
                    </h3>

                    <div className="grid grid-cols-1 gap-x-16 gap-y-6 text-left md:grid-cols-2">
                      {currentCategory.services.map((service, index) => {
                        const isLeft = index % 2 === 0;

                        // 1. IMPROVED IMAGE LOGIC
                        // 1. CLEAN VERCEL BLOB LOGIC
                        const serviceImg = service.image;
                        let serviceImageUrl = "";

                        if (
                          typeof serviceImg === "object" &&
                          serviceImg !== null
                        ) {
                          const media = serviceImg; // Cast to any to access Payload Media properties

                          // In Payload 3.0 with Vercel Blob:
                          // If the URL is absolute (https://...), use it directly.
                          // If it's relative (/api/media/...), Next.js handles it or we use the filename.

                          if (media.url) {
                            serviceImageUrl = media.url;
                          } else if (media.filename) {
                            // If you are still seeing /api/media/..., this is a safe fallback
                            serviceImageUrl = `/api/media/file/${media.filename}`;
                          }
                        }

                        return (
                          <div
                            key={service.id}
                            onMouseEnter={() => {
                              if (!isMobile && serviceImageUrl) {
                                setHoveredImage(serviceImageUrl);
                              }
                            }}
                            onMouseLeave={() =>
                              !isMobile && setHoveredImage(null)
                            }
                            className={`group relative cursor-pointer border-b border-black/10 pb-6 transition-all ${
                              isLeft ? "text-left" : "text-left md:text-right"
                            }`}
                          >
                            <span className="relative z-10 block text-2xl font-medium tracking-tighter transition-transform duration-300 group-hover:translate-x-2 md:text-4xl md:group-hover:translate-x-4">
                              {service.title}
                            </span>
                            <div
                              className={`bg-primary absolute bottom-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full ${
                                isLeft
                                  ? "left-0"
                                  : "left-0 md:right-0 md:left-auto"
                              }`}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>

          {/* PILL DOCK NAVIGATION */}
          <div className="mx-auto mt-16 flex w-fit items-center justify-center gap-2 rounded-full border border-black/5 bg-white/80 p-2 shadow-xl backdrop-blur-md">
            {data.map((category) => {
              const IconComponent = getIcon(category.icon || "Home");
              const isActive = activeTab === category.slug;

              return (
                <button
                  key={category.id}
                  onClick={() => {
                    if (isMobile) {
                      // On mobile, just switch the content immediately
                      setActiveTab(category.slug);
                    } else {
                      // On desktop, keep the smooth scroll logic
                      const index = categorySlugs.indexOf(category.slug);
                      const scrollPos = index * window.innerHeight;
                      window.scrollTo({
                        top: containerRef.current!.offsetTop + scrollPos,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="relative flex items-center justify-center rounded-full p-4 transition-all"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeServiceTab"
                      className="bg-primary absolute inset-0 rounded-full"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <div
                    className={`relative z-10 transition-colors duration-300 ${isActive ? "text-white" : "text-slate-400"}`}
                  >
                    <IconComponent size={22} />
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

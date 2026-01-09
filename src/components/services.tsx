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
import {
  Boxes,
  Hammer,
  Home,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import type { CategoryWithServices, Service } from "~/server/db/types";

const ICON_MAP: Record<string, LucideIcon> = {
  structural: Home,
  interior: LayoutDashboard,
  smart: Boxes,
  landscaping: Hammer,
};

export default function ServicesSection({
  data,
  locale,
}: {
  data: CategoryWithServices[];
  locale: string;
}) {
  const categorySlugs = data.map((cat) => cat.slug);

  // 2. Updated Icon Map (Fallback to Home if slug doesn't match)
  const getIcon = (slug: string) => {
    const map: Record<string, LucideIcon> = {
      structural: Home,
      finishing: LayoutDashboard,
      technical: Boxes,
      outdoor: Hammer,
    };
    return map[slug] ?? Home;
  };
  const t = useTranslations("Services");
  const [activeTab, setActiveTab] = useState(categorySlugs[0] ?? "structural");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse Tracking Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth "Magnetic" Spring Physics
  const smoothConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const springX = useSpring(mouseX, smoothConfig);
  const springY = useSpring(mouseY, smoothConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    // clientX/Y are relative to the viewport, which works perfectly with position: fixed
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll Tracking Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isMobile) return;

    // Use a slight offset (0.05) or use Math.round for a "center-based" switch
    // instead of Math.floor which switches the moment you touch the boundary.
    const index = Math.round(latest * (categorySlugs.length - 1));

    const safeIndex = Math.max(0, Math.min(index, categorySlugs.length - 1));
    const nextCategory = categorySlugs[safeIndex];

    if (nextCategory && nextCategory !== activeTab) {
      setActiveTab(nextCategory);
    }
  });

  return (
    <div id="services" className="px-6 pt-12 md:px-12 lg:pt-8">
      <div
        ref={containerRef}
        className={`relative ${isMobile ? "h-auto" : "min-h-[400vh]"} mx-auto max-w-7xl py-24`}
      >
        {/* 1. FLOATING IMAGE (Fixed to Viewport) */}
        <AnimatePresence>
          {!isMobile && hoveredItem && (
            <motion.div
              key="hover-image"
              style={{
                position: "fixed",
                left: 0,
                top: 0,
                x: springX,
                y: springY,
                pointerEvents: "none", // Critical to prevent flickering
                zIndex: 100,
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: 1,
                scale: 1,
                translateX: "10%", // Offset slightly to the right of cursor
                translateY: "-50%", // Center vertically on cursor
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="h-64 w-48 overflow-hidden rounded-xl border-2 border-white/20 bg-gray-200 shadow-2xl"
            >
              <Image
                fill
                priority
                sizes="(max-width: 768px) 100vw, 192px"
                src={`/images/services/${hoveredItem.toLowerCase().replace(/\s+/g, "-")}.jpg`}
                alt="Service Preview"
                className="h-full w-full object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <section
          id="services"
          onMouseMove={handleMouseMove} // Captured on the sticky section
          className={`${
            isMobile
              ? "relative py-12"
              : "sticky top-0 flex min-h-screen flex-col justify-between py-12" // min-h instead of h
          } overflow-hidden`}
        >
          {/* HEADER */}
          <div className="mb-12 flex max-w-4xl flex-col items-center justify-center text-center md:items-start md:justify-start md:text-left">
            <h2 className="text-5xl leading-[1.1] font-bold tracking-tight md:text-6xl">
              {t("title")}
            </h2>
            <p className="text-muted-foreground max-w-xl">{t("description")}</p>
          </div>

          {/* ACTIVE CONTENT */}
          <div className="flex min-h-125 flex-col items-center text-center">
            <AnimatePresence mode="wait">
              {/* 1. Find the current active category from your DB data */}
              {(() => {
                const currentCategory = data.find(
                  (cat) => cat.slug === activeTab,
                );

                // Fallback if data hasn't loaded or slug doesn't match
                if (!currentCategory) return null;

                // Localization helper for Category and Service
                const getLabel = (
                  item: CategoryWithServices | Service,
                ): string => {
                  if (locale === "fr") {
                    // We use a type guard or 'in' check to see if it's a Category or Service
                    return (
                      ("nameFr" in item ? item.nameFr : item.titleFr) ?? ""
                    );
                  }
                  if (locale === "nl") {
                    return (
                      ("nameNl" in item ? item.nameNl : item.titleNl) ?? ""
                    );
                  }
                  // Default to English
                  return ("nameEn" in item ? item.nameEn : item.titleEn) ?? "";
                };

                return (
                  <motion.div
                    key={activeTab}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, layout: { duration: 0.3 } }}
                    className="w-full max-w-5xl"
                  >
                    {/* 2. Dynamic Title from DB */}
                    <h3 className="text-primary mb-6 font-mono text-3xl underline underline-offset-8">
                      {getLabel(currentCategory)}
                    </h3>

                    {/* 3. Description still comes from JSON since it's "Static Marketing Copy" 
              (Optional: You can move this to DB too if you add a description column) */}
                    <p className="mx-auto mb-16 max-w-2xl text-lg">
                      {t(`description`)}
                    </p>

                    {/* 4. SUB-SERVICES GRID - Now mapping through currentCategory.services */}
                    <div className="grid grid-cols-1 gap-x-24 gap-y-8 text-left md:grid-cols-2">
                      {currentCategory.services.map((service, index) => {
                        const isLeft = index % 2 === 0;
                        const displayTitle = getLabel(service);

                        return (
                          <div
                            key={service.id}
                            onMouseEnter={() =>
                              !isMobile && setHoveredItem(displayTitle)
                            }
                            onMouseLeave={() =>
                              !isMobile && setHoveredItem(null)
                            }
                            className={`group relative cursor-pointer border-b border-black/10 pb-4 text-2xl font-medium tracking-tighter transition-colors md:text-4xl ${
                              isLeft ? "text-left" : "text-left md:text-right"
                            } after:bg-primary after:absolute after:bottom-0 after:h-0.5 after:w-0 after:transition-all after:duration-500 after:content-[''] hover:after:w-full ${
                              isLeft
                                ? "after:left-0"
                                : "after:left-0 md:after:right-0 md:after:left-auto"
                            }`}
                          >
                            <span className="inline-block transition-transform duration-300 md:group-hover:translate-x-2">
                              {displayTitle}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>

          {/* 2. PILL SHAPED DOCK (The "Thing at the bottom") */}
          <div className="mx-auto mt-12 flex w-fit items-center justify-center gap-2 rounded-full bg-[#E5E4E0] p-1.5 shadow-inner md:mt-0">
            {data.map((category) => {
              const IconComponent = getIcon(category.slug);
              const isActive = activeTab === category.slug;

              return (
                <button
                  key={category.id}
                  onClick={() => {
                    if (isMobile) {
                      setActiveTab(category.slug);
                    } else {
                      const index = categorySlugs.indexOf(category.slug);
                      const scrollPos = index * window.innerHeight;
                      window.scrollTo({
                        top: containerRef.current!.offsetTop + scrollPos,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="relative flex items-center justify-center rounded-full p-3 transition-all outline-none"
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
                    className={`relative z-10 px-2 transition-colors duration-300 ${isActive ? "text-white" : "text-slate-500"}`}
                  >
                    <IconComponent size={20} strokeWidth={2} />
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

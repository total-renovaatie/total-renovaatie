"use client";
import { useEffect, useState } from "react";
import HomeHeading from "./home-heading";
import ImageGrid from "./image-grid";
import { useLivePreview } from "@payloadcms/live-preview-react";
import type { SiteSetting } from "~/payload-types";

export default function Home({ initialData }: { initialData: SiteSetting }) {
  const { data } = useLivePreview<SiteSetting>({
    initialData,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000",
  });

  const [index, setIndex] = useState(0);
  const services = data?.rotatingServices ?? [];
  const totalItems = services.length > 0 ? services.length : 6;
  useEffect(() => {
    if (index >= totalItems - 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => {
        if (prev >= totalItems - 1) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(timer);
  }, [index, totalItems]);

  return (
    <section id="home" className="mt-8 min-h-screen">
      <HomeHeading
        activeIndex={index}
        title={data?.heroTitle || ""}
        services={services}
      />

      <ImageGrid activeIndex={index} heroImages={data?.heroImages} />
    </section>
  );
}

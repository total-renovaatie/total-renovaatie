import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const MOCK_PROJECTS = [
  {
    src: "https://images.unsplash.com/photo-1600585154526-990dcea4db0d",
    width: 800,
    height: 1200,
    alt: "Modern Kitchen",
    category: "interior",
  }, // Tall
  {
    src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
    width: 1200,
    height: 800,
    alt: "Bathroom Tiles",
  }, // Wide
  {
    src: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f",
    width: 1000,
    height: 1000,
    alt: "Living Space",
  }, // Square
  {
    src: "https://images.unsplash.com/photo-1513694203232-719a280e022f",
    width: 800,
    height: 1100,
    alt: "Woodwork",
  }, // Tall
  {
    src: "https://images.unsplash.com/photo-1620626011761-9963d7521476",
    width: 1200,
    height: 700,
    alt: "Dining Room",
  }, // Wide
  {
    src: "https://images.unsplash.com/photo-1506377247377-2a5b3b0ca3ef",
    width: 900,
    height: 1200,
    alt: "Staircase",
  }, // Tall
  {
    src: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    width: 1200,
    height: 900,
    alt: "Bedroom",
  }, // Standard
  {
    src: "https://images.unsplash.com/photo-1484154218962-a197022b5858",
    width: 1200,
    height: 800,
    alt: "Modern Cabinets",
  },
  {
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    width: 800,
    height: 1000,
    alt: "White Interior",
    category: "structural",
  },
  {
    src: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    width: 1000,
    height: 1300,
    alt: "Attic Reno",
    category: "energy",
  },
  {
    src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    width: 1200,
    height: 750,
    alt: "Floor Detail",
    category: "energy",
  },
  {
    src: "https://images.unsplash.com/photo-1513519247388-4a2645638743",
    width: 800,
    height: 1200,
    alt: "Minimalist Hall",
    category: "structural",
  },
];

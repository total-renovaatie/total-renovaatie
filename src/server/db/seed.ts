import { db } from "./index";
import { categories, services } from "./schema";

async function main() {
  console.log("🌱 Start seeding granular renovation services...");

  // eslint-disable-next-line drizzle/enforce-delete-with-where
  await db.delete(services);

  // eslint-disable-next-line drizzle/enforce-delete-with-where
  await db.delete(categories);

  // 1. Insert Categories
  const [structural, technical, finishing, outdoor] = await db
    .insert(categories)
    .values([
      {
        slug: "structural",
        nameEn: "Structural & Windows",
        nameFr: "Gros-œuvre & Vitrerie",
        nameNl: "Ruwbouw & Glaswerk",
      },
      {
        slug: "technical",
        nameEn: "Technical & HVAC",
        nameFr: "Techniques & Sanitaire",
        nameNl: "Technieken & Sanitair",
      },
      {
        slug: "finishing",
        nameEn: "Interior Finishing",
        nameFr: "Finitions & Décoration",
        nameNl: "Binnenafwerking",
      },
      {
        slug: "outdoor",
        nameEn: "Outdoor Living",
        nameFr: "Aménagement Extérieur",
        nameNl: "Buitenomgeving",
      },
    ])
    .returning();

  console.log("✅ Categories created. Inserting granular services...");

  // 2. Insert Services
  await db.insert(services).values([
    // --- CATEGORY: STRUCTURAL & WINDOWS ---
    {
      categoryId: structural!.id,
      titleEn: "Custom Verandas",
      titleFr: "Vérandas sur mesure",
      titleNl: "Veranda's op maat",
      imageUrl: "https://utfs.io/f/placeholder-veranda.jpg",
    },
    {
      categoryId: structural!.id,
      titleEn: "High-Performance Glazing",
      titleFr: "Vitrage haute performance",
      titleNl: "Hoogrendementsbeglazing",
      imageUrl: "https://utfs.io/f/placeholder-glass.jpg",
    },
    {
      categoryId: structural!.id,
      titleEn: "PVC & Aluminum Windows",
      titleFr: "Fenêtres PVC et Aluminium",
      titleNl: "PVC en Aluminium Ramen",
      imageUrl: "https://utfs.io/f/placeholder-windows.jpg",
    },
    {
      categoryId: structural!.id,
      titleEn: "Entrance Doors",
      titleFr: "Portes d'entrée",
      titleNl: "Voordeuren",
      imageUrl: "https://utfs.io/f/placeholder-doors.jpg",
    },

    // --- CATEGORY: TECHNICAL & HVAC ---
    {
      categoryId: technical!.id,
      titleEn: "Electricity & Domotics",
      titleFr: "Électricité et Domotique", // FOR YOUR BELLS & INTERPHONES
      titleNl: "Elektriciteit en Domotica",
      imageUrl: "https://utfs.io/f/placeholder-domotics.jpg",
    },
    {
      categoryId: technical!.id,
      titleEn: "Heat Pumps & AC",
      titleFr: "Pompes à chaleur et Airco",
      titleNl: "Warmtepompen en Airco",
      imageUrl: "https://utfs.io/f/placeholder-heatpump.jpg",
    },
    {
      categoryId: technical!.id,
      titleEn: "Sanitary Plumbing",
      titleFr: "Sanitaire et Plomberie",
      titleNl: "Sanitair en Loodgieterij",
      imageUrl: "https://utfs.io/f/placeholder-plumbing.jpg",
    },
    {
      categoryId: technical!.id,
      titleEn: "Radiator Systems",
      titleFr: "Chauffage par radiateurs",
      titleNl: "Radiatorverwarming",
      imageUrl: "https://utfs.io/f/placeholder-radiators.jpg",
    },

    // --- CATEGORY: FINISHING ---
    {
      categoryId: finishing!.id,
      titleEn: "Custom Joinery & Closets",
      titleFr: "Menuiserie et Placards", // FOR YOUR ATTIC & UTILITY CABINETS
      titleNl: "Maatwerk en Kasten",
      imageUrl: "https://utfs.io/f/placeholder-joinery.jpg",
    },
    {
      categoryId: finishing!.id,
      titleEn: "Kitchen Installations",
      titleFr: "Installation de cuisine",
      titleNl: "Keukeninstallatie",
      imageUrl: "https://utfs.io/f/placeholder-kitchen.jpg",
    },
    {
      categoryId: finishing!.id,
      titleEn: "Interior Tiling",
      titleFr: "Carrelage intérieur",
      titleNl: "Binnentegels",
      imageUrl: "https://utfs.io/f/placeholder-tiling.jpg",
    },
    {
      categoryId: finishing!.id,
      titleEn: "Professional Painting",
      titleFr: "Peinture professionnelle",
      titleNl: "Professionele Schilderwerken",
      imageUrl: "https://utfs.io/f/placeholder-paint.jpg",
    },
    {
      categoryId: finishing!.id,
      titleEn: "Polished Concrete & Béton Ciré",
      titleFr: "Béton ciré",
      titleNl: "Polierbeton",
      imageUrl: "https://utfs.io/f/placeholder-beton.jpg",
    },
    {
      categoryId: finishing!.id,
      titleEn: "Blinds & Shutters",
      titleFr: "Stores et Volets", // FOR THE "LES GARCONS" SHUTTER
      titleNl: "Gordijnen en Rolluiken",
      imageUrl: "https://utfs.io/f/placeholder-shutters.jpg",
    },
    {
      categoryId: finishing!.id,
      titleEn: "Parquet & Flooring",
      titleFr: "Parquet et Sols",
      titleNl: "Parquet en Vloeren",
      imageUrl: "https://utfs.io/f/placeholder-floor.jpg",
    },

    // --- CATEGORY: OUTDOOR ---
    {
      categoryId: outdoor!.id,
      titleEn: "Wood Terraces",
      titleFr: "Terrasse en bois",
      titleNl: "Houten Terrassen",
      imageUrl: "https://utfs.io/f/placeholder-woodterrace.jpg",
    },
    {
      categoryId: outdoor!.id,
      titleEn: "Stone Paving",
      titleFr: "Pavage et Allées",
      titleNl: "Oprit en Pavage",
      imageUrl: "https://utfs.io/f/placeholder-paving.jpg",
    },
    {
      categoryId: outdoor!.id,
      titleEn: "Concrete Fencing",
      titleFr: "Barrières en béton",
      titleNl: "Betonafsluitingen",
      imageUrl: "https://utfs.io/f/placeholder-concretefence.jpg",
    },
    {
      categoryId: outdoor!.id,
      titleEn: "Exterior Lighting",
      titleFr: "Éclairage extérieur",
      titleNl: "Buitenverlichting",
      imageUrl: "https://utfs.io/f/placeholder-outdoorlight.jpg",
    },
  ]);

  console.log(
    "✅ Seeding finished! Categories and services are aligned with your project photos.",
  );
}

main().catch((e) => {
  console.error("❌ Seeding failed:");
  console.error(e);
  process.exit(1);
});

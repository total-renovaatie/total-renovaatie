import { getPayload } from "payload";
import configPromise from "../../payload.config";
import "dotenv/config";

async function main() {
  process.env.PAYLOAD_MIGRATE = "none";
  const payload = await getPayload({ config: configPromise });

  console.log("🌱 Initializing Seed...");

  // 1. CLEANUP
  await payload.delete({
    collection: "services",
    where: { id: { exists: true } },
  });
  await payload.delete({
    collection: "categories",
    where: { id: { exists: true } },
  });
  await payload.delete({
    collection: "work-images",
    where: { id: { exists: true } },
  });

  // 2. CATEGORIES DATA
  const categoryMap: Record<string, string | number> = {};
  const categoriesToSeed = [
    {
      slug: "structural",
      icon: "Home",
      en: "Structural & Windows",
      fr: "Gros-œuvre & Vitrerie",
      nl: "Ruwbouw & Glaswerk",
    },
    {
      slug: "technical",
      icon: "Boxes",
      en: "Technical & HVAC",
      fr: "Techniques & Sanitaire",
      nl: "Technieken & Sanitair",
    },
    {
      slug: "finishing",
      icon: "LayoutDashboard",
      en: "Interior Finishing",
      fr: "Finitions & Décoration",
      nl: "Binnenafwerking",
    },
    {
      slug: "outdoor",
      icon: "Hammer",
      en: "Outdoor Living",
      fr: "Aménagement Extérieur",
      nl: "Buitenomgeving",
    },
  ];

  for (const cat of categoriesToSeed) {
    const created = await payload.create({
      collection: "categories",
      data: {
        slug: cat.slug,
        name: cat.en,
        icon: cat.icon,
      },
    });

    // Add Translations
    await payload.update({
      collection: "categories",
      id: created.id,
      locale: "fr",
      data: { name: cat.fr },
    });
    await payload.update({
      collection: "categories",
      id: created.id,
      locale: "nl",
      data: { name: cat.nl },
    });

    categoryMap[cat.slug] = created.id;
  }
  console.log("✅ Categories Seeded with Icons");

  // 3. SERVICES DATA
  const servicesToSeed = [
    {
      cat: "structural",
      en: "Custom Verandas",
      fr: "Vérandas sur mesure",
      nl: "Veranda's op maat",
    },
    {
      cat: "structural",
      en: "High-Performance Glazing",
      fr: "Vitrage haute performance",
      nl: "Hoogrendementsbeglazing",
    },
    {
      cat: "structural",
      en: "PVC & Aluminum Windows",
      fr: "Fenêtres PVC et Aluminium",
      nl: "PVC en Aluminium Ramen",
    },
    {
      cat: "structural",
      en: "Entrance Doors",
      fr: "Portes d'entrée",
      nl: "Voordeuren",
    },

    {
      cat: "technical",
      en: "Electricity & Domotics",
      fr: "Électricité et Domotique",
      nl: "Elektriciteit en Domotica",
    },
    {
      cat: "technical",
      en: "Heat Pumps & AC",
      fr: "Pompes à chaleur et Airco",
      nl: "Warmtepompen en Airco",
    },
    {
      cat: "technical",
      en: "Sanitary Plumbing",
      fr: "Sanitaire et Plomberie",
      nl: "Sanitair en Loodgieterij",
    },
    {
      cat: "technical",
      en: "Radiator Systems",
      fr: "Chauffage par radiateurs",
      nl: "Radiatorverwarming",
    },

    {
      cat: "finishing",
      en: "Custom Joinery & Closets",
      fr: "Menuiserie et Placards",
      nl: "Maatwerk en Kasten",
    },
    {
      cat: "finishing",
      en: "Kitchen Installations",
      fr: "Installation de cuisine",
      nl: "Keukeninstallatie",
    },
    {
      cat: "finishing",
      en: "Interior Tiling",
      fr: "Carrelage intérieur",
      nl: "Binnentegels",
    },
    {
      cat: "finishing",
      en: "Professional Painting",
      fr: "Peinture professionnelle",
      nl: "Professionele Schilderwerken",
    },
    {
      cat: "finishing",
      en: "Polished Concrete & Béton Ciré",
      fr: "Béton ciré",
      nl: "Polierbeton",
    },
    {
      cat: "finishing",
      en: "Blinds & Shutters",
      fr: "Stores et Volets",
      nl: "Gordijnen en Rolluiken",
    },
    {
      cat: "finishing",
      en: "Parquet & Flooring",
      fr: "Parquet et Sols",
      nl: "Parquet en Vloeren",
    },

    {
      cat: "outdoor",
      en: "Wood Terraces",
      fr: "Terrasse en bois",
      nl: "Houten Terrassen",
    },
    {
      cat: "outdoor",
      en: "Stone Paving",
      fr: "Pavage et Allées",
      nl: "Oprit en Pavage",
    },
    {
      cat: "outdoor",
      en: "Concrete Fencing",
      fr: "Barrières en béton",
      nl: "Betonafsluitingen",
    },
    {
      cat: "outdoor",
      en: "Exterior Lighting",
      fr: "Éclairage extérieur",
      nl: "Buitenverlichting",
    },
  ];

  for (const s of servicesToSeed) {
    const categoryId = categoryMap[s.cat];
    if (!categoryId) continue;

    const service = await payload.create({
      collection: "services",
      data: {
        title: s.en,
        category: categoryId,
      },
    });

    await payload.update({
      collection: "services",
      id: service.id,
      locale: "fr",
      data: { title: s.fr, category: categoryId },
    });

    await payload.update({
      collection: "services",
      id: service.id,
      locale: "nl",
      data: { title: s.nl, category: categoryId },
    });
  }

  console.log("✅ Services Seeded");
  console.log("🚀 Done! You can now manually add images in the Admin Panel.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

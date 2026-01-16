import { getPayload } from "payload";
import configPromise from "../payload.config";
import fs from "fs";
import path from "path";
import "dotenv/config";

async function bulkUpload() {
  const payload = await getPayload({ config: configPromise });

  // 1. CLEANUP: Delete all existing Gallery records and Media
  console.log("🧹 Wiping existing gallery and media...");
  await payload.delete({
    collection: "work-images",
    where: { id: { exists: true } },
  });
  await payload.delete({
    collection: "media",
    where: { id: { exists: true } },
  });

  const baseDir = "C:\\Users\\moeme\\Desktop\\op_pics\\work";
  const folders = ["structural", "finishing", "technical", "outdoor"];

  // 2. Map Categories
  const categoriesRes = await payload.find({ collection: "categories" });
  const categoryMap: Record<string, string | number> = {};
  categoriesRes.docs.forEach((cat) => {
    categoryMap[cat.slug.toLowerCase()] = cat.id;
  });

  const allPendingUploads: {
    filePath: string;
    categoryId: string | number;
    folder: string;
    fileName: string;
  }[] = [];

  // 3. Collect all file paths first
  for (const folder of folders) {
    const folderPath = path.join(baseDir, folder);
    if (!fs.existsSync(folderPath)) continue;

    const files = fs.readdirSync(folderPath).filter((f) => !f.startsWith("."));
    files.forEach((file) => {
      allPendingUploads.push({
        filePath: path.join(folderPath, file),
        categoryId: categoryMap[folder.toLowerCase()] as string,
        folder,
        fileName: file,
      });
    });
  }

  // 4. Randomize and Pick 9 Favorites
  // Shuffle array using Fisher-Yates
  for (let i = allPendingUploads.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allPendingUploads[i], allPendingUploads[j]] = [
      allPendingUploads[j],
      allPendingUploads[i]!,
    ];
  }

  console.log(`🚀 Uploading ${allPendingUploads.length} images...`);

  // 5. Execute Upload
  for (let i = 0; i < allPendingUploads.length; i++) {
    const item = allPendingUploads[i]!;
    const isFavorite = i < 9; // The first 9 in the shuffled list become favorites

    try {
      const fileBuffer = fs.readFileSync(item.filePath); // Read it once into a variable

      const mediaDoc = await payload.create({
        collection: "media",
        data: { alt: `${item.folder} project` },
        file: {
          data: fileBuffer,
          name: `${item.folder}-${item.fileName}`,
          mimetype: `image/jpeg`,
          size: fileBuffer.length, // <--- Add this line
        },
      });

      await payload.create({
        collection: "work-images",
        data: {
          image: mediaDoc.id,
          category: item.categoryId,
          aspectRatio: "aspect-video",
          isFavorite: isFavorite,
        },
      });

      console.log(
        `[${i + 1}/${allPendingUploads.length}] ✅ ${item.folder}: ${item.fileName} ${isFavorite ? "⭐" : ""}`,
      );
    } catch (err) {
      console.error(`❌ Failed ${item.fileName}:`, err);
    }
  }

  console.log("🏁 Bulk upload with 9 random favorites complete!");
  process.exit(0);
}

bulkUpload();

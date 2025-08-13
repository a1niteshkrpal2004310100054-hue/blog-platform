import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Extract imagesUrl from content
// export const extractImageUrl = (content) => {
//   if (!content && !Array.isArray(content)) {
//     return [];
//   } else {
//     return content.blocks
//       .filter((data) => data.type === 'image')
//       .map((block) => block.data?.file?.url)
//       .filter(Boolean);
//   }
// };
function extractImageUrl(content) {
  if (!content || !Array.isArray(content.blocks)) {
    return [];
  }

  return content.blocks
    .filter((block) => block.type === "image")
    .map((block) => block.data?.file?.url)
    .filter(Boolean);
}

// 2. Convert /uploads/editor/abc.png → filesystem path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPathFromURl = (url) => {
  const relativePath = url.replace("http://localhost:8000/upload", "");
  return path.join(__dirname, "..", "..", "uploads", relativePath);
};

// 3. Delete image from server;
const deleteImageFromServer = (imageUrl) => {
  console.log(imageUrl);
  const imagePath = getPathFromURl(imageUrl);
  console.log("image path", imagePath);

  if (fs.existsSync(imagePath)) {
    fs.unlink(imagePath, (error) => {
      if (error) {
        console.error(`failed to delete ${imagePath}`, error);
      } else {
        console.warn("Image File deleted");
      }
    });
  } else {
    console.warn("File does't exist");
  }
};

// compare new vs old delete removed images
export const autoCleanupOldImages = (editorContent, allUploadedImages) => {
  console.log("all", allUploadedImages);
  const usedImages = extractImageUrl(editorContent);
  if (allUploadedImages.length > 0) {
    const toDelete = allUploadedImages.filter(
      (uploadedUrl) => !usedImages.includes(uploadedUrl)
    );

    console.log("🧹 Unused images to delete:", toDelete);

    toDelete.forEach(deleteImageFromServer);
  }
};

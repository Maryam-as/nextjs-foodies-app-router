import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(filePath, publicId) {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "foodies_app",
    public_id: publicId, // forces the file name
    overwrite: true, // optional: replace if already exists
  });
  return result.secure_url;
}

import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv";

dotenv.config();

const storage = new Storage({
  keyFilename: process.env.GCS_KEYFILE,
});

const bucket = storage.bucket(process.env.GCS_BUCKET);

const uploadImage = (req, res) => {
  if (!req.file || !req.file.cloudStoragePublicUrl) {
    return res.status(500).json({ error: "Gagal mengunggah gambar" });
  }
  res.status(200).json({ imageUrl: req.file.cloudStoragePublicUrl });
};

const listImages = async (req, res) => {
  try {
    const [files] = await bucket.getFiles();
    const fileUrls = files.map(file => ({
      name: file.name,
      url: `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${file.name}`
    }));
    res.status(200).json({ images: fileUrls });
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil daftar gambar" });
  }
};

const deleteImage = async (req, res) => {
  try {
    const { filename } = req.params;
    await bucket.file(filename).delete();
    res.status(200).json({ message: "Gambar berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: "Gagal menghapus gambar" });
  }
};

export { uploadImage, listImages, deleteImage };

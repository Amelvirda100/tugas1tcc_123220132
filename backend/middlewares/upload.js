import { Storage } from "@google-cloud/storage";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// Inisialisasi Google Cloud Storage
const storage = new Storage({
  keyFilename: process.env.GCS_KEYFILE,
});
const bucket = storage.bucket(process.env.GCS_BUCKET);

// Konfigurasi Multer (Menyimpan di memori sebelum diunggah ke GCS)
const multerStorage = multer.memoryStorage();
const upload = multer({
  storage: multerStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maksimum 5MB
});

// Middleware untuk mengunggah file ke GCS
const uploadToGCS = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "File tidak ditemukan" });
  }

  const fileName = Date.now() + "-" + req.file.originalname;
  const file = bucket.file(fileName);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  stream.on("error", (err) => {
    console.error("Error saat mengunggah ke GCS:", err);
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on("finish", async () => {
    try {
      await file.makePublic();
      console.log("File berhasil dibuat publik:", fileName);
      req.file.cloudStoragePublicUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${fileName}`;
      console.log("URL gambar:", req.file.cloudStoragePublicUrl);
      next();
    } catch (err) {
      console.error("Error saat membuat file publik:", err);
      next(err);
    }
  });

  stream.end(req.file.buffer);
};

export { storage, bucket, upload, uploadToGCS };

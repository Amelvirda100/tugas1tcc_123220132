import express from 'express';
import { upload, uploadToGCS, bucket } from '../middlewares/upload.js';
import { uploadImage, listImages, deleteImage } from '../controller/ImagesController.js';

const router = express.Router();

// ** CREATE: Upload Gambar**
router.post("/upload", upload.single("file"), uploadToGCS, (req, res) => {
    if (!req.file.cloudStoragePublicUrl) {
        return res.status(500).json({ error: "Gagal mengunggah gambar" });
    }
    res.status(200).json({ imageUrl: req.file.cloudStoragePublicUrl });
});

// ** READ: List Semua Gambar di Bucket**
router.get('/list', listImages);

// ** PUT: Ganti Nama Gambar di Bucket**
router.put("/rename/:oldFilename/:newFilename", async (req, res) => {
    const { oldFilename, newFilename } = req.params;

    if (!oldFilename || !newFilename) {
        return res.status(400).json({ error: "Nama file lama dan baru harus diisi" });
    }

    const oldFile = bucket.file(oldFilename);
    const newFile = bucket.file(newFilename);

    try {
        await oldFile.copy(newFile); // Copy file lama ke nama baru
        await oldFile.delete(); // Hapus file lama

        res.json({ message: `File berhasil diubah menjadi ${newFilename}` });
    } catch (err) {
        console.error("Error saat mengganti nama file:", err);
        res.status(500).json({ error: "Gagal mengganti nama file" });
    }
});


// ** DELETE: Hapus Gambar**
router.delete("/delete/:filename", async (req, res) => {
    const { filename } = req.params;

    if (!filename) {
        return res.status(400).json({ error: "Nama file harus diisi" });
    }

    const file = bucket.file(filename);

    try {
        await file.delete();
        res.json({ message: `File ${filename} berhasil dihapus` });
    } catch (err) {
        console.error("Error saat menghapus file:", err);
        res.status(500).json({ error: "Gagal menghapus file" });
    }
});

export default router;

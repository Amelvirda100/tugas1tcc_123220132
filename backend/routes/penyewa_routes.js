import express from "express";
import {
  getPenyewa,
  createPenyewa,
  updatePenyewa,
  deletePenyewa,
} from "../controller/penyewa_controller.js";

const router = express.Router();

router.get("/penyewa", getPenyewa);         // Ambil semua penyewa
router.get("/penyewa/:id", getPenyewa);     // Ambil penyewa berdasarkan ID
router.post("/penyewa", createPenyewa);     // Tambah penyewa
router.put("/penyewa/:id", updatePenyewa);  // Update penyewa
router.delete("/penyewa/:id", deletePenyewa); // Hapus penyewa

export default router;

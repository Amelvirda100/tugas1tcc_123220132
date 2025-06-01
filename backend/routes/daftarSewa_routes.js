import express from "express";
import {
  getDaftarSewa,
  createDaftarSewa,
  updateDaftarSewa,
  deleteDaftarSewa,
} from "../controller/daftarSewa_controller.js";

const router = express.Router();

router.get("/sewa", getDaftarSewa);          // Ambil semua daftar sewa
router.get("/sewa/:id", getDaftarSewa);      // Ambil satu data sewa
router.post("/sewa", createDaftarSewa);      // Tambah data sewa
router.put("/sewa/:id", updateDaftarSewa);   // Update data sewa
router.delete("/sewa/:id", deleteDaftarSewa); // Hapus data sewa

export default router;

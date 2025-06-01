import express from "express";
import {
  getKamar,
  createKamar,
  updateKamar,
  deleteKamar,
} from "../controller/kamar_controller.js";

const router = express.Router();

router.get("/kamar", getKamar);
router.get("/kamar/:id", getKamar);
router.post("/kamar", createKamar);
router.put("/kamar/:id", updateKamar);
router.delete("/kamar/:id", deleteKamar);

export default router;

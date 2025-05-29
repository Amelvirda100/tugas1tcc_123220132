import express from "express";
import { getNotes, createNote, updateNote, deleteNote } from "../controller/UserControllers.js";

const router = express.Router();

router.get("/notes", getNotes);
router.get("/notes/:id", getNotes); // Pakai fungsi yang sama
router.post("/notes", createNote);
router.put("/notes/:id", updateNote);
router.delete("/notes/:id", deleteNote);

export default router;
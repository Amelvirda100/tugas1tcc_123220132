import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  login,
  logout,
} from "../controller/admin_controller.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { getAccessToken } from "../controller/TokenController.js";

const router = express.Router();

router.get("/token", getAccessToken);

router.post("/login", login);
router.delete("/logout", logout);


router.get("/users", verifyToken, getUsers);
router.get("/users/:id", verifyToken, getUserById);
router.post("/users", createUser);
router.put("/users/:id", verifyToken, updateUser);
router.delete("/users/:id", verifyToken, deleteUser);

export default router;
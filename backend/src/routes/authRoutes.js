import express from "express";
import { signup, login, logout, checkAuth, googleAuth, updateProfile } from "../controllers/authController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/google", googleAuth);
router.get("/me", protectRoute, checkAuth);
router.put("/profile", protectRoute, updateProfile);

export default router;

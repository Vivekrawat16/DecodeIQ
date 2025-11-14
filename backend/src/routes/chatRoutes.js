import express from "express";
import { getStreamToken } from "../controllers/chatController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/token", protectRoute, getStreamToken);

export default router;
// backend/src/routes/chatRoutes.js

// import express from "express";
// import { protectRoute } from "../middleware/protectRoute.js";
// import { chatClient } from "../lib/stream.js";

// const router = express.Router();

// router.get("/token", protectRoute, async (req, res) => {
//   try {
//     console.log("🔍 Generating Stream token for:", req.user);

//     const clerkId = req.user?.clerkId;

//     if (!clerkId) {
//       return res.status(400).json({ message: "Missing clerkId for token" });
//     }

//     // Generate stream chat token
//     const token = chatClient.createToken(clerkId);

//     return res.json({ token });
//   } catch (error) {
//     console.error("❌ Error in getStreamToken:", error);
//     return res.status(500).json({ message: "Failed to generate token" });
//   }
// });

// export default router;

import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { serve } from "inngest/express";
import { clerkMiddleware } from '@clerk/express';
import { inngest, functions } from "./lib/inngest.js"; // ✅ Correct single import
import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js"
const app = express();

// ✅ ESM-safe way to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Middleware
app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(clerkMiddleware()); //this add auth fieldto request boject 

// ✅ Inngest API route (fixed leading slash)
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat",chatRoutes);
app.use("/api/sessions",sessionRoutes);
;
// ✅ API route example


// ✅ Serve frontend in production
if (ENV.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../../frontend/dist");
  app.use(express.static(frontendPath));

  // ✅ Handle all other routes by sending React index.html
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log(`✅ Server is running on port ${ENV.PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
  }
};

startServer();

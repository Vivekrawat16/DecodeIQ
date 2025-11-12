import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import {serve} from "inngest/express"
import { inngest } from "./lib/inngest.js";
import { inngest, functions } from "./lib/inngest.js";

const app = express();

// ✅ ESM-safe way to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middleware

app.use(express.json())
app.use(cors({origin:ENV.CLIENT_URL,credential:true}))

app.use("api/inngest",serve({client:inngest,functions}))

// ✅ API route example
app.get("/books", (req, res) => {
  res.status(200).json({ msg: "success from books" });
});

// ✅ Serve frontend in production
if (ENV.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  // ✅ Handle all other routes by sending React index.html
  app.get("*", (req, res) => {
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



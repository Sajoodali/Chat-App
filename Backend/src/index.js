import express from "express";
import dotenv from "dotenv";

import { connectdb } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/api/auth", authRoutes);

connectdb()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server is live at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err.message);
  });

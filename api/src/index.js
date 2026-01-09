import express from "express";
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./configs/env.js";
import connectDB from "./configs/db.js";

const app = express();

app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("Express on Vercel"));

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    path: "Matched /api/health",
    env_check: ENV?.PORT || "Env loaded",
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    path: "Matched /health (Prefix was stripped)",
    env_check: ENV?.PORT || "Env loaded",
  });
});

export default app;

// Only listen locally
if (process.env.NODE_ENV !== "production") {
  const PORT = ENV.PORT || 3000;
  await connectDB();
  app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}. DB connected.`)
  );
}

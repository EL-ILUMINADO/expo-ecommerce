import express from "express";

import { ENV } from "../configs/env.js";

const app = express();

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
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

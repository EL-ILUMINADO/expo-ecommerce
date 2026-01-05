import express from "express";
import { ENV } from "../configs/env.js";

const app = express();

app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "Server is running on Vercel!",
  });
});

app.use("*", (req, res) => {
  res.json({
    error: "Route not found",
    path_received: req.originalUrl,
    method: req.method,
  });
});

export default app;

if (process.env.NODE_ENV !== "production") {
  const PORT = ENV.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

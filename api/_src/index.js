import express from "express";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import cors from "cors";
import { functions, inngest } from "./configs/inngest.js";

import { ENV } from "./configs/env.js";
import { connectDB } from "./configs/db.js";

import adminRoutes from "./routes/admin.route.js";
import userRoutes from "./routes/user.route.js";
import orderRoutes from "./routes/order.route.js";
import reviewRoutes from "./routes/review.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";

const app = express();

app.use(express.json());
app.use(clerkMiddleware());
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/inngest", serve({ client: inngest, functions }));

app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

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

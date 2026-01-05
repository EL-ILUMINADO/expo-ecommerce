import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res
    .status(200)
    .json({
      message: "Hello World! This is the backend service running!! It works",
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import apiRoute from "./src/routes/index.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use(cookieParser());
app.use("/api", apiRoute);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "uploads");

app.use("/upload", express.static(uploadDir));

app.get("/", (req, res) => {
  res.send("Hello");
});

export { app };

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import apiRoute from "./src/routes/index.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import http from "http";
import { Server } from "socket.io";
import {
  setUpSocketServer,
  getUserSocketId,
} from "./src/socket/socketServer.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// create server
export const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use(cookieParser());
app.use("/api", apiRoute);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use("/uploads", express.static(uploadDir));

app.get("/", (req, res) => {
  res.send("Hello");
});

// setup cors for Socket
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});



setUpSocketServer(io);

export { app };

const { onRequest } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions/logger");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const next = require("next");

const itemRoutes = require("./routes/itemRoutes");
const userRoutes = require("./routes/userRoutes");
// Initialize Firebase Admin
admin.initializeApp();

// Express API Setup
const apiApp = express();
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://whitelabelweb-c4f4d.web.app",
    "https://whitelabelweb-c4f4d.firebaseapp.com",
    "https://whitelabel-2o7d.onrender.com/",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

apiApp.use(express.json());
apiApp.use(express.urlencoded({ extended: true }));
apiApp.use(cors(corsOptions));
apiApp.use((req, res, next) => {
  console.log("🔥 CORS Middleware");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

apiApp.get("/", (req, res) => {
  logger.info("API root endpoint hit");
  res.send("API root is working");
});
apiApp.post("/test", (req, res) => {
  logger.info("Test endpoint hit", { body: req.body });
  console.log("🔥 HIT /test route");
  console.log("BODY:", req.body);
  res.status(200).json({ message: "CORS is working!", body: req.body });
});
apiApp.use("/items", itemRoutes);
apiApp.use("/users", userRoutes);
// Next.js SSR Setup
const nextjsDistDir = "../.next"; // Path to .next directory relative to functions/
const nextjsServer = next({
  dev: false,
  conf: { distDir: nextjsDistDir },
  port: process.env.PORT || 8080,
});
const nextjsHandle = nextjsServer.getRequestHandler();

// Firebase Functions Exports
exports.api = onRequest(apiApp); // Existing API
exports.nextjsFunc = onRequest(async (req, res) => {
  try {
    await nextjsServer.prepare();
    return nextjsHandle(req, res);
  } catch (err) {
    logger.error("Error in Next.js function:", err);
    res.status(500).send("Internal Server Error");
  }
});

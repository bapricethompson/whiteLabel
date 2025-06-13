/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const app = express();

const itemRoutes = require("./routes/itemRoutes");

const cors = require("cors");

admin.initializeApp();

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
  origin: ["http://localhost:3000", "https://whitelabelweb-c4f4d.web.app/"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use((req, res, next) => {
  console.log("🔥 Before CORS Middleware");
  next();
});

app.use(cors(corsOptions));

// Explicitly handle OPTIONS requests (preflight)
app.options("*", (req, res) => {
  console.log("🔥 Preflight Request Detected");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.status(200).end();
});

app.use((req, res, next) => {
  console.log("🔥 CORS Middleware");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.get("/", (req, res) => {
  res.send("API root is working");
});

// Test route
app.post("/test", (req, res) => {
  console.log("🔥 HIT /test route");
  console.log("BODY:", req.body);
  res.status(200).json({ message: "CORS is working!", body: req.body });
});

// Other routes
app.use("/items", itemRoutes);

// Firebase functions export
exports.api = functions.https.onRequest(app);

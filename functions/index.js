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

admin.initializeApp();
const db = admin.database();

app.get("/hello", (req, res) => {
  res.send("Hello from Express on Firebase!");
});

exports.api = functions.https.onRequest(app);

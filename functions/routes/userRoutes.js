const express = require("express");
const admin = require("firebase-admin");
const router = express.Router();

// router.post("/", async (req, res) => {
//     try {
//         const {email, password}=req.body;
//         const permissions="";
//         const db = admin.database();
//             const usersRef = db.ref("users");
//             const userRef = usersRef.push(); // generates a unique key
//             const userId = userRef.key;

//             const newUser = {
//               itemId,
//               email,
//               password,
//               createdAt: new Date().toISOString(),
//             };

//             await userRef.set(newUser);

//             res.status(201).json({ message: "Usercreated", item: newUser });
//     }
//     catch
// });

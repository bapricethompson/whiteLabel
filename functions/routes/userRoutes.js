const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const checkIfLoggedIn = require("../modules/checkIfLoggedIn");

// POST /users - Register a new user and store in Realtime DB
router.post("/", async (req, res) => {
  const { email, password, name, permissions = [] } = req.body;

  try {
    // Step 1: Create Firebase Auth user
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    const uid = userRecord.uid;

    // Step 2: Set custom claims for role-based auth
    await admin.auth().setCustomUserClaims(uid, { permissions });

    // Step 3: Save user data in Realtime Database
    await admin
      .database()
      .ref(`users/${uid}`)
      .set({
        uid,
        email,
        name: name || "",
        permissions, // ✅ include permissions
        createdAt: new Date().toISOString(),
      });

    res.status(201).json({ uid, email, permissions });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/", checkIfLoggedIn, async (req, res) => {
  const user = req.user;

  // Ensure only Admins can get all users
  if (!user.permissions.includes("Admin")) {
    return res
      .status(401)
      .json({ error: "Admin permission required to get all users." });
  }

  try {
    const snapshot = await admin.database().ref("users").once("value");
    const users = snapshot.val();

    if (!users) {
      return res.status(200).json([]);
    }

    const usersArray = Object.keys(users).map((uid) => ({
      uid,
      ...users[uid],
    }));

    res.status(200).json(usersArray);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// router.get("/:uid", async (req, res) => {
//   const { uid } = req.params;

//   try {
//     const snapshot = await admin.database().ref(`users/${uid}`).once("value");
//     const user = snapshot.val();

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.status(200).json({ uid, ...user });
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

router.get("/self", checkIfLoggedIn, async (req, res) => {
  try {
    console.log("/self !!!!!!!!!!!!!!!!!!!!!");
    const userId = req.user.uid;

    if (userId === "") {
      res.status(400).json({ error: "Please login" });
      return;
    }
    res.status(200).json(req.user);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: error });
  }
});

router.delete("/:uid", async (req, res) => {
  const { uid } = req.params;

  try {
    await admin.auth().deleteUser(uid);
    await admin.database().ref(`users/${uid}`).remove();

    res.status(200).json({ message: `User ${uid} deleted successfully.` });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: error.message });
  }
});

router.put("/:uid", async (req, res) => {
  const { uid } = req.params;
  const { email, name, permissions, password } = req.body;

  try {
    // Update Firebase Auth user info if provided
    const updateAuth = {};
    if (email) updateAuth.email = email;
    if (password) updateAuth.password = password;

    if (Object.keys(updateAuth).length > 0) {
      await admin.auth().updateUser(uid, updateAuth);
    }

    // Update custom claims if permissions provided
    if (permissions) {
      await admin.auth().setCustomUserClaims(uid, { permissions });
    }

    // Update user info in Realtime Database
    const userRef = admin.database().ref(`users/${uid}`);
    const updates = {};
    if (email) updates.email = email;
    if (name) updates.name = name;
    if (permissions) updates.permissions = permissions;

    if (Object.keys(updates).length > 0) {
      await userRef.update(updates);
    }

    // Fetch updated user data to return
    const snapshot = await userRef.once("value");
    const updatedUser = snapshot.val();

    res.status(200).json({ uid, ...updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/changePermission", checkIfLoggedIn, async (req, res) => {
  try {
    const requester = req.user;

    // Check if requester has Admin permissions
    if (!requester.permissions.includes("Admin")) {
      return res.status(403).json({
        error: "You do not have permission to perform this action.",
      });
    }

    const { uid, Permission } = req.body;
    if (!uid) {
      return res.status(400).json({ error: "Missing user UID" });
    }

    // ✅ Update Firebase Auth custom claims
    await admin.auth().setCustomUserClaims(uid, { permissions: Permission });

    // ✅ Update Realtime Database user profile
    const db = admin.database();
    await db.ref(`users/${uid}/permissions`).set(Permission);

    return res
      .status(200)
      .json({ message: `User ${uid} is now an ${Permission}.` });
  } catch (err) {
    console.error("Error promoting user to admin:", err);
    return res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
});

module.exports = router;

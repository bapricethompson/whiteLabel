//const authenticateFirebaseToken = require("../modules/firebaseAuthMiddleware");

const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

// POST - Create item
router.post("/", async (req, res) => {
  try {
    const { title, price, description, imgUrl, sizes } = req.body;
    const userId = "testers"; // Replace with req.user.uid when auth is added

    if (!title || !price || !description || !imgUrl) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const db = admin.database();
    const itemsRef = db.ref("items");
    const itemRef = itemsRef.push(); // generates a unique key
    const itemId = itemRef.key;

    const newItem = {
      itemId,
      title,
      price,
      description,
      sizes: !!sizes, // convert sizes to boolean: true if truthy, else false
      imgUrl,
      createdBy: userId,
      createdAt: new Date().toISOString(),
    };

    await itemRef.set(newItem);

    res.status(201).json({ message: "Item created", item: newItem });
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET - Read all items
router.get("/", async (req, res) => {
  try {
    const db = admin.database();
    const itemsRef = db.ref("items");

    const snapshot = await itemsRef.once("value");
    const items = snapshot.val() || {};
    res.status(200).json(Object.values(items));
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET - Read one item
router.get("/:id", async (req, res) => {
  try {
    const db = admin.database();
    const itemsRef = db.ref("items");
    const { id } = req.params;

    const snapshot = await itemsRef.child(id).once("value");
    const item = snapshot.val();

    if (!item) return res.status(404).json({ error: "Item not found" });
    res.status(200).json(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ error: error.message });
  }
});

// PUT - Update item
router.put("/:id", async (req, res) => {
  try {
    const db = admin.database();
    const itemsRef = db.ref("items");
    const { id } = req.params;
    const updates = req.body;

    const itemRef = itemsRef.child(id);
    const snapshot = await itemRef.once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ error: "Item not found" });
    }

    await itemRef.update(updates);
    res.status(200).json({ message: "Item updated" });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE - Delete item
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const db = admin.database();
    const itemsRef = db.ref("items");

    const itemRef = itemsRef.child(id);
    const snapshot = await itemRef.once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ error: "Item not found" });
    }

    await itemRef.remove();
    res.status(200).json({ message: "Item deleted" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

const authenticateFirebaseToken = require("../modules/firebaseAuthMiddleware");
const checkAdminPermission = require("../modules/checkadmin"); // Adjust path as needed

const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

// POST - Create item
router.post(
  "/",
  authenticateFirebaseToken,
  checkAdminPermission,
  async (req, res) => {
    const user = req.user;

    try {
      const { title, price, description, imgUrl, sizes, tags } = req.body;
      const userId = req.user.uid; // Replace with req.user.uid when auth is added

      console.log("title", title);
      console.log("price", price);
      console.log("img", imgUrl);
      console.log("desc", description);
      if (!title || !price || !description || !imgUrl) {
        return res.status(400).json({ error: "All fields are required." });
      }

      if (tags && !Array.isArray(tags)) {
        return res.status(400).json({ error: "Tags must be an array." });
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
        tags: tags || [],
        createdBy: userId,
        createdAt: new Date().toISOString(),
      };

      await itemRef.set(newItem);

      res.status(201).json({ message: "Item created", item: newItem });
    } catch (error) {
      console.error("Error creating item:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

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
router.put(
  "/:id",
  authenticateFirebaseToken,
  checkAdminPermission,
  async (req, res) => {
    const user = req.user;

    try {
      const db = admin.database();
      const itemsRef = db.ref("items");
      const { id } = req.params;
      const updates = req.body;

      if (updates.tags && !Array.isArray(updates.tags)) {
        return res.status(400).json({ error: "Tags must be an array." });
      }

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
  }
);

// DELETE - Delete item
router.delete(
  "/:id",
  authenticateFirebaseToken,
  checkAdminPermission,
  async (req, res) => {
    const user = req.user;

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
  }
);

module.exports = router;

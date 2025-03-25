const express = require("express");
const { db } = require("../firebaseAdmin");

const router = express.Router();

/** 📌 Save a new letter */
router.post("/save", async (req, res) => {
  try {
    const { userId, title, content } = req.body;
    if (!userId || !title || !content) {
      return res.status(400).json({ success: false, error: "Missing required fields." });
    }

    const newLetter = {
      userId,
      title,
      content,
      createdAt: new Date(),
    };

    const docRef = await db.collection("letters").add(newLetter);
    res.status(200).json({ success: true, message: "Letter saved successfully.", id: docRef.id });
  } catch (error) {
    console.error("Error saving letter:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/** 📌 Fetch all letters for a user */
router.get("/get/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const snapshot = await db.collection("letters").where("userId", "==", userId).orderBy("createdAt", "desc").get();

    let letters = snapshot.empty ? [] : snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json({ success: true, letters });
  } catch (error) {
    console.error("Error fetching letters:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/** 📌 Fetch a single letter by ID */
router.get("/getById/:id", async (req, res) => {
  try {
    const doc = await db.collection("letters").doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ success: false, error: "Letter not found." });

    res.status(200).json({ success: true, letter: { id: doc.id, ...doc.data() } });
  } catch (error) {
    console.error("Error fetching letter:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/** 📌 Update a letter */
router.put("/update/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const letterRef = db.collection("letters").doc(req.params.id);

    const doc = await letterRef.get();
    if (!doc.exists) return res.status(404).json({ success: false, error: "Letter not found." });

    await letterRef.update({ title, content });
    res.status(200).json({ success: true, message: "Letter updated successfully." });
  } catch (error) {
    console.error("Error updating letter:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/** 📌 Delete a letter */
router.delete("/delete/:id", async (req, res) => {
  try {
    await db.collection("letters").doc(req.params.id).delete();
    res.status(200).json({ success: true, message: "Letter deleted successfully." });
  } catch (error) {
    console.error("Error deleting letter:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;

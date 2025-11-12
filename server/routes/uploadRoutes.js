const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// === Multer config ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// === Upload endpoint ===
router.post("/", upload.single("poster"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // 🔥 Return absolute public URL
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  console.log("✅ Uploaded image URL:", imageUrl);
  res.json({ imageUrl });
});

module.exports = router;

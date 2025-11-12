const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  createEvent,
  getEventsBySociety,
  getEventById,
  deleteEvent,
} = require("../controllers/eventController");

// POST: Create Event (with optional poster)
router.post("/create", createEvent);

// GET: Fetch all events by society
router.get("/society/:id", getEventsBySociety);

// GET: Fetch single event
router.get("/:id", getEventById);

// DELETE: Delete event
router.delete("/:eventId", deleteEvent);

module.exports = router;

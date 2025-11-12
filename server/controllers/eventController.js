const Event = require("../models/Event");

// ✅ CREATE EVENT
exports.createEvent = async (req, res) => {
  try {
    console.log("📩 Received Event Data:", req.body);

    const { society, title, tagline, description, date, location, poster } = req.body;

    if (!society || !title || !description || !date || !location) {
      console.log("❌ Missing Fields:", { society, title, description, date, location });
      return res.status(400).json({ message: "Missing required fields" });
    }

    const event = await Event.create({
      society, // ✅ direct use
      title,
      tagline,
      description,
      date,
      location,
      poster,
    });

    console.log("✅ Event created successfully:", event._id);
    res.status(201).json(event);
  } catch (error) {
    console.error("❌ Error creating event:", error);
    res.status(500).json({ message: "Server error while creating event" });
  }
};

// ✅ FETCH ALL EVENTS BY SOCIETY
exports.getEventsBySociety = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🔍 Fetching events for society:", id);

    // Query by correct field name in schema
    const events = await Event.find({ society: id }).sort({ createdAt: -1 });

    console.log("📦 Events found:", events.length);
    res.json(events);
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    res.status(500).json({ message: "Server error while fetching events" });
  }
};

// ✅ FETCH SINGLE EVENT BY ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Server error fetching event" });
  }
};

// ✅ DELETE EVENT
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    await event.deleteOne();
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Failed to delete event" });
  }
};

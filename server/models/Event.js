
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    society: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    title: { 
      type: String, 
      required: true 
    },
    tagline: {
      type: String,
      default: "",
    },
    description: { 
      type: String, 
      required: true 
    },
    date: { 
      type: Date, 
      required: true 
    },
    location: { 
      type: String, 
      required: true 
    },
    poster: { 
      type: String, 
      default: "",
    },
    type: { 
      type: String, 
      enum: ["event", "announcement"], 
      default: "event" 
    }, 
    likes: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" }], // future social feature
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;

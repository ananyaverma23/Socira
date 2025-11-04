const mongoose = require('mongoose');

const societySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: { // This will be the login email for the society admin
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: 'default_society_logo_url_here',
  },
  description: {
    type: String,
    maxlength: 500,
  },
  // 'members' will store IDs of Users who are members
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  // 'followers' will store IDs of Users who follow the society
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  // This will be used for the Society/Posts page
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  // 'events' field will be add later
}, {
  timestamps: true,
});

const Society = mongoose.model('Society', societySchema);
module.exports = Society;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // No two users can have the same email
    lowercase: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@igdtuw\.ac\.in$/, // Regex to check for the specific domain
      'Please use your official @igdtuw.ac.in email.' // Error message if it doesn't match
    ],
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: 'default_avatar_url_here', // A link to a default placeholder image
  },
  bio: {
    type: String,
    maxlength: 250,
  },
  // 'following' will store IDs of Societies the user follows
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Society', // This connects to the 'Society' model
    },
  ],
  // 'savedPosts' will store IDs of Posts the user has saved
  savedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post', // This will connect to a 'Post' model (we'll create it later)
    },
  ],
}, {
  timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
});

const User = mongoose.model('User', userSchema);
module.exports = User;
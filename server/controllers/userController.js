const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // 1. Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400); // Bad Request
    throw new Error('User already exists');
  }
  
  // 2. Check for @igdtuw.ac.in (the model does this, but good to double-check)
  if (!email.endsWith('@igdtuw.ac.in')) {
     res.status(400);
     throw new Error('Please use your college email.');
  }

  // 3. Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 4. Create the new user in the database
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    // 5. Generate a token and set the cookie
    generateToken(res, user._id);

    // 6. Send user data back (without the password)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Auth user (login) & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 1. Find the user by email
  const user = await User.findOne({ email });

  // 2. Check if user exists AND if passwords match
  if (user && (await bcrypt.compare(password, user.password))) {
    // 3. Generate a token and set the cookie
    generateToken(res, user._id);

    // 4. Send user data back
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
    });
  } else {
    res.status(401); // Unauthorized
    throw new Error('Invalid email or password');
  }
});

// @desc    Logout user & clear cookie
// @route   POST /api/users/logout
// @access  Private (must be logged in)
const logoutUser = asyncHandler(async (req, res) => {
  // We clear the cookie by setting it to an empty value and making it expire immediately.
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0), // Expire right now
  });

  res.status(200).json({ message: 'User logged out successfully' });
});

module.exports = {
  registerUser,
  loginUser,  
  logoutUser, 
};
const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
  // Create the token
  const token = jwt.sign(
    { userId }, // This is the 'payload' of the token
    process.env.JWT_SECRET, // Your secret key
    { expiresIn: '30d' } // Expires in 30 days
  );

  // Send the token as an HTTP-only cookie
  // This is safer than storing it in localStorage on the frontend
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevents CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  });
};

module.exports = generateToken;
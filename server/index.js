require('dotenv').config();

const express = require('express');
const path = require("path");
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require("./routes/eventRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGODB_URI;

//Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ Error connecting to MongoDB:', err.message);
    process.exit(1);
  });

// Middleware
app.use(cors());
app.use(express.json()); 
// ✅ Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Test Routes
app.get('/test', (req, res) => {
  res.json({ message: '✅ Backend and Frontend are connected!' });
});

//User Routes
app.use('/api/user', userRoutes);

//Event Routes
app.use("/api/events", eventRoutes);

app.use("/api/upload", uploadRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
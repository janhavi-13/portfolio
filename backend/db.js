const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Create a MongoDB schema and model
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

const Contact = mongoose.model('Contact', contactSchema);

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Add this line

// API endpoint for form submission
app.post('/submit-contact', async (req, res) => {
  console.log(req.body); // Log request body to debug
  const { name, email, message } = req.body;

  // Check if the request body is parsed correctly
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Invalid input' });
  }

  // Create a new instance of the Contact model
  const newContact = new Contact({
    name,
    email,
    message,
  });

  try {
    await newContact.save();
    res.status(200).json({ success: true, message: 'Message stored successfully' });
  } catch (error) {
    console.error('Error storing message:', error); // Log the error
    res.status(500).json({ success: false, message: 'Error storing message', error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

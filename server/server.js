// Import necessary packages
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();
const PORT = process.env.PORT || 5007;

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define allowed origins for CORS
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',  // Frontend URL from environment variable or default
  'https://procrastinot-austin.onrender.com'  // Add the deployed frontend URL
];

// CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin, like mobile apps or curl requests
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // Enable credentials
}));

// MongoDB connection URI
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
});

// Session configuration with MongoDB store
const sess = {
  secret: process.env.JWT_SECRET || 'Super secret secret', // Use the JWT_SECRET as session secret
  cookie: {
    maxAge: 43200000, // 12 hours
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: mongoURI, // Correctly using the mongoURI from environment variable
    collectionName: 'sessions', // Optional: The name of the collection for sessions
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  }),
};

// Use session middleware
app.use(session(sess));

// Serve static files from the React app build (assuming it's in /client/build)
app.use(express.static(path.join(__dirname, '../client/build')));

// API routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/projects', require('./routes/projectRoutes'));
app.use('/users', require('./routes/userRoutes'));

// Catch-all handler to serve the React app for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Sample root route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start the server after MongoDB connection is established
mongoose.connection.once('open', () => {
  console.log('MongoDB connection is open');
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

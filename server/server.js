const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5006;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true, // Enable credentials
  }));

// MongoDB connection URI
const mongoURI = process.env.MONGODB_URI;

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
    secure: false, // Set to true if using HTTPS
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

app.use('/auth', require('./routes/authRoutes'));
app.use('/projects', require('./routes/projectRoutes'));




// Sample routes
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

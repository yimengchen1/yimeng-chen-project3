require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: 'https://battleship-client-te9w.onrender.com', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const gamesRoutes = require('./routes/games');
app.use('/api/games', gamesRoutes);

const scoresRoutes = require('./routes/scores');
app.use('/api/scores', scoresRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error(err));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

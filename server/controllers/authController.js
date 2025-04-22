const bcrypt = require('bcrypt');
const User = require('../models/User');

// Sign in
exports.register = async (req, res) => {
  try {
    const { username, password, passwordConfirm } = req.body;

    if (!username || !password || !passwordConfirm) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({ message: 'Two password entries are inconsistent.' });
    }

    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: 'The username has been taken.' });
    }

    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    const user = new User({ username, password: hash });
    await user.save();

    req.session.userId = user._id;
    return res.status(201).json({ message: 'Registration successful', username: user.username });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Log in
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Password error' });
    }

    req.session.userId = user._id;
    return res.json({ message: 'Login successful', username: user.username });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Log out
exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Logout failed' });
    }

    // Clear cookies
    res.clearCookie('connect.sid');
    return res.json({ message: 'Logout successful' });
  });
};

// Get the current logged-in user
exports.getCurrentUser = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Not logged in' });
    }
    const user = await User.findById(req.session.userId).select('username');
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    return res.json({ username: user.username });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

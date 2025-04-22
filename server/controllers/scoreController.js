const mongoose = require('mongoose');
const Game = require('../models/Game');
const User = require('../models/User');

exports.getScores = async (req, res) => {
  try {
    const winAgg = await Game.aggregate([
      { $match: { status: 'Completed' } },
      { $group: { _id: '$winner', wins: { $sum: 1 } } }
    ]);

    const lossAgg = await Game.aggregate([
      { $match: { status: 'Completed' } },
      { $unwind: '$players' },
      { $match: { $expr: { $ne: ['$players', '$winner'] } } },
      { $group: { _id: '$players', losses: { $sum: 1 } } }
    ]);

    // Map：{ userId: { wins, losses } }
    const stats = {};
    winAgg.forEach(w => {
      stats[w._id.toString()] = { wins: w.wins, losses: 0 };
    });
    lossAgg.forEach(l => {
      const id = l._id.toString();
      if (!stats[id]) stats[id] = { wins: 0, losses: l.losses };
      else stats[id].losses = l.losses;
    });

    const users = await User.find().select('username');
    const results = users.map(u => {
      const s = stats[u._id.toString()] || { wins: 0, losses: 0 };
      return { username: u.username, wins: s.wins, losses: s.losses };
    });

    results.sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;
      if (a.losses !== b.losses) return a.losses - b.losses;
      return a.username.localeCompare(b.username);
    });

    return res.json(results);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

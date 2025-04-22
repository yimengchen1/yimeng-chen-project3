const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Single attack record
const MoveSchema = new Schema({
  player: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  row:    { type: Number, required: true },
  col:    { type: Number, required: true },
  hit:    { type: Boolean, required: true },
  timestamp: { type: Date, default: Date.now }
});

// The main model of the game
const GameSchema = new Schema({
  players: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  turn: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  boards: [{ type: Array }],
  ships:  [{ type: Array }],
  moves:  [MoveSchema],
  status: {
    type: String,
    enum: ['Open', 'Active', 'Completed'],
    default: 'Open'
  },
  startTime: { type: Date, default: Date.now },
  endTime:   { type: Date },
  winner:    { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Game', GameSchema);

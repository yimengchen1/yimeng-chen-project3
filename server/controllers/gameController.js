const Game = require('../models/Game');
const { placeShipsRandomly } = require('../utils/shipPlacement');
const mongoose = require('mongoose');

// Create a new game
async function createGame(req, res) {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ message: 'Please log in first.' });

    const { board, ships } = placeShipsRandomly();
    const creatorId = new mongoose.Types.ObjectId(userId);

    const game = new Game({
      players: [creatorId],
      boards: [board],
      ships: [ships],
      status: 'Open',
      turn: creatorId
    });
    await game.save();
    res.status(201).json({ gameId: game._id });
  } catch (err) {
    console.error('createGame error:', err);
    res.status(500).json({ message: err.message });
  }
}

// Join the game
async function joinGame(req, res) {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ message: 'Please log in first.' });

    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: 'The game does not exist.' });
    if (game.status !== 'Open') return res.status(400).json({ message: 'Unable to join the game.' });
    if (game.players[0].equals(userId)) return res.status(400).json({ message: 'Cannot join your own game.' });

    const joinerId = new mongoose.Types.ObjectId(userId);
    const { board, ships } = placeShipsRandomly();
    game.players.push(joinerId);
    game.boards.push(board);
    game.ships.push(ships);
    game.status = 'Active';
    await game.save();

    res.json({ gameId: game._id, message: 'Joined successfully' });
  } catch (err) {
    console.error('joinGame error:', err);
    res.status(500).json({ message: err.message });
  }
}

// Cancel the game
async function deleteGame(req, res) {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ message: 'Please log in first.' });

    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: 'The game does not exist.' });
    if (game.status !== 'Open') return res.status(400).json({ message: 'Only open games can be canceled.' });
    if (game.players[0].toString() !== userId) return res.status(403).json({ message: 'Only owner can cancel.' });

    await Game.findByIdAndDelete(req.params.id);
    res.json({ gameId: req.params.id, message: 'Cancellation successful' });
  } catch (err) {
    console.error('deleteGame error:', err);
    res.status(500).json({ message: err.message });
  }
}

// Get all the games
async function getAllGames(req, res) {
  try {
    const games = await Game.find()
    .populate('players', 'username')
    .select('_id players status startTime endTime winner');
    res.json(games);
  } catch (err) {
    console.error('getAllGames error:', err);
    res.status(500).json({ message: err.message });
  }
}

// Get the details of a single game
async function getGameById(req, res) {
  try {
    const game = await Game.findById(req.params.id)
    .populate('players', 'username')
    .populate('winner', 'username');
    if (!game) return res.status(404).json({ message: 'The game does not exist.' });
    res.json(game);
  } catch (err) {
    console.error('getGameById error:', err);
    res.status(500).json({ message: err.message });
  }
}

// Initiate an attack
async function move(req, res) {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ message: 'Please log in first.' });

    const { row, col } = req.body;
    const game = await Game.findById(req.params.id)
    .populate('players', 'username');

    if (!game) return res.status(404).json({ message: 'The game does not exist.' });
    if (game.status !== 'Active') return res.status(400).json({ message: 'Game not active.' });
    if (game.turn.toString() !== userId) return res.status(400).json({ message: 'Not your turn.' });

    const attackerIndex = game.players[0]._id.toString() === userId ? 0 : 1;
    const defenderIndex = attackerIndex === 0 ? 1 : 0;

    const board = game.boards[defenderIndex];
    const cell = board[row]?.[col];
    if (!cell || cell.hit || cell.miss) {
      return res.status(400).json({ message: 'Position not available.' });
    }

    cell.ship ? (cell.hit = true) : (cell.miss = true);
    game.markModified('boards');
    game.moves.push({ player: new mongoose.Types.ObjectId(userId), row, col, hit: !!cell.ship });

    const defenderShips = game.ships[defenderIndex];
    const allSunk = defenderShips.every(ship =>
        ship.positions.every(pos => board[pos.row][pos.col].hit)
    );

    if (allSunk) {
      game.status = 'Completed';
      game.winner = new mongoose.Types.ObjectId(userId);
      game.endTime = new Date();
      game.turn = null;
    } else {
      game.turn = game.players[defenderIndex]._id;
    }

    await game.save();

    // Return the latest game status
    const updated = await Game.findById(req.params.id)
    .populate('players', 'username')
    .populate('winner', 'username');
    res.json(updated);
  } catch (err) {
    console.error('move error:', err);
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  createGame,
  joinGame,
  deleteGame,
  getAllGames,
  getGameById,
  move
};

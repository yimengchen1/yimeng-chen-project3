const express = require('express');
const router = express.Router();
const {
  createGame,
  joinGame,
  getAllGames,
  getGameById,
  move,
  deleteGame
} = require('../controllers/gameController');

router.post('/', createGame);
router.put('/:id/join', joinGame);
router.get('/', getAllGames);
router.get('/:id', getGameById);
router.post('/:id/move', move);
router.delete('/:id', deleteGame);

module.exports = router;

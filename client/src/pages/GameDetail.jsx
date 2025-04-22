import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Board from '../components/Board';
import { getGameById, move } from '../api/games';
import { AuthContext } from '../context/AuthContext';

export default function GameDetail() {
  const { gameId } = useParams();
  const { user, loading: authLoading } = useContext(AuthContext);

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let canceled = false;
    const fetchGame = async () => {
      try {
        const data = await getGameById(gameId);
        if (!canceled) {
          setGame(data);
          setLoading(false);
        }
      } catch (err) {
        if (!canceled) {
          setError('Failed to load game');
          setLoading(false);
        }
      }
    };
    fetchGame();
    const timer = setInterval(fetchGame, 3000);
    return () => {
      canceled = true;
      clearInterval(timer);
    };
  }, [gameId]);

  if (loading || authLoading) return <p className="main-container">Loading...</p>;
  if (error)                return <p className="main-container">Error: {error}</p>;
  if (!game)                return <p className="main-container">Game not found.</p>;

  const playerIndex = game.players.findIndex(p => p.username === user);
  const enemyIndex  = playerIndex === 0 ? 1 : 0;

  if (!Array.isArray(game.boards)
      || !game.boards[playerIndex]
      || !game.boards[enemyIndex]
  ) {
    return <p className="main-container">Loading game boards...</p>;
  }

  if (game.status === 'Open') {
    return (
        <main className="main-container" style={{ textAlign: 'center' }}>
          <h1>Waiting for opponent to join...</h1>
          <p>Share this link:</p>
          <code>{window.location.href}</code>
        </main>
    );
  }

  // Judge whether it's your turn
  const isYourTurn =
      !!user &&
      !!game.turn &&
      String(game.turn) === String(game.players[playerIndex]._id);

  // Click to attack
  const handleTileClick = async (row, col) => {
    if (!isYourTurn || game.status !== 'Active') {
      return;
    }
    try {
      const updated = await move(gameId, row, col);
      setGame(updated);
    } catch (err) {
      alert(`Attack failed: ${err.message}`);
    }
  };

  return (
      <main className="main-container" style={{ textAlign: 'center' }}>
        <h1>
          {game.status === 'Completed'
              ? `Game Over! ${game.winner?.username || 'Unknown'} Wins!`
              : `Game In Progress (${isYourTurn ? 'Your Turn' : 'Opponent Turn'})`}
        </h1>

        <div
            className="board-container"
            style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}
        >
          {/* Opponent's board: Clickable */}
          <div>
            <h3 style={{ color: '#00bfff' }}>Opponent's Board (Click to Attack)</h3>
            <Board
                board={game.boards[enemyIndex]}
                onTileClick={ (row, col) => {
                  if (!user) return;
                  handleTileClick(row, col);
                }}
                isEnemy={true}
            />
          </div>
          {/* Our chessboard: Read-only and display ships */}
          <div>
            <h3 style={{ color: '#00bfff' }}>Your Board</h3>
            <Board
                board={game.boards[playerIndex]}
                onTileClick={() => {}}
                isEnemy={false}
            />
          </div>
        </div>
      </main>
  );
}

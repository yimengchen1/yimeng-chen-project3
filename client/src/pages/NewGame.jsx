import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGame } from '../api/games';

export default function NewGame() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async () => {
    setLoading(true);
    try {
      const data = await createGame();
      if (data.gameId) navigate(`/game/${data.gameId}`);
      else alert(data.message || 'Create failed');
    } catch {
      alert('Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
      <main className="main-container" style={{ textAlign: 'center' }}>
        <h1>Create a New Game</h1>
        <button
            onClick={handleCreate}
            disabled={loading}
            style={{
              padding: '12px 24px',
              backgroundColor: '#00bfff',
              border: 'none',
              borderRadius: '6px',
              color: '#1a1a1a',
              fontSize: '1.1em',
              cursor: 'pointer'
            }}
        >
          {loading ? 'Creating...' : 'Create New Game'}
        </button>
      </main>
  );
}

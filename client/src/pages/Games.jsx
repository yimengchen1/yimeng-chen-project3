import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllGames, joinGame, deleteGame } from '../api/games';
import { AuthContext } from '../context/AuthContext';

export default function Games() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getAllGames();
        setGames(data);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
    const interval = setInterval(fetchGames, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading || authLoading) {
    return <p className="main-container">Loading...</p>;
  }

  const openGames = games.filter(
      g => g.status === 'Open' && g.players[0].username !== user
  );
  const myOpenGames = games.filter(
      g => g.status === 'Open' && g.players[0].username === user
  );
  const activeGames = games.filter(g => g.status === 'Active');
  const completedGames = games.filter(g => g.status === 'Completed');
  const otherGames = games.filter(
      g => (g.status === 'Active' || g.status === 'Completed')
          && !g.players.some(p => p.username === user)
  );

  const handleJoin = async (id) => {
    try {
      const res = await joinGame(id);
      if (res.gameId) {
        navigate(`/game/${res.gameId}`);
      } else {
        alert(res.message || "Failed to join game");
      }
    } catch (err) {
      alert("Error joining game");
    }
  };

  const handleCancel = async (id) => {
    try {
      const res = await deleteGame(id);
      if (res.gameId) {
        const updatedGames = await getAllGames();
        setGames(updatedGames);
      } else {
        alert(res.message || "Failed to cancel game");
      }
    } catch (err) {
      alert("Error canceling game");
    }
  };

  const cardStyle = {
    background: 'rgba(51,51,51,0.9)',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,191,255,0.2)',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))',
    gap: '20px',
    marginTop: '10px'
  };
  const btn = {
    padding: '6px 12px',
    backgroundColor: '#00bfff',
    color: '#1a1a1a',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px'
  };

  return (
      <main className="main-container">
        <h1>All Games</h1>

        {/* Open Games */}
        <section>
          <h2>Open Games</h2>
          {openGames.length === 0 && <p>No open games.</p>}
          <div style={gridStyle}>
            {openGames.map(g => (
                <div key={g._id} style={cardStyle}>
                  <p>Host: {g.players[0].username}</p>
                  <p>Started: {new Date(g.startTime).toLocaleString()}</p>
                  <button onClick={() => handleJoin(g._id)} style={btn}>
                    Join
                  </button>
                </div>
            ))}
          </div>
        </section>

        {/* My Open Games */}
        <section>
          <h2>My Open Games</h2>
          {myOpenGames.length === 0 && <p>You have no open games.</p>}
          <div style={gridStyle}>
            {myOpenGames.map(g => (
                <div key={g._id} style={cardStyle}>
                  <Link to={`/game/${g._id}`} style={btn}>Continue</Link>
                  <button onClick={() => handleCancel(g._id)} style={btn}>
                    Cancel
                  </button>
                  <p>Started: {new Date(g.startTime).toLocaleString()}</p>
                </div>
            ))}
          </div>
        </section>

        {/* Active Games */}
        <section>
          <h2>Active Games</h2>
          {activeGames.length === 0 && <p>No active games.</p>}
          <div style={gridStyle}>
            {activeGames.map(g => (
                <div key={g._id} style={cardStyle}>
                  <p>{g.players.map(p => p.username).join(' vs ')}</p>
                  <p>Started: {new Date(g.startTime).toLocaleString()}</p>
                  <Link to={`/game/${g._id}`} style={btn}>View</Link>
                </div>
            ))}
          </div>
        </section>

        {/* Completed Games */}
        <section>
          <h2>Completed Games</h2>
          {completedGames.length === 0 && <p>No completed games.</p>}
          <div style={gridStyle}>
            {completedGames.map(g => (
                <div key={g._id} style={cardStyle}>
                  <p>{g.players.map(p => p.username).join(' vs ')}</p>
                  <p>Winner: {g.winner?.username || '—'}</p>
                  <Link to={`/game/${g._id}`} style={btn}>Details</Link>
                </div>
            ))}
          </div>
        </section>

        {/* Other Games */}
        <section>
          <h2>Other Games</h2>
          {otherGames.length === 0 && <p>No other games.</p>}
          <div style={gridStyle}>
            {otherGames.map(g => (
                <div key={g._id} style={cardStyle}>
                  <p>{g.players.map(p => p.username).join(' vs ')}</p>
                  <p>Started: {new Date(g.startTime).toLocaleString()}</p>
                  {g.status === 'Completed' && (
                      <p>Ended: {new Date(g.endTime).toLocaleString()}</p>
                  )}
                  <Link to={`/game/${g._id}`} style={btn}>
                    View
                  </Link>
                </div>
            ))}
          </div>
        </section>
      </main>
  );
}

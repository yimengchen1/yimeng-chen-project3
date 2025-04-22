import React, { useState, useEffect, useContext } from 'react';
import { getScores } from '../api/scores';
import { AuthContext } from '../context/AuthContext';

export default function HighScores() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useContext(AuthContext);

  useEffect(() => {
    async function fetchScores() {
      const data = await getScores();
      setScores(data);
      setLoading(false);
    }
    fetchScores();
  }, []);

  if (loading || authLoading) {
    return <p style={{ paddingTop: '80px', textAlign: 'center' }}>Loading...</p>;
  }

  return (
      <main className="main-container"
            style={{textAlign: 'center', color: '#fff'}}>
        <h1>High Scores</h1>
        <table style={{
          width: '80%', margin: '30px auto',
          borderCollapse: 'collapse', background: 'rgba(51,51,51,0.9)'
        }}>
          <thead>
          <tr>
            <th style={thStyle}>Rank</th>
            <th style={thStyle}>Player</th>
            <th style={thStyle}>Wins</th>
            <th style={thStyle}>Losses</th>
          </tr>
          </thead>
          <tbody>
          {scores.map((s, i) => (
              <tr key={s.username} style={{
                background: i % 2 === 0 ? 'rgba(0,0,0,0.6)' : 'transparent'
              }}>
                <td style={tdStyle}>{i + 1}</td>
                <td style={{
                  ...tdStyle,
                  fontWeight: s.username === user ? 'bold' : 'normal',
                  color: s.username === user ? '#00bfff' : '#fff'
                }}>{s.username}</td>
                <td style={tdStyle}>{s.wins}</td>
                <td style={tdStyle}>{s.losses}</td>
              </tr>
          ))}
          </tbody>
        </table>
      </main>
  );
}

const thStyle = {
  padding: '12px', border: '1px solid #00bfff',
  backgroundColor: '#333', color: '#00bfff', textAlign: 'center'
};

const tdStyle = {
  padding: '12px', border: '1px solid #00bfff',
  textAlign: 'center', color: '#fff'
};

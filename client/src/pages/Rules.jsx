import React from 'react';

export default function Rules() {
  return (
      <main style={styles.main}>
        <div style={styles.rulesContainer}>
          <h1>Rules</h1>
          <div style={styles.rulesContent}>
            <h3>How to Play Battleships</h3>
            <p>
              Battleship is a game of guessing, strategy and logical thought. Each player’s fleet includes 5 ships of different sizes (5, 4, 3, 3, and 2 squares). Ships are placed randomly on a 10x10 board.
            </p>
            <h3>Game Play</h3>
            <p>
              Players take turns guessing the coordinates of enemy ships by clicking on the opponent's board. Hits and misses are marked.
            </p>
            <h3>Victory</h3>
            <p>
              When one player has all their enemy ships sunk, the game is over and that player is declared the winner.
            </p>
            <h3>Multiplayer</h3>
            <p>
              You can start a new game or join an open game from the All Games page. Refresh to see opponent’s moves.
            </p>
          </div>
        </div>
      </main>
  );
}

const styles = {
  main: {
    paddingTop: '80px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  rulesContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    lineHeight: 1.8,
    fontSize: '1.1em',
    color: '#fff'
  },
  rulesContent: {
    background: 'rgba(0,191,255,0.1)',
    border: '1px solid #00bfff',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px 0',
    textAlign: 'left'
  }
};

import React from 'react';
import Tile from './Tile';

export default function Board({ board, onTileClick, isEnemy }) {
  return (
      <div style={styles.wrapper}>
        <h2 style={styles.title}>{isEnemy ? 'Enemy Board' : 'Your Board'}</h2>
        <table style={styles.table}>
          <thead>
          <tr>
            <th style={styles.header}></th>
            {board.map((_, i) => (
                <th key={i} style={styles.header}>{i + 1}</th>
            ))}
          </tr>
          </thead>
          <tbody>
          {board.map((row, r) => (
              <tr key={r}>
                <th style={styles.header}>{String.fromCharCode(65 + r)}</th>
                {row.map((cell, c) => (
                    <Tile
                        key={c}
                        cell={cell}
                        row={r}
                        col={c}
                        onTileClick={onTileClick}
                        isEnemy={isEnemy}
                    />
                ))}
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
}

const styles = {
  wrapper: {
    background: 'rgba(0,191,255,0.05)',
    border: '2px solid rgba(0,191,255,0.1)',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 0 20px rgba(0,191,255,0.1)',
    margin: '10px'
  },
  title: { textAlign: 'center', color: '#00bfff' },
  table: { borderCollapse: 'collapse', margin: '0 auto' },
  header: {
    width: '35px', height: '35px',
    border: '1px solid rgba(0,191,255,0.2)',
    textAlign: 'center', verticalAlign: 'middle',
    backgroundColor: 'rgba(51,51,51,0.8)',
    color: '#00bfff', padding: '5px'
  }
};

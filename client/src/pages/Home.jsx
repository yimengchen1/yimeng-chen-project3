import React from 'react';
import { Link } from 'react-router-dom';
import { FaShip, FaArrowDown } from 'react-icons/fa';

export default function Home() {
  return (
      <main style={styles.main}>
        <div style={styles.heroSection}>
          <FaShip style={styles.gameIcon} />
          <h1>Battleship Game</h1>
          <p>Play Battleship online with a modern HTML5 version.</p>
          <FaArrowDown style={styles.arrowIcon} />
          <div style={styles.buttonContainer}>
            <Link to="/games" style={styles.ctaButton}>
              <i className="fas fa-gamepad"></i> All Games
            </Link>
            <Link to="/new" style={styles.ctaButton}>
              <i className="fas fa-plus"></i> New Game
            </Link>
          </div>
        </div>
      </main>
  );
}

const styles = {
  main: {
    paddingTop: '80px', maxWidth: '1200px',
    margin: '0 auto', textAlign: 'center'
  },
  heroSection: { padding: '40px 20px', position: 'relative' },
  gameIcon: {
    fontSize: '5rem', color: '#00bfff',
    margin: '20px 0', opacity: 0.9
  },
  arrowIcon: {
    fontSize: '2rem', color: '#00bfff',
    marginBottom: '30px', animation: 'bounce 2s infinite'
  },
  buttonContainer: {
    display: 'flex', justifyContent: 'center',
    gap: '20px', flexWrap: 'wrap', marginTop: '30px'
  },
  ctaButton: {
    padding: '12px 30px', backgroundColor: '#00bfff',
    color: '#1a1a1a', textDecoration: 'none',
    borderRadius: '5px', fontWeight: 'bold',
    transition: 'background-color 0.3s'
  }
};

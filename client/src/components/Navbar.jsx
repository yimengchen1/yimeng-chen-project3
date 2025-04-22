import React, { useContext } from 'react';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { logout } from '../api/auth';
import { FaChevronDown } from 'react-icons/fa';

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const { user, setUser, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
      <header style={styles.header}>
        <nav>
          <ul style={styles.navList}>
            <li>
              <Link to="/" style={{ ...styles.link, ...(isActive('/') ? styles.active : {}) }}>
                Home
              </Link>
            </li>

            {!loading && user && (
                <>
                  <li>
                    <Link to="/new" style={styles.link}>New Game</Link>
                  </li>
                  <li>
                    <Link to="/games" style={{ ...styles.link, ...(isActive('/games') ? styles.active : {}) }}>
                      All Games
                    </Link>
                  </li>
                  <li>
                    <Link to="/high-scores" style={{ ...styles.link, ...(isActive('/high-scores') ? styles.active : {}) }}>
                      High Scores
                    </Link>
                  </li>
                  <li>
                    <Link to="/rules" style={{ ...styles.link, ...(isActive('/rules') ? styles.active : {}) }}>
                      Rules
                    </Link>
                  </li>
                  <li>
                    <span
                        style={styles.username}
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        {user} <FaChevronDown style={{ marginLeft: '4px' }} />
                    </span>
                    {showMenu && (
                        <ul style={styles.dropdown}>
                          <li>
                            <button onClick={handleLogout} style={styles.link}>
                              Sign Out
                            </button>
                          </li>
                        </ul>
                    )}
                  </li>
                </>
            )}

            {!loading && !user && (
                <>
                  <li>
                    <Link to="/login" style={{ ...styles.link, ...(isActive('/login') ? styles.active : {}) }}>
                      Log In
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" style={{ ...styles.link, ...(isActive('/register') ? styles.active : {}) }}>
                      Sign Up
                    </Link>
                  </li>
                </>
            )}
          </ul>
        </nav>
      </header>
  );
}

const styles = {
  header: {
    backgroundColor: '#333',
    padding: '10px 0',
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 1000
  },
  navList: {
    display: 'flex',
    justifyContent: 'center',
    listStyleType: 'none',
    gap: '20px',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  link: {
    background: 'none',
    border: 'none',
    color: '#00bfff',
    textDecoration: 'none',
    fontSize: '1em',
    cursor: 'pointer',
    padding: '5px 10px'
  },
  active: {
    backgroundColor: '#00bfff',
    color: '#fff',
    borderRadius: '4px'
  },
  username: {
    fontWeight: 'bold',
    color: '#fff'
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#333',
    listStyle: 'none',
    padding: '8px',
    marginTop: '4px',
    borderRadius: '4px'
  },
};


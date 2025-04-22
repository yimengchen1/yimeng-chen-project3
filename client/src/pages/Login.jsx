import React, { useState, useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const { user } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login(username, password);
    if (data.username) {
      setUser(data.username);
      navigate('/');

    } else {
      setError(data.message || 'Login failed');
    }
  };

  return (
      <div style={{ paddingTop: '80px', textAlign: 'center' }}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: 'auto' }}>
          <div>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
            />
          </div>
          <div>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Log In</button>
        </form>
      </div>
  );
}

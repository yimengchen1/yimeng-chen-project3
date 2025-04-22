import React, { useState, useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/auth';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const { user } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError('The passwords are inconsistent.');
      return;
    }
    const data = await register(username, password, passwordConfirm);
    if (data.username) {
      setUser(data.username);
      navigate('/');
    } else {
      setError(data.message || 'Registration failed');
    }
  };

  return (
      <div style={{ paddingTop: '80px', textAlign: 'center' }}>
        <h1>Register</h1>
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
          <div>
            <input
                type="password"
                placeholder="Confirm Password"
                value={passwordConfirm}
                onChange={e => setPasswordConfirm(e.target.value)}
                required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Sign Up</button>
        </form>
      </div>
  );
}

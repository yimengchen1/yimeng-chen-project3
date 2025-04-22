import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import NewGame from './pages/NewGame';
import Login from './pages/Login';
import Register from './pages/Register';
import Games from './pages/Games';
import GameDetail from './pages/GameDetail';
import HighScores from './pages/HighScores';
import Rules from './pages/Rules';

function RequireAuth({ children }) {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <p>Loading...</p>;
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/rules" element={<Rules />} />

          <Route
              path="/new"
              element={
                <RequireAuth>
                  <NewGame />
                </RequireAuth>
              }
          />
          <Route
              path="/games"
              element={
                <RequireAuth>
                  <Games />
                </RequireAuth>
              }
          />
          <Route path="/game/:gameId" element={<GameDetail />} />
          <Route
              path="/high-scores"
              element={
                <RequireAuth>
                  <HighScores />
                </RequireAuth>
              }
          />

          {/* Jump back to the home page when it does not match. */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
  );
}
export default App;

const isLocalhost = window.location.hostname === 'localhost';
const API_BASE = isLocalhost
    ? 'http://localhost:4000'
    : 'https://yimeng-chen-project3-backend.onrender.com';

const API_URL = `${API_BASE}/api/games`;


export async function getAllGames() {
  const resp = await fetch(`${API_URL}`, {
    method: 'GET',
    credentials: 'include'
  });
  return resp.json();
}

export async function createGame() {
  const resp = await fetch(`${API_URL}`, {
    method: 'POST',
    credentials: 'include'
  });
  return resp.json();
}

export async function deleteGame(gameId) {
  const resp = await fetch(`${API_URL}/${gameId}`, {
    method: 'DELETE',
    credentials: 'include'
  });
  return resp.json();
}

export async function joinGame(gameId) {
  const resp = await fetch(`${API_URL}/${gameId}/join`, {
    method: 'PUT',
    credentials: 'include'
  });
  return resp.json();
}

export async function getGameById(gameId) {
  const resp = await fetch(`${API_URL}/${gameId}`, {
    method: 'GET',
    credentials: 'include'
  });
  return resp.json();
}

export async function move(gameId, row, col) {
  const resp = await fetch(`${API_URL}/${gameId}/move`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ row, col })
  });
  if (!resp.ok) {
    const err = await resp.json();
    throw new Error(err.message || 'Move request failed');
  }
  return resp.json();
}

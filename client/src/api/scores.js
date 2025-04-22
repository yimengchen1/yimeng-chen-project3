const isLocalhost = window.location.hostname === 'localhost';
const API_BASE = isLocalhost
    ? 'http://localhost:4000'
    : 'https://yimeng-chen-project3-backend.onrender.com';

const API_URL = `${API_BASE}/api/games`;


export async function getScores() {
  const resp = await fetch(API_URL, {
    method: 'GET',
    credentials: 'include'
  });
  return resp.json();
}

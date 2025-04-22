const API_URL = 'http://localhost:4000/api/auth';

// Sign in
export async function register(username, password, passwordConfirm) {
  const resp = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password, passwordConfirm })
  });
  return resp.json();
}

// Log in
export async function login(username, password) {
  const resp = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password })
  });
  return resp.json();
}

// Log out
export async function logout() {
  const resp = await fetch(`${API_URL}/logout`, {
    method: 'POST',
    credentials: 'include'
  });
  return resp.json();
}

// Retrieve the current logged-in user
export async function getCurrentUser() {
  const resp = await fetch(`${API_URL}/me`, {
    method: 'GET',
    credentials: 'include'
  });
  if (resp.status === 200) {
    return resp.json();
  }
  return null;
}

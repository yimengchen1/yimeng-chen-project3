const API_URL = 'http://localhost:4000/api/scores';

export async function getScores() {
  const resp = await fetch(API_URL, {
    method: 'GET',
    credentials: 'include'
  });
  return resp.json();
}

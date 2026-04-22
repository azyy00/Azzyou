const API = 'https://api.jikan.moe/v4';
const DELAY = 380; // ms between requests

let lastCall = 0;

export async function apiFetch(endpoint: string) {
  const now = Date.now();
  const wait = Math.max(0, DELAY - (now - lastCall));
  await new Promise(r => setTimeout(r, wait));
  lastCall = Date.now();
  
  try {
    const res = await fetch(API + endpoint);
    if (res.status === 429) {
      await new Promise(r => setTimeout(r, 1200));
      return apiFetch(endpoint); // retry once
    }
    const data = await res.json();
    return data;
  } catch(e) { 
    return { data: [] }; 
  }
}

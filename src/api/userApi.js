const API_URL = import.meta.env.VITE_API_URL;

export async function login(username, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ username, password }),
  });
  if (!res.ok) throw new Error('登入失敗');
  return res.json();
}

export async function getUser(username, token) {
    const res = await fetch(`${API_URL}/user/?username=${username}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });
    if (!res.ok) throw new Error('無法取得使用者資料');
    return res.json();
  }
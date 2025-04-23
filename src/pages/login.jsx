// src/pages/Login.jsx
import { useState } from "react";
import { login } from "../api/userApi";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      setToken(data.access_token);
      localStorage.setItem("token", data.access_token);
      setError(null);
    } catch (err) {
      setError("登入失敗，請檢查帳號密碼");
      setToken(null);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 rounded-xl shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">登入</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">帳號：</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block">密碼：</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {token && (
          <div className="text-green-600 text-sm">登入成功！Token 已儲存</div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          登入
        </button>
      </form>
    </div>
  );
}

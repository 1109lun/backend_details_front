// src/pages/Login.jsx
import { useState } from "react";
import { login, getUser, updateUser } from "../api/userApi";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [editData, setEditData] = useState({ password: "", birthday: "" });
  const [editMessage, setEditMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      localStorage.setItem("token", data.access_token);

      const user = await getUser(username, data.access_token);
      setUserInfo(user);
      setError(null);
    } catch (err) {
      setError("登入失敗，請檢查帳號密碼");
      setUserInfo(null);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await updateUser(editData, token);
      setEditMessage("使用者資料已更新");
      setEditData({ password: "", birthday: "" });
    } catch (err) {
      setEditMessage("更新失敗");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserInfo(null);
    setUsername("");
    setPassword("");
    navigate("/");
  };

  if (userInfo) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 rounded-xl shadow-lg bg-white space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">使用者資料</h2>
          <p><strong>帳號：</strong> {userInfo.username}</p>
          <p><strong>生日：</strong> {userInfo.birthday}</p>
          <p><strong>建立時間：</strong> {userInfo.create_time}</p>
          <p><strong>最後登入：</strong> {userInfo.last_login}</p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <h3 className="text-xl font-semibold">更新資料</h3>
          <div>
            <label className="block">新密碼：</label>
            <input
              type="password"
              name="password"
              value={editData.password}
              onChange={(e) => setEditData({ ...editData, password: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block">新生日：</label>
            <input
              type="date"
              name="birthday"
              value={editData.birthday}
              onChange={(e) => setEditData({ ...editData, birthday: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          {editMessage && <div className="text-green-600 text-sm">{editMessage}</div>}
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            送出更新
          </button>
        </form>

        <div className="text-sm">
          <button
            onClick={handleLogout}
            className="text-blue-600 underline mt-4"
          >
            回首頁
          </button>
        </div>
      </div>
    );
  }

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
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          登入
        </button>
        <p className="text-sm mt-2">
          沒有帳號？<Link to="/register" className="text-blue-600 underline">前往註冊</Link>
        </p>
      </form>
    </div>
  );
}

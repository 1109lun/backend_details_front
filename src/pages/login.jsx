import { useState } from "react";
import { login, getUser, updateUser, deleteUser } from "../api/userApi";
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

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await deleteUser(userInfo.username, token);
      alert("帳號已刪除");
      handleLogout();
    } catch (err) {
      alert("刪除失敗");
    }
  };

  if (userInfo) {
    return (
      <div className="login-container">
        <div className="user-info">
          <h2>使用者資料</h2>
          <p><strong>帳號：</strong> {userInfo.username}</p>
          <p><strong>生日：</strong> {userInfo.birthday}</p>
          <p><strong>建立時間：</strong> {userInfo.create_time}</p>
          <p><strong>最後登入：</strong> {userInfo.last_login}</p>
        </div>

        <form onSubmit={handleUpdate} className="update-form">
          <h3>更新資料</h3>
          <div className="form-group">
            <label>新密碼：</label>
            <input
              type="password"
              name="password"
              value={editData.password}
              onChange={(e) => setEditData({ ...editData, password: e.target.value })}
              className="input"
            />
          </div>
          <div className="form-group">
            <label>新生日：</label>
            <input
              type="date"
              name="birthday"
              value={editData.birthday}
              onChange={(e) => setEditData({ ...editData, birthday: e.target.value })}
              className="input"
            />
          </div>
          {editMessage && <div className="message success">{editMessage}</div>}
          <button type="submit" className="btn btn-warning">送出更新</button>
        </form>

        <div className="action-buttons">
          <button onClick={handleLogout} className="btn btn-link">回首頁</button>
          <button onClick={handleDelete} className="btn btn-danger">刪除帳號</button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <h2>登入頁面</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>帳號：</label>
          <input
            type="text"
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>密碼：</label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="message error">{error}</div>}
        <button type="submit" className="btn btn-primary">登入</button>
        <p className="register-link">
          沒有帳號？<Link to="/register">前往註冊</Link>
        </p>
      </form>
    </div>
  );
}

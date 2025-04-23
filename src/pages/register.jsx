import { useState } from "react";
import { registerUser } from "../api/userApi";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    birthday: "",
  });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      setSuccess("註冊成功，請返回登入頁面登入。");
      setError(null);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <div className="login-container">
      <h2>註冊帳號</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>帳號：</label>
          <input
            type="text"
            name="username"
            className="input"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>密碼：</label>
          <input
            type="password"
            name="password"
            className="input"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>生日：</label>
          <input
            type="date"
            name="birthday"
            className="input"
            value={formData.birthday}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className="message error">{error}</div>}
        {success && (
          <div className="message success">
            {success} <Link to="/" className="btn-link">返回登入</Link>
          </div>
        )}
        <button type="submit" className="btn btn-success">註冊</button>
      </form>
    </div>
  );
}

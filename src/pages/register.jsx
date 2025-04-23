// src/pages/Register.jsx
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
    <div className="max-w-md mx-auto mt-20 p-6 rounded-xl shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">註冊帳號</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">帳號：</label>
          <input
            type="text"
            name="username"
            className="w-full border px-3 py-2 rounded"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block">密碼：</label>
          <input
            type="password"
            name="password"
            className="w-full border px-3 py-2 rounded"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block">生日：</label>
          <input
            type="date"
            name="birthday"
            className="w-full border px-3 py-2 rounded"
            value={formData.birthday}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && (
          <div className="text-green-600 text-sm">
            {success} <Link to="/" className="underline text-blue-600">返回登入</Link>
          </div>
        )}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          註冊
        </button>
      </form>
    </div>
  );
}

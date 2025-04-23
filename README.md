# 📘 React 前端整合 FastAPI 說明文件

本專案為練習專案，使用 React + Vite 製作前端，串接 FastAPI 提供的 RESTful API，完成完整的使用者管理功能。

---

## ✅ 功能總覽

### 1. 使用者登入（`POST /login`）
- 表單輸入帳號與密碼
- 登入成功後：
  - 儲存 JWT token 至 `localStorage`
  - 立即顯示使用者資訊（帳號 / 生日 / 建立時間 / 最後登入）

### 2. 註冊帳號（`POST /user/`）
- 註冊表單欄位：帳號、密碼、生日
- 成功後顯示註冊成功提示，並可導回登入頁

### 3. 查詢使用者資訊（`GET /user/`）
- 登入成功後自動呼叫
- 帶入 token 驗證身份

### 4. 更新密碼與生日（`PATCH /user/`）
- 表單輸入新密碼或生日（二者皆為選填）
- 更新成功後顯示提示訊息

### 5. 刪除帳號（`DELETE /user/`）
- 按鈕觸發帳號刪除
- 成功後自動登出並導回登入畫面

### 6. 登出 / 回首頁
- 清除 localStorage token
- 清除登入狀態與表單欄位
- 導回登入畫面

---

## 🚀 技術說明

- 前端框架：React 18 + Vite
- UI 樣式：Tailwind CSS（基礎樣式）
- 路由系統：React Router v6
- API 呼叫：Fetch API
- 狀態管理：useState + localStorage

---

## 📂 頁面結構

| 頁面路由 | 功能描述 |
|-----------|-----------|
| `/`       | 登入頁面 / 使用者資訊 / 更新 & 刪除功能 |
| `/register` | 使用者註冊畫面 |

---

## 📦 開發與啟動

### 安裝依賴
```bash
npm install
```

### 啟動開發伺服器
```bash
npm run dev
```

伺服器將於 http://localhost:5173 自動啟動。

---

## 🌐 與後端整合（FastAPI）

- `.env` 中設定：
```env
VITE_API_URL=http://localhost:8000
```
- 須確保 FastAPI 伺服器正在運作，並允許 CORS 請求：
```python
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 📎 目錄結構（簡略）

```
react-frontend/
├── src/
│   ├── api/userApi.js          # 所有 fetch API
│   ├── pages/Login.jsx         # 登入/更新/刪除功能
│   ├── pages/Register.jsx      # 註冊頁面
│   └── App.jsx                 # Router 設定
├── .env                        # API base URL 設定
└── README.md                   # 說明文件
```

---
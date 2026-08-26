# Express Sequelize — Product Management System

> **Full-stack CRUD application**: Express.js + Sequelize (PostgreSQL) backend with React + Vite + TailwindCSS frontend.

---

## 📋 Summary of Changes

| Area | What Changed |
|------|-------------|
| **Frontend Architecture** | แยก API Layer ออกเป็น `services/productService.js` สำหรับ separation of concerns |
| **State Management** | เพิ่ม Custom Hook `hooks/useProducts.js` จัดการ loading, error, CRUD state ทั้งหมด |
| **UI / CRUD** | ปรับปรุง `pages/ProductPage.jsx` ให้รองรับ Create, Read, Update, Delete ครบถ้วน ด้วย Design System เดิม (glassmorphism, video background) |
| **Toast Notification** | เพิ่ม `components/common/Toast.jsx` แสดง feedback สำเร็จ/ล้มเหลวหลังทุก operation |
| **Confirm Modal** | เพิ่ม `components/common/ConfirmModal.jsx` ยืนยันก่อนลบสินค้า (ป้องกันการลบโดยไม่ตั้งใจ) |
| **Routing** | แยก Landing Page (`/`) และ Product Page (`/products`) ออกจากกัน เพิ่มลิงก์ใน Navbar |
| **Error Handling** | รองรับ Network failure, 404, validation errors ทั้งฝั่ง form และ API response |
| **Tests** | เพิ่ม Unit Tests สำหรับ `productService` และ UI Components ด้วย Vitest |

---

## 🔌 Backend API Endpoints

Base URL: `http://localhost:5000`

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|-------------|----------|
| `GET` | `/` | Health check | — | `{ message: "Welcome to the Product API" }` |
| `GET` | `/products` | ดึงสินค้าทั้งหมด | — | `Product[]` (เรียงตาม id ASC) |
| `GET` | `/products/:id` | ดึงสินค้าตาม ID | — | `Product` หรือ 404 |
| `POST` | `/products` | เพิ่มสินค้าใหม่ | `{ name, price }` | `Product` (201) |
| `PUT` | `/products/:id` | อัปเดตสินค้า | `{ name?, price? }` | `Product` (200) หรือ 404 |
| `DELETE` | `/products/:id` | ลบสินค้า | — | 204 No Content หรือ 404 |

### Product Model

```json
{
  "id": 1,
  "name": "iPhone 15 Pro",
  "price": 43900.00,
  "createdAt": "2026-07-23T09:00:00.000Z",
  "updatedAt": "2026-07-23T09:00:00.000Z"
}
```

---

## 🗂️ Project Structure

```
express-sequelize/
├── backend/
│   ├── db.js                   # Sequelize config + Product model
│   ├── index.js                # Express app + API routes
│   ├── docker-compose.yml      # PostgreSQL via Docker
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── services/
    │   │   └── productService.js     # ★ API Layer (axios)
    │   ├── hooks/
    │   │   └── useProducts.js        # ★ CRUD State Hook
    │   ├── components/
    │   │   ├── common/
    │   │   │   ├── Toast.jsx         # ★ Toast Notification
    │   │   │   └── ConfirmModal.jsx  # ★ Delete Confirmation Modal
    │   │   ├── layout/
    │   │   │   └── Navbar.jsx        # (Updated: เพิ่มลิงก์ Products)
    │   │   └── SocialBtn.jsx
    │   ├── pages/
    │   │   └── ProductPage.jsx       # ★ Full CRUD UI
    │   ├── routes/
    │   │   └── AppRoutes.jsx         # (Updated: แยก / และ /products)
    │   ├── tests/
    │   │   ├── setup.js              # ★ Vitest setup
    │   │   ├── productService.test.js # ★ Service unit tests
    │   │   └── components.test.jsx   # ★ Component unit tests
    │   └── App.jsx                   # Landing Page (คงเดิม)
    └── vite.config.js                # (Updated: เพิ่ม test config)
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18.x
- **Docker Desktop** (สำหรับ PostgreSQL)

---

### 1. เริ่ม Database (Docker)

```bash
cd backend
docker-compose up -d
```

ตรวจสอบว่า PostgreSQL พร้อมใช้งานที่ port `5433`

---

### 2. รัน Backend Server

```bash
cd backend
npm install
npm run dev        # nodemon (auto-reload)
# หรือ
npm start          # production mode
```

Server จะรันที่: **http://localhost:5000**

---

### 3. รัน Frontend

```bash
cd Frontend
npm install
npm run dev
```

Frontend จะรันที่: **http://localhost:5173**

- `/` → Landing Page (contact form)
- `/products` → Product Management (CRUD)

---

## 🧪 Running Tests

```bash
cd Frontend

# รัน tests ทั้งหมด (one-shot)
npm test

# รัน tests แบบ watch mode (auto re-run เมื่อแก้ไขไฟล์)
npm run test:watch

# เปิด Vitest UI Dashboard
npm run test:ui

# รันพร้อม coverage report
npm run coverage
```

### Test Coverage

| Test File | Scope |
|-----------|-------|
| `productService.test.js` | Unit tests สำหรับทุก API endpoint (GET all, GET by id, POST, PUT, DELETE) รวม error cases |
| `components.test.jsx` | Unit tests สำหรับ `Toast` และ `ConfirmModal` ครอบคลุม rendering, interactions, loading states |

---

## ⚙️ Environment Variables

### Frontend (`Frontend/.env`)

```env
VITE_API_URL=http://localhost:5000
```

> หากไม่ตั้งค่า `VITE_API_URL` จะ fallback เป็น `http://localhost:5000` โดยอัตโนมัติ

### Backend (`backend/.env`)

> ปัจจุบัน DB credentials ถูก hardcode ใน `db.js` (port 5433)

---

## 🎨 Design System

- **Theme**: Dark glassmorphism บน Video background
- **Font**: Inter + Instrument Serif (Google Fonts)
- **Framework**: TailwindCSS v3
- **Icons**: lucide-react v0.314.0
- **Animation**: Tailwind transitions + CSS spin animations

---

## 🐛 Known Issues & Fixes Applied

| Issue | Fix |
|-------|-----|
| `lucide-react` 504 cache error | เพิ่ม `optimizeDeps.force: true` และ `optimizeDeps.include` ใน vite.config.js |
| `MaxListenersExceededWarning` | เพิ่ม `events.EventEmitter.defaultMaxListeners = 30` |
| `Instagram` export not found | ดาวน์เกรด lucide-react เป็น v0.314.0 ที่เข้ากันได้กับ React 18 |

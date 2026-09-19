# 🚀 Backend - Product Management RESTful API

ระบบ RESTful API สำหรับบริหารจัดการข้อมูลสินค้า (Product Management) พัฒนาด้วย **Node.js**, **Express.js (v5)**, **Sequelize ORM** และเชื่อมต่อฐานข้อมูล **PostgreSQL** (รองรับทั้ง Neon Tech Cloud DB และ Local Docker PostgreSQL)

---

## 🛠️ เทคโนโลยีที่ใช้งาน (Tech Stack)

- **Runtime:** Node.js (ES Modules `"type": "module"`)
- **Web Framework:** Express.js (v5.x)
- **ORM:** Sequelize (v6.x)
- **Database Driver:** pg (node-postgres) & pg-hstore
- **Database:** PostgreSQL (Neon Cloud / Docker Compose Container)
- **Cross-Origin Handling:** CORS
- **Environment Management:** Dotenv
- **Dev Tool:** Nodemon (Auto-restart server on file change)

---

## 📁 โครงสร้างโปรเจกต์ (Directory Structure)

```text
BackEnd-Product/
└── backend/
    ├── .env                  # ไฟล์เก็บ Environment Variables (ห้าม commit)
    ├── .env.example          # ตัวอย่างการตั้งค่า Environment Variables
    ├── .gitignore            # กำหนดไฟล์ที่ไม่ต้องติดตามใน Git
    ├── db.js                 # เชื่อมต่อ Database, กำหนด Schema Model และ Auto Sync
    ├── docker-compose.yml    # ตั้งค่ารัน PostgreSQL Container ในเครื่อง (Local)
    ├── index.js              # Entry point ของ Server และ Endpoint Routing ทั้งหมด
    ├── package.json          # กำหนด Dependencies และ Scripts
    └── README.md             # เอกสารคู่มือการใช้งาน Backend
```

---

## 🏗️ ขั้นตอนการสร้างโปรเจกต์ตั้งแต่เริ่มต้น (Step-by-Step Setup from Scratch)

หากต้องการสร้างโปรเจกต์นี้ใหม่ตั้งแต่คำสั่งแรก ให้ทำตามขั้นตอนดังนี้:

### 1. สร้างโฟลเดอร์โปรเจกต์และเริ่ม Node.js
```bash
# สร้างโฟลเดอร์และเข้าไปในโฟลเดอร์
mkdir backend
cd backend

# สั่งสร้าง package.json ค่าเริ่มต้น
npm init -y

# กำหนดให้โปรเจกต์ใช้ ES Modules (import/export)
npm pkg set type="module"
```

### 2. ติดตั้ง Dependencies ที่จำเป็น
```bash
# Production Dependencies
npm install express sequelize pg pg-hstore cors dotenv

# Development Dependencies (สำหรับ Auto Reload)
npm install -D nodemon
```

### 3. ตั้งค่า Scripts ใน `package.json`
เปิดไฟล์ `package.json` และเพิ่ม scripts:
```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

---

## ⚙️ การตั้งค่า Environment Variables (`.env`)

เข้าไปในโฟลเดอร์ `backend/` และสร้างไฟล์ `.env` โดยคัดลอกจาก `.env.example`:

```bash
cd backend
cp .env.example .env
```

เนื้อหาภายใน `.env`:

```env
# สำหรับเชื่อมต่อ Neon Cloud PostgreSQL (มี SSL)
DATABASE_URL_UNPOOLED="postgresql://<username>:<password>@<neon-hostname>/<dbname>?sslmode=require"

# พอร์ตสำหรับรัน Backend Server
PORT=5000
```

> [!NOTE]
> หากใช้ Docker ในเครื่อง ให้ใช้ URL:  
> `DATABASE_URL_UNPOOLED="postgresql://dev_user:dev_password@localhost:5433/product_db"`  
> *(และอาจปิด `ssl: { require: true }` ใน `db.js` หากฐานข้อมูล local ไม่ได้เปิดใช้ SSL)*

---

## 🗄️ การเตรียมฐานข้อมูล (Database Setup)

เลือกระหว่าง **Option A (Neon Cloud - แนะนำ)** หรือ **Option B (Docker Local)**:

### ทางเลือก A: Neon Cloud PostgreSQL (ใช้งานตาม Code ปัจจุบัน)
1. สมัครใช้งานที่ [Neon.tech](https://neon.tech/)
2. สร้าง Project และ Database ใหม่
3. คัดลอก **Connection String** (โหมด Direct / Unpooled)
4. วางลงในค่า `DATABASE_URL_UNPOOLED` ในไฟล์ `.env`

### ทางเลือก B: Local PostgreSQL ด้วย Docker Compose
หากต้องการรัน Database บนเครื่องตัวเองผ่าน Docker:
```bash
cd backend

# สั่ง Start Docker Container PostgreSQL ใน Background
docker compose up -d

# ตรวจสอบสถานะการทำงาน
docker compose ps

# เมื่อต้องการหยุดการทำงาน
docker compose down
```

---

## 💻 อธิบายโค้ดหลัก (Core Code Explained)

### 1. `db.js` - เชื่อมต่อและกำหนด Model
- ใช้ `Sequelize` เชื่อมต่อผ่าน `DATABASE_URL_UNPOOLED`
- ตั้งค่า `ssl: { require: true, rejectUnauthorized: false }` เพื่อให้รองรับ Neon Cloud
- กำหนดโมเดล `Product`:
  - `id`: INTEGER, Primary Key, Auto Increment
  - `name`: STRING, Not Null
  - `price`: FLOAT, Not Null
- ฟังก์ชัน `connectDB()` สั่ง `sequelize.sync({ alter: true })` เพื่อสร้างหรืออัปเดต Table ในฐานข้อมูลให้อัตโนมัติ

### 2. `index.js` - กำหนด RESTful API Endpoints
- เปิดใช้ `cors()` เพื่อให้ Frontend เรียกใช้งานข้าม Port ได้
- เปิดใช้ `express.json()` เพื่อแปลง Body JSON เข้ามาเป็น `req.body`
- รัน Server ที่ `http://localhost:5000`

---

## 🔌 รายละเอียด API Endpoints (API Documentation)

### Base URL: `http://localhost:5000`

| Method | Endpoint | คำอธิบาย | Status Success |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | ตรวจสอบสถานะ Service (Health Check) | `200 OK` |
| **GET** | `/products` | ดึงรายการสินค้าทั้งหมด (เรียงตาม id) | `200 OK` |
| **GET** | `/products/:id` | ดึงข้อมูลสินค้าชิ้นเดียวตาม id | `200 OK` |
| **POST** | `/products` | เพิ่มสินค้าใหม่เข้าสู่ระบบ | `201 Created` |
| **PUT** | `/products/:id` | แก้ไขข้อมูลสินค้าตาม id | `200 OK` |
| **DELETE** | `/products/:id` | ลบข้อมูลสินค้าตาม id | `200 OK` |

---

### ตัวอย่าง Request & Response ในแต่ละ Endpoint

#### 1. เพิ่มสินค้าใหม่ (Create Product)
- **Method:** `POST`
- **URL:** `/products`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "name": "Keyboard Mechanical RGB",
  "price": 2590.00
}
```
- **Response (201 Created):**
```json
{
  "id": 1,
  "name": "Keyboard Mechanical RGB",
  "price": 2590,
  "updatedAt": "2026-09-19T05:50:00.000Z",
  "createdAt": "2026-09-19T05:50:00.000Z"
}
```

#### 2. ดึงรายการสินค้าทั้งหมด (Get All Products)
- **Method:** `GET`
- **URL:** `/products`
- **Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Keyboard Mechanical RGB",
    "price": 2590,
    "createdAt": "2026-09-19T05:50:00.000Z",
    "updatedAt": "2026-09-19T05:50:00.000Z"
  }
]
```

#### 3. ดึงสินค้าตาม ID (Get Product by ID)
- **Method:** `GET`
- **URL:** `/products/1`
- **Response (200 OK):**
```json
{
  "id": 1,
  "name": "Keyboard Mechanical RGB",
  "price": 2590,
  "createdAt": "2026-09-19T05:50:00.000Z",
  "updatedAt": "2026-09-19T05:50:00.000Z"
}
```

#### 4. แก้ไขข้อมูลสินค้า (Update Product)
- **Method:** `PUT`
- **URL:** `/products/1`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "name": "Keyboard Mechanical RGB (Wireless)",
  "price": 2990.00
}
```
- **Response (200 OK):**
```json
{
  "id": 1,
  "name": "Keyboard Mechanical RGB (Wireless)",
  "price": 2990,
  "createdAt": "2026-09-19T05:50:00.000Z",
  "updatedAt": "2026-09-19T05:55:00.000Z"
}
```

#### 5. ลบสินค้า (Delete Product)
- **Method:** `DELETE`
- **URL:** `/products/1`
- **Response (200 OK):**
```json
{
  "message": "Product deleted successfully"
}
```

---

## 🧪 การทดสอบด้วย cURL (Testing with cURL)

```bash
# 1. เช็คสถานะ API
curl -X GET http://localhost:5000/

# 2. สร้างสินค้า
curl -X POST http://localhost:5000/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Gaming Mouse", "price": 1290}'

# 3. ดึงรายการสินค้าทั้งหมด
curl -X GET http://localhost:5000/products

# 4. แก้ไขข้อมูลสินค้า ID 1
curl -X PUT http://localhost:5000/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price": 1190}'

# 5. ลบสินค้า ID 1
curl -X DELETE http://localhost:5000/products/1
```

---

## ▶️ คำสั่งสำหรับรันโปรเจกต์ (Run Commands)

```bash
cd backend

# รันในโหมด Development (มี Auto Reload เมื่อแก้โค้ด)
npm run dev

# รันในโหมด Production
npm start
```
เมื่อรันสำเร็จ จะปรากฏข้อความบน Terminal:
```text
Neon PostgreSQL connected successfully!
Tables synchronized successfully
Server running at http://localhost:5000
```

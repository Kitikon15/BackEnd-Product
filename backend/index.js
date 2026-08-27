// import express and table Product , function connectDB form db.js
import express from "express";
import { Product, connectDB } from "./db.js";
import cors from "cors";

// กำหนดตัวแปร
const app = express();
const PORT = 5000;

app.use(cors());
// แปลงให้เป็น json
app.use(express.json());

// connect database
connectDB();

app.get("/", (req, res) => {
  return res
    .status(200)
    .send("<h1>Wellcome to My RESTful API using Sequelize</h1>");
});

app.get("/api/products", async (req, res) => {
  try {
    // ดึงข้อมูลทั้งหมดจาก table Product
    const products = await Product.findAll();

    return res.status(200).json(products);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// async ให้รอ await
app.get("/api/products/:id", async (req, res) => {
  try {
    // แปลง id จาก string เป็น number
    const productId = Number(req.params.id);

    // ค้นหา product ที่มี id ตรงกับที่ขอมา await ให้รอทำให้เสร็จก่อน
    const product = await Product.findByPk(productId);

    // ถ้าไม่เจอ ให้ตอบกลับ 404 และ return ออกจาก function เลย
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ถ้าเจอ ส่งข้อมูลกลับไป
    return res.status(200).json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    // รับค่า name price จาก user
    const { name, price } = req.body;

    // ตรวจสอบว่ามี name และ price หรือไม่
    if (!name || !price) {
      return res.status(400).json({ message: "Please provide name and price" });
    }

    // สร้าง product ใหม่ await ให้รอทำให้เสร็จก่อน
    const product = await Product.create({
      name: name,
      price: Number(price),
    });

    return res.status(201).json({ message: "Product created", data: product });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    // แปลง id จาก string เป็น number
    const productId = Number(req.params.id);

    // รับค่าใหม่จาก body (จะส่งมาแค่บางฟิลด์ก็ได้)
    const { name, price } = req.body;

    // หา product ที่จะแก้ไขก่อน
    const product = await Product.findByPk(productId);

    // ถ้าไม่เจอส่ง 404
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // อัปเดตค่า ถ้าไม่ส่งมาให้ใช้ค่าเดิม
    product.name = name || product.name;
    product.price = price ? Number(price) : product.price;

    // บันทึกลง database จริง
    await product.save();

    return res.status(200).json({ message: "Product updated", data: product });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    // แปลง id จาก string เป็น number
    const productId = Number(req.params.id);

    // หา product ที่จะลบก่อน
    const product = await Product.findByPk(productId);

    // ถ้าไม่เจอส่ง 404
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ลบออกจาก database จริง
    await product.destroy();

    return res.status(200).json({ message: "Product deleted", data: product });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// รอฟังที่ PORT และ แสดงว่าโชที่ PORT ไหน
app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});

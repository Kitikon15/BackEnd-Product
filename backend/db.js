import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";

// โหลดค่าจากไฟล์ .env
dotenv.config();

const  databaseUrl = process.env.DATABASE_URL_UNPOOLED;

if (!databaseUrl) {
    throw new Error("DATABASE_URL is required");
}

// ดึงค่าจาก process.env ตามชื่อในไฟล์ .env ของคุณ
const dbName = process.env.PGDATABASE;
const dbUser = process.env.PGUSER;
const dbPassword = process.env.PGPASSWORD;
const dbHost = process.env.PGHOST; // หรือใช้ PGHOST_UNPOOLED
const dbPort = process.env.PORT || 5432;

// สร้างการเชื่อมต่อ PostgreSQL กับ Neon Cloud
const sequelize = new Sequelize(
    databaseUrl,
    {
        dialect: "postgres",
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    }
);

// สร้าง Model Product
const Product = sequelize.define("Product", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

// เชื่อมต่อและสร้างตาราง
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Neon PostgreSQL connected successfully!");

        await sequelize.sync({ alter: true });
        console.log("Tables synchronized successfully");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
};

export { sequelize, Product, connectDB };
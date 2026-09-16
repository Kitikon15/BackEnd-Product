import { Sequelize, DataTypes } from "sequelize";


const dbName = process.env.PGDATABASE;
const dbUser = process.env.PGUSER;
const dbPassword = process.env.PGPASSWORD;
const dbURL = process.env.PGHOST_UNPOOLED;
const dbPort = process.env.PORT;

// const dbURLUnpooled = process.env.DATABASE_URL_UNPOOLED;

// สร้างการเชื่อมต่อ PostgreSQL
const sequelize = new Sequelize(
    dbName,
    dbUser,
    dbPassword,
    {
        host: dbURL,
        port: dbPort,
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
        console.log("PostgreSQL connected successfully");

        await sequelize.sync({ alter: true });
        console.log("Tables synchronized successfully");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
};

export { sequelize, Product, connectDB };
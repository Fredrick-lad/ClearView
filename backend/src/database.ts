import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const poolConfig = process.env.MYSQL_ADDON_URI 
  ? {
      uri: process.env.MYSQL_ADDON_URI,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    }
  : {
      host: process.env.DB_HOST || process.env.MYSQL_ADDON_HOST || "",
      user: process.env.DB_USER || process.env.MYSQL_ADDON_USER || "",
      password: process.env.DB_PASS || process.env.MYSQL_ADDON_PASSWORD || "",
      database: process.env.DB_NAME || process.env.MYSQL_ADDON_DB || "",
      port: parseInt(process.env.DB_PORT || process.env.MYSQL_ADDON_PORT || "3306"),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    };

const pool = mysql.createPool(poolConfig);

export default pool;

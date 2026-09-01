import dotenv from "dotenv";
import app from "./app";
import pool from "./config/mysql";
import connectMongoDB from "./config/mongodb";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await pool.query("SELECT 1");

    console.log("MySQL connected");

    await connectMongoDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
  }
};

startServer();
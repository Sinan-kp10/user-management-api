import express from "express";
import adminRoutes from "./routes/admin.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(express.json());

app.use("/admin", adminRoutes)
app.use("/auth", authRoutes)

export default app;
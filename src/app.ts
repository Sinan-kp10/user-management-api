import express from "express";
import adminRoutes from "./routes/admin.routes";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(express.json());

app.use("/admin", adminRoutes)
app.use("/user", userRoutes)
app.use("/auth", authRoutes)

export default app;
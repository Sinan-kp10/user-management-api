import express from "express";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

export default app;
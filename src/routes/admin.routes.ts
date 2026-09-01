import { Router } from "express";
import adminController from "../controllers/admin.controller";

const router = Router();

router.post("/users", adminController.createUser.bind(adminController))
router.get("/users",adminController.getAllUsers.bind(adminController))
router.get("/users/:id",adminController.getUserById.bind(adminController))
router.put( "/users/:id",adminController.updateUser.bind(adminController))
router.delete("/users/:id",adminController.deleteUser.bind(adminController))
export default router;
import { Router } from "express";
import authController from "../controllers/auth.controller";
import { loginSchema, registerSchema } from "../validations/auth.validation";
import validationMiddleware from "../middleware/validation.middleware";

const router = Router();

router.post("/register",validationMiddleware.validate(registerSchema), authController.register.bind(authController))
router.post("/login",validationMiddleware.validate(loginSchema), authController.login.bind(authController));

export default router
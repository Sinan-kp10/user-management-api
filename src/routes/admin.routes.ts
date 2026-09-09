import { Router } from "express";
import adminController from "../controllers/admin.controller";
import authMiddleware from "../middleware/auth.middleware";
import roleMiddleware from "../middleware/role.middleware";
import validationMiddleware from "../middleware/validation.middleware";
import { registerSchema } from "../validations/auth.validation";

const router = Router();

router.get("/users",
  authMiddleware.authenticate.bind(authMiddleware),
  roleMiddleware.adminOnly.bind(roleMiddleware),
  adminController.getAllUsers.bind(adminController)
);

router.post("/users",
  authMiddleware.authenticate.bind(authMiddleware),
  roleMiddleware.adminOnly.bind(roleMiddleware),
   validationMiddleware.validate(registerSchema),
  adminController.createUser.bind(adminController)
);

router.get("/users/:id",
  authMiddleware.authenticate.bind(authMiddleware),
  roleMiddleware.adminOnly.bind(roleMiddleware),
  adminController.getUserById.bind(adminController)
);

router.put("/users/:id",
  authMiddleware.authenticate.bind(authMiddleware),
  roleMiddleware.adminOnly.bind(roleMiddleware),
  adminController.updateUser.bind(adminController)
);

router.delete("/users/:id",
  authMiddleware.authenticate.bind(authMiddleware),
  roleMiddleware.adminOnly.bind(roleMiddleware),
  adminController.deleteUser.bind(adminController)
);

export default router;
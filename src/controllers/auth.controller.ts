import type { Request, Response } from "express";
import authService from "../services/auth.service";

class AuthController {

    async register( req: Request, res: Response): Promise<void> {

        try {

            const user = await authService.register(req.body);

            res.status(201).json({
                success: true,
                message: "User registered successfully",
                user
            })

        } catch (error) {

            console.error(error);
            const message = error instanceof Error? error.message : "Failed to Register";

            res.status(500).json({
                success: false,
                message
            })
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const result = await authService.login(req.body);

            res.status(200).json({
                success: true,
                message: "Login successful",
                token: result.token,
                user: result.user
            });
            } catch (error) {
            console.error(error);
            const message = error instanceof Error? error.message : "Failed to Login";

            res.status(500).json({
                success: false,
                message
            })
        }
  } 
}

export default new AuthController()
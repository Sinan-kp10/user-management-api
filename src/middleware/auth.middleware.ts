import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  email: string;
  role: "USER" | "ADMIN";
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

class AuthMiddleware {

    authenticate( req: AuthRequest, res: Response, next: NextFunction ): void {

        try {

            const authHeader = req.headers.authorization;

            if (!authHeader) {
                res.status(401).json({
                success: false,
                message: "Authorization header is required"
                });
                return;
            }

            const [type, token] = authHeader.split(" ");

            if (type !== "Bearer" || !token) {
                res.status(401).json({
                success: false,
                message: "Invalid authorization format"
                });
                return;
            }

            const secret = process.env.JWT_SECRET;

            if (!secret) {
                res.status(500).json({
                success: false,
                message: "JWT secret is not configured"
                });
                return;
            }

            const decoded = jwt.verify(
                token,
                secret
            ) as JwtPayload;

            req.user = decoded;

            next();

        } catch (error) {

            res.status(401).json({
                success: false,
                message: "Invalid or expired token"
            });

        }
    }
}

export default new AuthMiddleware();
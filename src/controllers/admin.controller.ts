import type { Request, Response } from "express";
import userService from "../services/user.service";

class AdminController {

    async createUser(req : Request, res : Response) : Promise<void>{

        try {

            const user = await userService.createUser(req.body)

            res.status(201).json({
                success : true,
                message : "User created successfully",
                user
            })
            
        } catch (error) {
            console.error(error)
            const message = error instanceof Error? error.message : "Failed to create user";

            res.status(500).json({
                success: false,
                message
            })
        }

    }
    
    async getAllUsers(req: Request, res : Response) : Promise<void>{
        try {

            const users = await userService.getAllUser()
            res.status(200).json({
                success: true,
                users
            }); 
            
        } catch (error) {
            console.error(error)
            const message = error instanceof Error? error.message : "Failed to load users";

            res.status(500).json({
                success: false,
                message
            })
        }
    }

    async getUserById(req: Request, res : Response) : Promise<void>{
        try {
            const id = Number(req.params.id);
            const user = await userService.getUserById(id);

            res.status(200).json({
                success: true,
                user
            });
            
        } catch (error) {
            console.error(error)
            const message = error instanceof Error? error.message : "Failed to load users";

            res.status(500).json({
                success: false,
                message
            })
        }
    }

    async updateUser( req: Request,  res: Response): Promise<void> {

        try {

            const id = Number(req.params.id);

            const { name, email } = req.body;

            const user = await userService.updateUser( id, name, email);

            res.status(200).json({
                success: true,
                message: "User updated successfully",
                user
            });

        } catch (error) {

            console.error(error)
            const message = error instanceof Error? error.message : "Failed to update users";

            res.status(500).json({
                success: false,
                message
            })
        }
    }

    async deleteUser( req: Request, res: Response): Promise<void> {

        try {

            const id = Number(req.params.id);

            await userService.deleteUser(id);

            res.status(200).json({
                success: true,
                message: "User deleted successfully"
            });

        } catch (error) {

            console.error(error)
            const message = error instanceof Error? error.message : "Failed to delete user";

            res.status(500).json({
                success: false,
                message
            })
        }
    }
}

export default new AdminController();
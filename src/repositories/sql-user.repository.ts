import pool from "../config/mysql"
import { ResultSetHeader, RowDataPacket } from "mysql2";

export interface CreateSqlUserData {
    name : string;
    email : string;
    password : string;
    role : "ADMIN" | "USER"
}

export interface SqlUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER";
  created_at: Date;
  updated_at: Date;
}

class SqlUserRepository {


    async createUser (user: CreateSqlUserData): Promise<number>{

        const [result] = await pool.execute<ResultSetHeader>(
            `INSERT INTO users (name, email, password, role)
            values(?,?,?,?)`,
            [user.name, user.email, user.password, user.role]
        )

        return result.insertId
    }

    async geAllUsers (): Promise<SqlUser[]>{
        const [rows] = await pool.execute<RowDataPacket[]>(
            `SELECT  id, name, email, password, role FROM users`
        )

        return rows as SqlUser[]
    }

    async getUserById(id: number): Promise<SqlUser | null> {

        const [rows] = await pool.execute<RowDataPacket[]>(
            `SELECT id, name, email, password, role
            FROM users
            WHERE id = ?`,
            [id]
        );

        if (rows.length === 0) {
            return null;
        }

        return rows[0] as SqlUser;
    }

    async findByEmail(email: string): Promise<SqlUser | null> {

        const [rows] = await pool.execute<RowDataPacket[]>(
            `SELECT id, name, email, password, role
            FROM users
            WHERE email = ?`,
            [email]
        );

        if (rows.length === 0) {
            return null;
        }

        return rows[0] as SqlUser;
    }

    async updateUser( id: number,name: string, email: string): Promise<void> {

        await pool.execute(
            `UPDATE users
            SET name = ?, email = ?
            WHERE id = ?`,
            [name, email, id]
        );
    }

    async deleteUser(id: number): Promise<void> {

        await pool.execute(
            `DELETE FROM users
            WHERE id = ?`,
            [id]
        );
    }

}

export default new SqlUserRepository()

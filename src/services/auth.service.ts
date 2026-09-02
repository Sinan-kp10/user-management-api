import mongoUserRepository, { CreateMongoUserData } from "../repositories/mongo-user.repository";
import sqlUserRepository, { CreateSqlUserData } from "../repositories/sql-user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface RegisterInput{
    name : string;
    email : string;
    password : string
}

interface LoginInput {
    email : string,
    password : string
}

class AuthService {

    async register({name, email, password} : RegisterInput){

        if (!name) {
        throw new Error("Name is required");
        }

        if (name.trim().length < 3) {
            throw new Error("Name must be at least 3 characters");
        }

        if (!email) {
            throw new Error("Email is required");
        }

        if (!password) {
            throw new Error("Password is required");
        }

        if (password.length < 6) {
            throw new Error("Password must be at least 6 characters");
        }

        const isExist = await sqlUserRepository.findByEmail(email)

        if(isExist){
            throw new Error("User already exist!")
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const sqlUserData : CreateSqlUserData = {
            name,
            email,
            password : hashedPassword,
            role : "USER"
        }

        const mysqlId = await sqlUserRepository.createUser(sqlUserData)
         const mongoUserData: CreateMongoUserData = {
            mysqlId,
            name,
            email,
            password: hashedPassword,
            role: "USER"
        }
        const mongoUser = await mongoUserRepository.createUser(mongoUserData)

        return {
            mysqlId,
            mongoId: mongoUser._id.toString(),
            name,
            email,
            role: "USER"
        }

    }

    async login({email, password} : LoginInput){
        

        if(!email){
            throw new Error("Email is required");
        }

        if(!password){
            throw new Error("Password is required");
        }

        const user = await sqlUserRepository.findByEmail(email);

        if(!user){
            throw new Error("Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if(!isPasswordValid){
            throw new Error("Invalid email or password");
        }

        const secret = process.env.JWT_SECRET

        if(!secret){
            throw new Error("JWT secret is not configured");
        }

        const token = jwt.sign(
            {
                email : user.email,
                role : user.role
            },
            secret,
            {
                expiresIn : "3d"
            }
        )

        return {
            token,
            user : {
                id : user.id,
                name : user.name,
                email : user.email,
                role : user.role
            }
        } 
        
    }
}

export default new AuthService()
import bcrypt from "bcrypt";
import sqlUserRepository from "../repositories/sql-user.repository";
import mongoUserRepository from "../repositories/mongo-user.repository";
import type { CreateSqlUserData} from "../repositories/sql-user.repository";
import type { CreateMongoUserData } from "../repositories/mongo-user.repository";

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

class UserService {

  async createUser({name, email, password} : CreateUserInput) {

    if (!name ) {
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
     if (isExist) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const sqlUserData: CreateSqlUserData = {
      name: name,
      email: email,
      password: hashedPassword,
      role: "USER"
    };

    const mysqlId = await sqlUserRepository.createUser(sqlUserData)

    const mongoUserData: CreateMongoUserData = {
      mysqlId,
      name: sqlUserData.name,
      email: sqlUserData.email,
      password: sqlUserData.password,
      role: sqlUserData.role
    };

    const mongoUser = await mongoUserRepository.createUser(mongoUserData)

    return {
      mysqlId,
      mongoId: mongoUser._id.toString(),
      name: sqlUserData.name,
      email: sqlUserData.email,
      role: sqlUserData.role
    };
  }

  async getAllUser(){

    const sqlUsers = await sqlUserRepository.geAllUsers()
    const mongoUsers = await mongoUserRepository.getAllUsers()

    return {
      sqlUsers,
      mongoUsers
    }
  }

  async getUserById(id: number) {

  const sqlUser =await sqlUserRepository.getUserById(id)

    if (!sqlUser) {
      throw new Error("User not found");
    }

    const mongoUser = await mongoUserRepository.getUserByMysqlId(id);

    return {
      sqlUser,
      mongoUser
    };
  }

  async updateUser( id: number, name: string, email: string) {

    if (!name) {
      throw new Error("Name is required");
    }

    if (name.trim().length < 3) {
      throw new Error("Name must be at least 3 characters");
    }

    if (!email) {
      throw new Error("Email is required");
    }

    const existingUser = await sqlUserRepository.getUserById(id);

    if (!existingUser) {
      throw new Error("User not found");
    }

  
    const emailUser =
      await sqlUserRepository.findByEmail(email);

    if (emailUser && emailUser.id !== id) {
      throw new Error("Email already exists");
    }


    await sqlUserRepository.updateUser(
      id,
      name,
      email
    );


    const mongoUser = await mongoUserRepository.updateUser(
        id,
        name,
        email
      );

    if (!mongoUser) {
      throw new Error("MongoDB user not found");
    }

    return {
      mysqlId: id,
      mongoId: mongoUser._id.toString(),
      name: mongoUser.name,
      email: mongoUser.email,
      role: mongoUser.role
    };
  }

  async deleteUser(id: number): Promise<void> {

    const existingUser = await sqlUserRepository.getUserById(id)

    if (!existingUser) {
      throw new Error("User not found")
    }

    await sqlUserRepository.deleteUser(id)
    await mongoUserRepository.deleteUser(id)
  }
  
}

export default new UserService()
import UserModel from "../models/user.model";
import {IUser} from "../models/user.model";

export interface CreateMongoUserData {
  mysqlId: number;
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER";
}

class MongoUserRepository {

  async createUser(user: CreateMongoUserData) {

    return await UserModel.create(user);
  }

  async getAllUsers(): Promise<IUser[]> {

    return await UserModel.find();
  }

  async getUserByMysqlId(mysqlId: number): Promise<IUser | null> {

    return await UserModel.findOne({ mysqlId });
  }

  async updateUser( mysqlId: number, name: string, email: string): Promise<IUser | null> {

    return await UserModel.findOneAndUpdate(
      { mysqlId },
      {
        name,
        email
      },
      {
        new: true
      }
    );
  }
  async deleteUser(mysqlId: number): Promise<void> {

    await UserModel.deleteOne({mysqlId})
  }
}

export default new MongoUserRepository()
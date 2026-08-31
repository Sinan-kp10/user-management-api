import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document{
    mysqlId : number;
    name : string;
    email : string;
    password : string;
    role : "ADMIN" | "USER"
}

const userSchema = new Schema<IUser>(
  {
    mysqlId: {
      type: Number,
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER"
    }
  },
  {
    timestamps: true
  }
);

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
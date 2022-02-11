import mongoose from "mongoose";

interface User extends mongoose.Document {
  _id: string;
  name: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    name: String,
    password: String
  }
);

const userModel = mongoose.model<User & mongoose.Document>('users', userSchema);

export default userModel;
import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  username: string;
  address: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
  },
  {
    timestamps: true, 
  }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;

import mongoose, { Document } from 'mongoose';

export interface User extends Document {
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
  state?: string;
  LGA?: string;
  role: 'user' | 'doctor';
}

const userSchema = new mongoose.Schema<User>({
  email: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String, required: true },
  state: { type: String },
  LGA: { type: String },
  role: { type: String, enum: ['user', 'doctor'], default: 'user' },
});

export const User = mongoose.model<User>('User', userSchema);

import mongoose, { Schema, Document } from 'mongoose';

export type ChainType = 'zcash' | 'stellar' | 'kaspa';

export interface IUser extends Document {
  phone: string;
  chain: ChainType;
  wallet: string;
  secret?: string;
  balance: number;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  phone:     { type: String, required: true, unique: true },
  chain:     { type: String, enum: ['zcash', 'stellar', 'kaspa'], required: true, default: 'stellar' },
  wallet:    { type: String, required: true, unique: true },
  secret:    { type: String },
  balance:   { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);
import mongoose, { Schema, Document } from 'mongoose';

export interface IWaitlist extends Document {
  email: string;
  number: number;
  joinedAt: Date;
}

const WaitlistSchema = new Schema<IWaitlist>({
  email:    { type: String, required: true, unique: true, lowercase: true },
  number:   { type: Number, required: true },
  joinedAt: { type: Date, default: Date.now },
});

export const WaitlistModel = mongoose.model<IWaitlist>('Waitlist', WaitlistSchema);
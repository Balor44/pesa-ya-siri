import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  from: string;
  to: string;
  amount: number;
  txid: string;
  type: 'send' | 'receive' | 'redeem';
  timestamp: Date;
}

const TransactionSchema = new Schema<ITransaction>({
  from:      { type: String, required: true },
  to:        { type: String, required: true },
  amount:    { type: Number, required: true },
  txid:      { type: String, required: true, unique: true },
  type:      { type: String, enum: ['send', 'receive', 'redeem'], required: true },
  timestamp: { type: Date, default: Date.now },
});

export const TransactionModel = mongoose.model<ITransaction>('Transaction', TransactionSchema);
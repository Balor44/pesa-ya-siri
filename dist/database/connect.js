"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        await mongoose_1.default.connect(uri);
        console.log('✅ MongoDB connected');
    }
    catch (error) {
        console.error('❌ MongoDB failed to connect:', error);
        console.log('⚠️  Running without database — data will not persist');
    }
};
exports.connectDB = connectDB;

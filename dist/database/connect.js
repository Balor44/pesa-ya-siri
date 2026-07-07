"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        // Railway injects MONGO_URL automatically when MongoDB plugin is added
        const uri = process.env.MONGO_URL || process.env.MONGODB_URI;
        if (!uri) {
            console.log('⚠️  No database URI found — running without database');
            return;
        }
        await mongoose_1.default.connect(uri + '?authSource=admin');
        console.log('✅ MongoDB connected');
    }
    catch (error) {
        console.error('❌ MongoDB failed to connect:', error);
        console.log('⚠️  Running without database — data will not persist');
    }
};
exports.connectDB = connectDB;

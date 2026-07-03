"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMessage = void 0;
const chatbot_service_1 = require("../services/chatbot.service");
const handleMessage = async (req, res) => {
    const { phone, message } = req.body;
    if (!phone || !message) {
        res.status(400).json({ error: 'phone and message are required' });
        return;
    }
    const reply = await chatbot_service_1.ChatbotService.parse(phone, message);
    res.json({ reply });
};
exports.handleMessage = handleMessage;

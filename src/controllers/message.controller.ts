import { Request, Response } from 'express';
import { ChatbotService } from '../services/chatbot.service';

export const handleMessage = async (req: Request, res: Response): Promise<void> => {
  const { phone, message } = req.body;
  if (!phone || !message) {
    res.status(400).json({ error: 'phone and message are required' });
    return;
  }
  const reply = await ChatbotService.parse(phone, message);
  res.json({ reply });
};
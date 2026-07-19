import { Request, Response } from 'express';
import { WaitlistModel } from '../models/Waitlist';

export const joinWaitlist = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ error: 'Email is required' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: 'Invalid email address' });
      return;
    }

    const existing = await WaitlistModel.findOne({ email });
    if (existing) {
      res.status(409).json({
        error: 'Already on the waitlist',
        number: existing.number,
      });
      return;
    }

    const count = await WaitlistModel.countDocuments();
    const number = count + 1;

    await WaitlistModel.create({ email, number });

    res.status(201).json({
      message: 'You are on the waitlist!',
      number,
      email,
    });

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getWaitlistCount = async (req: Request, res: Response): Promise<void> => {
  try {
    const count = await WaitlistModel.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
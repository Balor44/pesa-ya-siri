import { Request, Response } from 'express';
import { generateCards } from '../utils/cardGenerator';
import { getZECPrice, convertTZStoZEC } from '../utils/price';

export const getCurrentPrice = async (req: Request, res: Response): Promise<void> => {
  try {
    const priceInTZS = await getZECPrice();
    res.json({
      zec: 1,
      tzs: priceInTZS,
      display: '1 ZEC = ' + priceInTZS.toLocaleString() + ' TZS',
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch price' });
  }
};

export const convertPrice = async (req: Request, res: Response): Promise<void> => {
  try {
    const tzs = parseFloat(req.query.tzs as string);
    if (isNaN(tzs) || tzs <= 0) {
      res.status(400).json({ error: 'Invalid TZS amount' });
      return;
    }
    const zec = await convertTZStoZEC(tzs);
    res.json({
      tzs,
      zec,
      display: tzs.toLocaleString() + ' TZS = ' + zec + ' ZEC',
      note: 'Includes 5% margin for price stability',
    });
  } catch (error) {
    res.status(500).json({ error: 'Conversion failed' });
  }
};

export const generateRechargeCards = async (req: Request, res: Response): Promise<void> => {
  try {
    const { denomination, quantity } = req.body;

    if (!denomination || !quantity) {
      res.status(400).json({ error: 'denomination and quantity are required' });
      return;
    }

    if (quantity > 1000) {
      res.status(400).json({ error: 'Maximum 1000 cards per batch' });
      return;
    }

    const cards = await generateCards(denomination, quantity);

    res.json({
      generated: cards.length,
      denomination: denomination.toLocaleString() + ' TZS',
      zecPerCard: cards[0].zec,
      rateUsed: cards[0].label,
      cards,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
import { convertTZStoZEC } from './price';

const CARD_DENOMINATIONS = [2000, 5000, 10000, 25000, 50000];

function generateCode(): string {
  let code = '';
  for (let i = 0; i < 12; i++) {
    code += Math.floor(Math.random() * 10).toString();
  }
  return code;
}

export interface GeneratedCard {
  code: string;
  tzs: number;
  zec: number;
  label: string;
}

export const generateCards = async (
  denomination: number,
  quantity: number
): Promise<GeneratedCard[]> => {
  if (!CARD_DENOMINATIONS.includes(denomination)) {
    throw new Error(
      'Invalid denomination. Choose from: ' + CARD_DENOMINATIONS.join(', ') + ' TZS'
    );
  }

  const zecAmount = await convertTZStoZEC(denomination);
  const cards: GeneratedCard[] = [];

  for (let i = 0; i < quantity; i++) {
    cards.push({
      code: generateCode(),
      tzs: denomination,
      zec: zecAmount,
      label: denomination.toLocaleString() + ' TZS = ' + zecAmount + ' ZEC',
    });
  }

  return cards;
};
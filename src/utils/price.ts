import axios from 'axios';

// Fallback price — update this manually every few days
// Current approximate rate: 1 ZEC = 1,200,000 TZS
const FALLBACK_PRICE_TZS = 1200000;

export const getZECPrice = async (): Promise<number> => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=zcash&vs_currencies=tzs',
      { timeout: 5000 }
    );
    const priceInTZS = response.data?.zcash?.tzs;
    if (!priceInTZS || isNaN(priceInTZS)) {
      console.log('CoinGecko returned invalid data, using fallback price');
      return FALLBACK_PRICE_TZS;
    }
    return priceInTZS;
  } catch (error) {
    console.log('CoinGecko unreachable, using fallback price');
    return FALLBACK_PRICE_TZS;
  }
};

export const convertTZStoZEC = async (tzs: number): Promise<number> => {
  const priceInTZS = await getZECPrice();
  const margin = 1.05;
  const zec = tzs / (priceInTZS * margin);
  return Math.round(zec * 10000) / 10000;
};
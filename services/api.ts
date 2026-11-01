
import { Coin } from '../types';

const COIN_GECKO_IDS: Record<string, string> = {
  'BTC': 'bitcoin',
  'LTC': 'litecoin',
  'DOGE': 'dogecoin',
  'KAS': 'kaspa',
  'ETC': 'ethereum-classic',
  'ALPH': 'alephium',
  'HNS': 'handshake',
  'KDA': 'kadena',
  'ALEO': 'aleo',
};

const API_KEY = "CG-kwugLsEZ4SpDF2DP1EGvUj7Z"; 

const getHeaders = () => {
    return {
        'x-cg-demo-api-key': API_KEY,
        'Content-Type': 'application/json'
    };
};

export const fetchCoinPrices = async (): Promise<Record<string, number>> => {
  try {
    const ids = Object.values(COIN_GECKO_IDS).join(',');
    // Added API Key to URL as query param for demo key or header usually
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`, {
        headers: getHeaders()
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch prices');
    }
    
    const data = await response.json();
    const prices: Record<string, number> = {};

    Object.entries(COIN_GECKO_IDS).forEach(([symbol, id]) => {
        if (data[id] && data[id].usd) {
            prices[symbol] = data[id].usd;
        }
    });

    return prices;
  } catch (error) {
    console.error("API Error:", error);
    return {};
  }
};

export const fetchHistoricalData = async (coinSymbol: string, days: number = 180): Promise<{ prices: [number, number][] }> => {
    const coinId = COIN_GECKO_IDS[coinSymbol];
    if (!coinId) return { prices: [] };

    try {
        const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=daily`, 
            { headers: getHeaders() }
        );

        if (!response.ok) {
            console.warn(`Failed to fetch history for ${coinSymbol}`);
            return { prices: [] };
        }

        const data = await response.json();
        return { prices: data.prices || [] };
    } catch (error) {
        console.error("History API Error:", error);
        return { prices: [] };
    }
}

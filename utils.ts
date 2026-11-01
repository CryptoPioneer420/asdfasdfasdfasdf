import { Miner, Coin, Language, Currency } from './types';
import { COINS, TRANSLATIONS, EXCHANGE_RATES } from './constants';

export const getCoinForMiner = (miner: Miner, coinsData: Coin[] = COINS): Coin | undefined => {
  // Try to match specific coins first, fallback to algorithm match
  if (miner.minableCoins && miner.minableCoins.length > 0) {
     return coinsData.find(c => miner.minableCoins.includes(c.symbol));
  }
  return coinsData.find(c => c.algorithm === miner.algorithm);
};

export const calculateFinancials = (
    miner: Miner, 
    electricityCost: number, 
    currency: Currency = 'USD',
    coinsData: Coin[] = COINS
) => {
  const coin = getCoinForMiner(miner, coinsData);
  const rate = EXCHANGE_RATES[currency] || 1;

  if (!coin) {
    return {
      dailyRevenue: 0,
      dailyCost: 0,
      dailyProfit: 0,
      roiDays: Infinity,
      efficiency: 0,
      coinSymbol: '?'
    };
  }

  // Determine multiplier based on units. 
  // Base Coin units:
  // BTC: TH/s, LTC: MH/s, KAS: TH/s.
  // We need to normalize miner hashrate to coin revenue unit.
  
  let hashrateNormalized = miner.hashrate;
  // Simple normalization logic for MVP (assuming unit match or simple scaling)
  // In a full app, we'd parse "TH/s", "GH/s" etc strictly.
  
  const dailyRevenueUSD = hashrateNormalized * coin.revenuePerUnit * (coin.price / (COINS.find(c => c.symbol === coin.symbol)?.price || 1));
  // Note: Above line adjusts revenue based on price change ratio from base constant if revenuePerUnit is static.
  // Ideally, revenuePerUnit should be recalculated from Network Difficulty + Block Reward.
  // For MVP Phase 2, we approximate: Revenue = (StaticRevPerUnit * (NewPrice / OldPrice))
  // Better approach: revenuePerUnit in 'coin' object should simply be USD revenue per unit hash? 
  // No, usually it's Coin Amount per unit hash. 
  // Let's assume constants.ts revenuePerUnit is "Coins per Unit Hash per Day".
  // Then DailyRevenueUSD = hashrate * coinsPerUnit * priceUSD.
  
  // Checking constants.ts: revenuePerUnit seems to be USD based on the values (0.085 for BTC seems low for coins, high for USD? No, 0.085 USD/TH/day is realistic for 2024).
  // If revenuePerUnit in constants is USD, we must scale it by price ratio.
  const baseCoin = COINS.find(c => c.symbol === coin.symbol);
  const priceRatio = baseCoin ? coin.price / baseCoin.price : 1;
  
  // Recalculate revenue using the live price ratio
  const adjustedRevenueUSD = (hashrateNormalized * coin.revenuePerUnit) * priceRatio;

  const powerKW = miner.power / 1000;
  // electricityCost is in USD for calculation base
  const dailyCostUSD = powerKW * 24 * electricityCost;
  const dailyProfitUSD = adjustedRevenueUSD - dailyCostUSD;
  
  const dailyRevenue = adjustedRevenueUSD * rate;
  const dailyCost = dailyCostUSD * rate;
  const dailyProfit = dailyProfitUSD * rate;
  const minerPrice = miner.price * rate;

  const roiDays = dailyProfit > 0 ? minerPrice / dailyProfit : Infinity;
  
  // Efficiency J/Unit
  const efficiency = miner.power / miner.hashrate;

  return {
    dailyRevenue,
    dailyCost,
    dailyProfit,
    roiDays,
    efficiency,
    coinSymbol: coin.symbol
  };
};

export const formatCurrency = (amount: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatHashrate = (value: number, unit: string) => {
  return `${value} ${unit}`;
};

export const getTranslation = (lang: Language, section: string, key: string): string => {
  // @ts-ignore
  return TRANSLATIONS[lang]?.[section]?.[key] || TRANSLATIONS['en'][section][key] || key;
};

// DCC Calculation
export const calculateHeatRecovery = (powerW: number, heatingEfficiency: number, heatingCost: number, currencyRate: number) => {
    // Waste heat in Watts (assume 95% heat conversion)
    const wasteHeatW = powerW * 0.95;
    const wasteHeatKW = wasteHeatW / 1000;
    
    // Value of heat per hour = kW heat * Cost per kWh thermal (adjusted for efficiency)
    // If heating system is 85% efficient, you need 1/0.85 kWh fuel for 1 kWh heat.
    // Saving = kWh heat generated * (Cost / Efficiency)
    
    const savingsPerHourUSD = wasteHeatKW * (heatingCost / (heatingEfficiency / 100));
    const savingsPerDayUSD = savingsPerHourUSD * 24;
    
    return {
        dailySavings: savingsPerDayUSD * currencyRate,
        monthlySavings: savingsPerDayUSD * 30 * currencyRate,
        wasteHeatW
    };
};
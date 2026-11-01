import React, { useState, useEffect } from 'react';
import { AppSettings, Miner } from '../types';
import { calculateFinancials, formatCurrency, getTranslation } from '../utils';
import { EXCHANGE_RATES } from '../constants';

interface CalculatorProps {
  settings: AppSettings;
  initialMiner?: Miner;
}

const Calculator: React.FC<CalculatorProps> = ({ settings, initialMiner }) => {
  const t = (key: string) => getTranslation(settings.language, 'calculator', key);
  const [elecCost, setElecCost] = useState(settings.electricityCost);
  const [hardwareCost, setHardwareCost] = useState(initialMiner ? initialMiner.price : 2000);
  const [hashrate, setHashrate] = useState(initialMiner ? initialMiner.hashrate : 100);
  const [power, setPower] = useState(initialMiner ? initialMiner.power : 3000);
  const [poolFee, setPoolFee] = useState(settings.poolFee || 2); // %

  const currencyRate = EXCHANGE_RATES[settings.currency];

  // Sync if prop changes
  useEffect(() => {
    if(initialMiner) {
      setHardwareCost(initialMiner.price);
      setHashrate(initialMiner.hashrate);
      setPower(initialMiner.power);
    }
    setElecCost(settings.electricityCost);
  }, [initialMiner, settings.electricityCost]);

  // Derived calculations
  const revenuePerUnit = initialMiner?.minableCoins?.[0] === 'LTC' ? 0.012 : 0.085; // Simple fallback
  
  // Base USD Calculation
  const grossIncomeDayUSD = hashrate * revenuePerUnit;
  const poolFeeCostUSD = grossIncomeDayUSD * (poolFee / 100);
  const elecCostDayUSD = (power / 1000) * 24 * (elecCost / currencyRate); // Convert local cost back to USD base for math
  const netProfitDayUSD = grossIncomeDayUSD - poolFeeCostUSD - elecCostDayUSD;
  
  // Display Values (Converted to Selected Currency)
  const grossIncomeDay = grossIncomeDayUSD * currencyRate;
  const elecCostDay = (power / 1000) * 24 * elecCost; // Use local cost directly
  const netProfitDay = netProfitDayUSD * currencyRate;
  const netProfitMonth = netProfitDay * 30;
  
  // ROI in Days
  const roiDays = netProfitDay > 0 ? hardwareCost / netProfitDay : Infinity;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <span className="bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 p-1.5 rounded-lg text-sm">PRO</span>
        {t('title')}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('elecCost')} ({settings.currency}/kWh)</label>
            <input 
              type="number" step="0.01" 
              value={elecCost} 
              onChange={e => setElecCost(parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('hardwareCost')} ({settings.currency})</label>
            <input 
              type="number"
              value={hardwareCost} 
              onChange={e => setHardwareCost(parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('hashrate')}</label>
              <input 
                type="number"
                value={hashrate} 
                onChange={e => setHashrate(parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('power')}</label>
              <input 
                type="number"
                value={power} 
                onChange={e => setPower(parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('poolFee')}</label>
            <div className="flex items-center gap-4">
              <input 
                type="range" min="0" max="5" step="0.1"
                value={poolFee} 
                onChange={e => setPoolFee(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <span className="text-gray-900 dark:text-white font-medium w-12 text-right">{poolFee}%</span>
            </div>
          </div>
        </div>

        {/* Outputs */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{t('grossIncome')}</span>
                <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(grossIncomeDay, settings.currency)}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{t('elecCostDaily')}</span>
                <span className="font-medium text-red-500">-{formatCurrency(elecCostDay, settings.currency)}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{t('netProfit')}</span>
                <span className={`font-bold text-lg ${netProfitDay >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {formatCurrency(netProfitDay, settings.currency)}
                </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 uppercase">{t('monthlyProfit')}</p>
                    <p className={`font-bold ${netProfitMonth >= 0 ? 'text-green-600' : 'text-red-500'}`}>{formatCurrency(netProfitMonth, settings.currency)}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 uppercase">{t('estRoi')}</p>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {roiDays === Infinity || roiDays < 0 ? t('never') : `${Math.ceil(roiDays)} ${t('days')}`}
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
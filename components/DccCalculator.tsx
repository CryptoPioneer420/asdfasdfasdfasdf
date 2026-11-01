import React, { useState } from 'react';
import { Flame, Info } from 'lucide-react';
import { AppSettings, Miner } from '../types';
import { getTranslation, calculateHeatRecovery, formatCurrency } from '../utils';
import { EXCHANGE_RATES } from '../constants';

interface DccCalculatorProps {
  settings: AppSettings;
  selectedMiner?: Miner;
}

const DccCalculator: React.FC<DccCalculatorProps> = ({ settings, selectedMiner }) => {
  const t = (key: string) => getTranslation(settings.language, 'dcc', key);
  
  // State
  const [power, setPower] = useState(selectedMiner ? selectedMiner.power : 3000);
  const [heatingEfficiency, setHeatingEfficiency] = useState(90); // %
  const [heatingCost, setHeatingCost] = useState(settings.electricityCost); // Default to electricity cost
  
  React.useEffect(() => {
    if(selectedMiner) {
      setPower(selectedMiner.power);
    }
  }, [selectedMiner]);

  const currencyRate = EXCHANGE_RATES[settings.currency];
  const results = calculateHeatRecovery(power, heatingEfficiency, heatingCost, currencyRate);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in">
      <div className="bg-orange-50 dark:bg-orange-900/20 p-6 border-b border-orange-100 dark:border-orange-900/30">
         <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/50 text-orange-600 rounded-lg">
                <Flame size={24} />
            </div>
            <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('title')}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">{t('subtitle')}</p>
            </div>
         </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('wasteHeat')} <span className="text-gray-400 font-normal">(Watts)</span>
                </label>
                <div className="flex items-center gap-4">
                     <input 
                        type="number" 
                        value={power}
                        onChange={(e) => setPower(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
                     />
                     <span className="text-sm text-gray-500 dark:text-gray-400">
                        ≈ {(power * 0.95).toFixed(0)}W Heat
                     </span>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('heatingEff')} <span className="text-gray-400 font-normal">({heatingEfficiency}%)</span>
                </label>
                <input 
                    type="range" min="50" max="100" step="1"
                    value={heatingEfficiency}
                    onChange={(e) => setHeatingEfficiency(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <p className="text-xs text-gray-500 mt-1">Typical gas/oil boiler: 70-90%</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('heatingCost')} ({settings.currency}/kWh)
                </label>
                <input 
                    type="number" step="0.01"
                    value={heatingCost}
                    onChange={(e) => setHeatingCost(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
                />
            </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 flex flex-col justify-center space-y-6">
             <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{t('savingsDaily')}</span>
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    +{formatCurrency(results.dailySavings, settings.currency)}
                </span>
             </div>
             <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{t('savingsMonthly')}</span>
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    +{formatCurrency(results.monthlySavings, settings.currency)}
                </span>
             </div>

             <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg flex gap-3 items-start">
                <Info size={20} className="text-orange-600 shrink-0 mt-0.5" />
                <p className="text-xs text-orange-800 dark:text-orange-200 leading-relaxed">
                    {t('disclaimer')}
                </p>
             </div>
        </div>
      </div>
    </div>
  );
};

export default DccCalculator;
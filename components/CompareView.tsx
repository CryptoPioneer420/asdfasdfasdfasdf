import React from 'react';
import { ArrowLeft, Zap, Wind, DollarSign, Cpu, Check, AlertCircle } from 'lucide-react';
import { useMiners } from '../context/MinerContext';
import { AppSettings } from '../types';
import { calculateFinancials, formatCurrency, getTranslation } from '../utils';

interface CompareViewProps {
  settings: AppSettings;
  onBack: () => void;
}

const CompareView: React.FC<CompareViewProps> = ({ settings, onBack }) => {
  const { miners, coins, compareList, toggleCompare } = useMiners();
  const t = (key: string) => getTranslation(settings.language, 'compare', key);
  
  const selectedMiners = miners.filter(m => compareList.includes(m.id));
  const financials = selectedMiners.map(m => calculateFinancials(m, settings.electricityCost, settings.currency, coins));

  // Find best values for highlighting
  const maxProfit = Math.max(...financials.map(f => f.dailyProfit));
  const minRoi = Math.min(...financials.map(f => f.roiDays));
  const maxEff = Math.min(...financials.map(f => f.efficiency)); // Lower J/T is better

  if (selectedMiners.length === 0) {
      return (
          <div className="text-center py-20">
              <p className="text-gray-500">{t('noMiners')}</p>
              <button onClick={onBack} className="mt-4 text-teal-600 hover:underline">{t('goBack')}</button>
          </div>
      );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <button 
            onClick={onBack}
            className="flex items-center text-gray-500 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400 transition-colors"
        >
            <ArrowLeft size={20} className="mr-2" /> {t('goBack')}
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
      </div>

      <div className="overflow-x-auto pb-6">
        <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
                <tr>
                    <th className="p-4 w-1/4 bg-gray-50 dark:bg-gray-800/50 rounded-tl-xl"></th>
                    {selectedMiners.map(m => (
                        <th key={m.id} className="p-4 w-1/4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 align-top">
                            <div className="flex justify-between items-start">
                                <span className="text-xs font-bold bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300 uppercase">{m.manufacturer}</span>
                                <button onClick={() => toggleCompare(m.id)} className="text-gray-400 hover:text-red-500"><AlertCircle size={16}/></button>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-2 leading-tight min-h-[50px]">{m.name}</h3>
                            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">{m.releaseDate}</div>
                        </th>
                    ))}
                     {/* Fill empty columns if less than 3 */}
                    {[...Array(3 - selectedMiners.length)].map((_, i) => (
                         <th key={i} className="p-4 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 text-center text-gray-400 text-sm font-normal">
                            -
                         </th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-b-xl shadow-sm">
                
                {/* Image Row */}
                <tr>
                    <td className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50">{t('visual')}</td>
                    {selectedMiners.map(m => (
                        <td key={m.id} className="p-4 text-center">
                            {m.imageUrl ? (
                                <img src={m.imageUrl} alt={m.name} className="h-32 object-contain mx-auto" />
                            ) : (
                                <div className="h-32 flex items-center justify-center text-gray-200">No Image</div>
                            )}
                        </td>
                    ))}
                    {[...Array(3 - selectedMiners.length)].map((_, i) => <td key={i} className="bg-gray-50 dark:bg-gray-900/50"></td>)}
                </tr>

                {/* Financials Header */}
                <tr className="bg-gray-50 dark:bg-gray-700/30">
                    <td colSpan={4} className="p-2 px-4 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">{t('profitability')}</td>
                </tr>

                <tr>
                    <td className="p-4 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 flex items-center gap-2">
                        <DollarSign size={16}/> {t('dailyProfit')}
                    </td>
                    {selectedMiners.map((m, idx) => {
                        const isBest = financials[idx].dailyProfit === maxProfit;
                        return (
                            <td key={m.id} className={`p-4 font-bold text-lg ${financials[idx].dailyProfit > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500'} ${isBest ? 'bg-green-50 dark:bg-green-900/10' : ''}`}>
                                {formatCurrency(financials[idx].dailyProfit, settings.currency)}
                                {isBest && <span className="ml-2 text-xs bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 px-1.5 py-0.5 rounded-full inline-block align-middle">{t('win')}</span>}
                            </td>
                        );
                    })}
                     {[...Array(3 - selectedMiners.length)].map((_, i) => <td key={i} className="bg-gray-50 dark:bg-gray-900/50"></td>)}
                </tr>

                <tr>
                    <td className="p-4 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">{t('roi')}</td>
                    {selectedMiners.map((m, idx) => {
                        const days = financials[idx].roiDays;
                        const isBest = days === minRoi;
                        return (
                            <td key={m.id} className={`p-4 ${isBest ? 'font-bold text-teal-600 dark:text-teal-400' : 'text-gray-600 dark:text-gray-300'}`}>
                                {days === Infinity ? 'Never' : `${Math.round(days)} days`}
                            </td>
                        );
                    })}
                    {[...Array(3 - selectedMiners.length)].map((_, i) => <td key={i} className="bg-gray-50 dark:bg-gray-900/50"></td>)}
                </tr>

                {/* Specs Header */}
                <tr className="bg-gray-50 dark:bg-gray-700/30">
                    <td colSpan={4} className="p-2 px-4 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">{t('specs')}</td>
                </tr>

                <tr>
                    <td className="p-4 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 flex items-center gap-2">
                        <Cpu size={16}/> {t('hashrate')}
                    </td>
                    {selectedMiners.map(m => (
                        <td key={m.id} className="p-4 text-gray-900 dark:text-white">
                            <span className="font-bold">{m.hashrate}</span> {m.hashrateUnit}
                        </td>
                    ))}
                    {[...Array(3 - selectedMiners.length)].map((_, i) => <td key={i} className="bg-gray-50 dark:bg-gray-900/50"></td>)}
                </tr>

                <tr>
                    <td className="p-4 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 flex items-center gap-2">
                        <Zap size={16}/> {t('power')}
                    </td>
                    {selectedMiners.map(m => (
                        <td key={m.id} className="p-4 text-gray-900 dark:text-white">
                            {m.power} W
                        </td>
                    ))}
                    {[...Array(3 - selectedMiners.length)].map((_, i) => <td key={i} className="bg-gray-50 dark:bg-gray-900/50"></td>)}
                </tr>

                <tr>
                    <td className="p-4 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">{t('efficiency')}</td>
                    {selectedMiners.map((m, idx) => {
                         const eff = financials[idx].efficiency;
                         const isBest = eff === maxEff;
                        return (
                            <td key={m.id} className={`p-4 ${isBest ? 'font-bold text-teal-600 dark:text-teal-400' : ''}`}>
                                {eff.toFixed(1)} J/T
                            </td>
                        );
                    })}
                    {[...Array(3 - selectedMiners.length)].map((_, i) => <td key={i} className="bg-gray-50 dark:bg-gray-900/50"></td>)}
                </tr>

                <tr>
                    <td className="p-4 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 flex items-center gap-2">
                        <Wind size={16}/> {t('noise')}
                    </td>
                    {selectedMiners.map(m => (
                        <td key={m.id} className="p-4 text-gray-900 dark:text-white">
                            {m.noise} dB
                        </td>
                    ))}
                    {[...Array(3 - selectedMiners.length)].map((_, i) => <td key={i} className="bg-gray-50 dark:bg-gray-900/50"></td>)}
                </tr>
                 <tr>
                    <td className="p-4 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">{t('cooling')}</td>
                    {selectedMiners.map(m => (
                        <td key={m.id} className="p-4 text-gray-900 dark:text-white">
                            {m.cooling}
                        </td>
                    ))}
                    {[...Array(3 - selectedMiners.length)].map((_, i) => <td key={i} className="bg-gray-50 dark:bg-gray-900/50"></td>)}
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompareView;
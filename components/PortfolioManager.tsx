
import React, { useState } from 'react';
import { useMiners } from '../context/MinerContext';
import { AppSettings, Miner } from '../types';
import { calculateFinancials, formatCurrency, getTranslation } from '../utils';
import { Plus, Trash2, Zap, Cpu, DollarSign, Database } from 'lucide-react';

interface PortfolioManagerProps {
  settings: AppSettings;
  onNavigate: (page: string, minerId?: string) => void;
}

const PortfolioManager: React.FC<PortfolioManagerProps> = ({ settings, onNavigate }) => {
  const t = (key: string) => getTranslation(settings.language, 'portfolio', key);
  const { miners, coins, portfolio, addToPortfolio, removeFromPortfolio, updatePortfolioCount } = useMiners();
  const [selectedMinerId, setSelectedMinerId] = useState('');

  // Calculate Aggregates
  let totalHashrate = 0; // Rough approximation sum
  let totalPower = 0;
  let totalProfit = 0;
  
  const portfolioItems = portfolio.map(item => {
      const miner = miners.find(m => m.id === item.minerId);
      if (!miner) return null;
      
      const financials = calculateFinancials(miner, settings.electricityCost, settings.currency, coins);
      
      // Simple aggregation logic (ignoring different hashrate units for summary for MVP)
      // In a real app, normalize all to TH/s or PH/s
      totalPower += miner.power * item.count;
      totalProfit += financials.dailyProfit * item.count;
      
      return { ...item, miner, financials };
  }).filter(Boolean) as (typeof portfolio[0] & { miner: Miner, financials: any })[];

  const handleAdd = () => {
      if(selectedMinerId) {
          addToPortfolio(selectedMinerId, 1);
          setSelectedMinerId('');
      }
  };

  return (
    <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">{t('subtitle')}</p>
            </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-3 mb-2 opacity-80">
                    <DollarSign size={20} />
                    <span className="text-sm font-medium uppercase">{t('totalProfit')}</span>
                </div>
                <div className="text-3xl font-bold">{formatCurrency(totalProfit, settings.currency)}</div>
                <div className="text-sm opacity-70 mt-1">Per Day (Est.)</div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-2 text-gray-500 dark:text-gray-400">
                    <Zap size={20} />
                    <span className="text-sm font-medium uppercase">{t('totalPower')}</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{(totalPower / 1000).toFixed(2)} kW</div>
                <div className="text-sm text-gray-400 mt-1">Consumption</div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                 <div className="flex items-center gap-3 mb-2 text-gray-500 dark:text-gray-400">
                    <Database size={20} />
                    <span className="text-sm font-medium uppercase">Active Devices</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{portfolioItems.reduce((acc, curr) => acc + curr.count, 0)}</div>
                <div className="text-sm text-gray-400 mt-1">ASIC Units</div>
            </div>
        </div>

        {/* Add Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row gap-4 items-end">
             <div className="flex-1 w-full">
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('addMiner')}</label>
                 <select 
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    value={selectedMinerId}
                    onChange={(e) => setSelectedMinerId(e.target.value)}
                 >
                     <option value="">{t('selectMiner')}</option>
                     {miners.map(m => (
                         <option key={m.id} value={m.id}>{m.name} ({m.hashrate} {m.hashrateUnit})</option>
                     ))}
                 </select>
             </div>
             <button 
                onClick={handleAdd}
                disabled={!selectedMinerId}
                className="bg-teal-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
             >
                 <Plus size={20} /> {t('add')}
             </button>
        </div>

        {/* List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
             {portfolioItems.length === 0 ? (
                 <div className="p-12 text-center text-gray-500 dark:text-gray-400">
                     {t('empty')}
                 </div>
             ) : (
                 <table className="w-full text-left">
                     <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs uppercase">
                         <tr>
                             <th className="p-4">Miner</th>
                             <th className="p-4 text-center">{t('quantity')}</th>
                             <th className="p-4 text-right">Power</th>
                             <th className="p-4 text-right">Profit</th>
                             <th className="p-4 text-right">Action</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                         {portfolioItems.map(item => (
                             <tr key={item.minerId} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                 <td className="p-4">
                                     <div className="font-bold text-gray-900 dark:text-white cursor-pointer hover:text-teal-600" onClick={() => onNavigate('detail', item.minerId)}>
                                         {item.miner.name}
                                     </div>
                                     <div className="text-xs text-gray-500">{item.miner.hashrate} {item.miner.hashrateUnit} • {item.miner.algorithm}</div>
                                 </td>
                                 <td className="p-4">
                                     <div className="flex items-center justify-center gap-3">
                                         <button onClick={() => updatePortfolioCount(item.minerId, item.count - 1)} className="w-6 h-6 rounded bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 flex items-center justify-center">-</button>
                                         <span className="font-medium w-6 text-center text-gray-900 dark:text-white">{item.count}</span>
                                         <button onClick={() => updatePortfolioCount(item.minerId, item.count + 1)} className="w-6 h-6 rounded bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 flex items-center justify-center">+</button>
                                     </div>
                                 </td>
                                 <td className="p-4 text-right text-gray-600 dark:text-gray-300">
                                     {(item.miner.power * item.count).toLocaleString()} W
                                 </td>
                                 <td className="p-4 text-right">
                                     <div className={`font-bold ${item.financials.dailyProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>
                                         {formatCurrency(item.financials.dailyProfit * item.count, settings.currency)}
                                     </div>
                                 </td>
                                 <td className="p-4 text-right">
                                     <button onClick={() => removeFromPortfolio(item.minerId)} className="text-red-500 hover:text-red-700 p-2">
                                         <Trash2 size={18} />
                                     </button>
                                 </td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
             )}
        </div>
    </div>
  );
};

export default PortfolioManager;

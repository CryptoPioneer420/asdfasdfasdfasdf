
import React from 'react';
import { ArrowUpRight, TrendingUp, Zap, Clock, ChevronRight, RefreshCw, Wifi } from 'lucide-react';
import { EXCHANGE_RATES } from '../constants';
import { AppSettings } from '../types';
import { calculateFinancials, formatCurrency, getTranslation } from '../utils';
import { useMiners } from '../context/MinerContext';

interface DashboardProps {
  settings: AppSettings;
  onNavigate: (page: string, minerId?: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ settings, onNavigate }) => {
  const t = (key: string) => getTranslation(settings.language, 'dashboard', key);
  const { miners, coins, isLoading, lastUpdated, refreshPrices } = useMiners();
  
  // Calculate top miners using LIVE coin data
  const topMiners = React.useMemo(() => {
    return [...miners]
      .map(miner => ({ ...miner, financials: calculateFinancials(miner, settings.electricityCost, settings.currency, coins) }))
      .sort((a, b) => b.financials.dailyProfit - a.financials.dailyProfit)
      .slice(0, 10);
  }, [miners, coins, settings.electricityCost, settings.currency]);

  const bestEfficiency = React.useMemo(() => {
    const btcMiners = miners.filter(m => m.algorithm === 'SHA-256');
    if(btcMiners.length === 0) return miners[0] || null;
    return btcMiners.reduce((prev, curr) => {
      const prevEff = prev.power / prev.hashrate;
      const currEff = curr.power / curr.hashrate;
      return currEff < prevEff ? curr : prev;
    });
  }, [miners]);

  const btcData = coins.find(c => c.symbol === 'BTC');
  const currencyRate = EXCHANGE_RATES[settings.currency];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-700 to-slate-900 rounded-2xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center gap-1 bg-teal-800/50 px-2 py-1 rounded text-xs text-teal-200 border border-teal-700">
                <Wifi size={12} className={isLoading ? 'animate-pulse' : ''} />
                {isLoading ? 'Updating Prices...' : 'Live Market Data'}
            </span>
            {lastUpdated && !isLoading && (
                 <span className="text-xs text-teal-200/60">Updated: {lastUpdated.toLocaleTimeString()}</span>
            )}
            <button onClick={() => refreshPrices()} className="p-1 hover:text-white text-teal-200/60 transition-colors">
                <RefreshCw size={12} className={isLoading ? 'animate-spin' : ''} />
            </button>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            {t('title')}
          </h1>
          <p className="text-teal-100 text-lg md:text-xl mb-8 leading-relaxed">
            {t('subtitle')}
          </p>
          <button 
            onClick={() => onNavigate('miners')}
            className="bg-teal-500 hover:bg-teal-400 text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
          >
            {t('cta')} <ArrowUpRight size={20} />
          </button>
        </div>
        {/* Abstract shapes bg */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute right-20 bottom-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Cards kept as is... */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider">Top Profitability</p>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1">{topMiners[0]?.name || 'N/A'}</h3>
            </div>
            <div className="p-2 bg-teal-50 dark:bg-teal-900/30 rounded-lg text-teal-600 dark:text-teal-400">
              <TrendingUp size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {topMiners[0] ? formatCurrency(topMiners[0].financials.dailyProfit, settings.currency) : '-'}<span className="text-sm font-normal text-gray-500">/day</span>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('roi')}: {topMiners[0] ? Math.round(topMiners[0].financials.roiDays) : '-'} days</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider">Best Efficiency</p>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1">{bestEfficiency?.name || 'N/A'}</h3>
            </div>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
              <Zap size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {bestEfficiency ? (bestEfficiency.power / bestEfficiency.hashrate).toFixed(1) : '-'} <span className="text-sm font-normal text-gray-500">J/T</span>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{bestEfficiency?.hashrate || '-'} {bestEfficiency?.hashrateUnit}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider">Top Coin</p>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1">Bitcoin (BTC)</h3>
            </div>
            <div className="p-2 bg-orange-50 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400">
              <span className="font-bold text-lg">₿</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatCurrency((btcData?.price || 0) * currencyRate, settings.currency)}
          </p>
          <div className="flex items-center gap-2 mt-1">
             <span className="text-sm text-green-600 dark:text-green-400 font-medium">Live Price</span>
             <span className="text-xs text-gray-400">| Difficulty: {btcData?.difficultyTrend.toUpperCase()}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider">Next Halving</p>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1">~Apr 2028</h3>
            </div>
            <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
              <Clock size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            1,250 <span className="text-sm font-normal text-gray-500">days</span>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Reward drops to 1.5625 BTC</p>
        </div>
      </div>

      {/* Top 10 Miners Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('topMiners')}</h2>
          <button onClick={() => onNavigate('miners')} className="text-teal-600 hover:text-teal-800 dark:text-teal-400 text-sm font-medium flex items-center">
            {t('viewAll')} <ChevronRight size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">{t('rank')}</th>
                <th className="p-4 font-semibold">{t('miner')}</th>
                <th className="p-4 font-semibold">Coin</th>
                <th className="p-4 font-semibold">Hashrate</th>
                <th className="p-4 font-semibold">Power</th>
                <th className="p-4 font-semibold text-right">{t('profit')}</th>
                <th className="p-4 font-semibold text-right">{t('roi')}</th>
                <th className="p-4 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {topMiners.map((miner, index) => (
                <tr 
                  key={miner.id} 
                  onClick={() => onNavigate('detail', miner.id)}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer group"
                >
                  <td className="p-4 text-gray-500 dark:text-gray-400 font-medium">#{index + 1}</td>
                  <td className="p-4">
                    <div className="font-bold text-gray-900 dark:text-white">{miner.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{miner.manufacturer} • {miner.algorithm}</div>
                  </td>
                  <td className="p-4">
                      <span className="inline-block px-2 py-1 bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 text-xs font-bold rounded">
                          {miner.minableCoins[0]}
                      </span>
                  </td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">{miner.hashrate} <span className="text-xs text-gray-500">{miner.hashrateUnit}</span></td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">{miner.power}W</td>
                  <td className="p-4 text-right">
                    <div className={`font-bold ${miner.financials.dailyProfit >= 50 ? 'text-green-600 dark:text-green-400' : 'text-orange-500'}`}>
                      {formatCurrency(miner.financials.dailyProfit, settings.currency)}
                    </div>
                  </td>
                  <td className="p-4 text-right text-gray-700 dark:text-gray-300">
                    {miner.financials.roiDays === Infinity ? 'Never' : `${Math.round(miner.financials.roiDays)} days`}
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-teal-600 dark:text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity font-medium text-sm">
                      Details
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

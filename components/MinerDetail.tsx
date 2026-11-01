
import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, Cpu, Zap, Wind, DollarSign, Thermometer, ArrowUpRight, Server, Wrench } from 'lucide-react';
import { AppSettings } from '../types';
import { HOSTING_PROVIDERS, EQUIPMENT } from '../constants';
import { calculateFinancials, formatCurrency, getTranslation } from '../utils';
import { useMiners } from '../context/MinerContext';
import { fetchHistoricalData } from '../services/api';
import Calculator from './Calculator';
import DccCalculator from './DccCalculator';
import SimpleLineChart from './SimpleLineChart';

interface MinerDetailProps {
  minerId: string;
  settings: AppSettings;
  onBack: () => void;
}

const MinerDetail: React.FC<MinerDetailProps> = ({ minerId, settings, onBack }) => {
  const { miners, coins } = useMiners();
  const [showHeatRecovery, setShowHeatRecovery] = useState(false);
  const [historicalData, setHistoricalData] = useState<{label: string, value: number}[]>([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);

  const miner = miners.find(m => m.id === minerId);
  const t = (section: string, key: string) => getTranslation(settings.language, section, key);

  const financials = useMemo(() => {
     if(!miner) return null;
     return calculateFinancials(miner, settings.electricityCost, settings.currency, coins);
  }, [miner, settings.electricityCost, settings.currency, coins]);

  // Filter Accessories based on cooling
  const relevantAccessories = useMemo(() => {
      if(!miner) return [];
      return EQUIPMENT.filter(item => {
          if(!item.compatibleCooling) return false;
          // Show accessories compatible with miner's cooling OR general items
          return item.compatibleCooling.includes(miner.cooling);
      });
  }, [miner]);

  // Fetch Real Historical Data
  useEffect(() => {
      const loadHistory = async () => {
          if (!miner || !financials?.coinSymbol) return;
          setIsHistoryLoading(true);
          
          try {
              const data = await fetchHistoricalData(financials.coinSymbol, 180);
              
              if (data.prices && data.prices.length > 0) {
                  const revenuePerUnitCurrent = (financials.dailyRevenue / miner.hashrate); 
                  const priceCurrent = coins.find(c => c.symbol === financials.coinSymbol)?.price || 1;
                  
                  const step = Math.ceil(data.prices.length / 30);
                  const chartData = data.prices.filter((_, i) => i % step === 0).map(([timestamp, price]) => {
                      const priceRatio = price / priceCurrent;
                      const historicalRevenue = financials.dailyRevenue * priceRatio;
                      const profit = historicalRevenue - financials.dailyCost; 
                      
                      const date = new Date(timestamp);
                      return {
                          label: date.toLocaleDateString(undefined, {month: 'short', day: 'numeric'}),
                          value: Math.max(0, profit)
                      };
                  });
                  setHistoricalData(chartData);
              }
          } catch (e) {
              console.error("Failed to load history");
          } finally {
              setIsHistoryLoading(false);
          }
      };

      loadHistory();
  }, [miner, financials?.coinSymbol, financials?.dailyRevenue, financials?.dailyCost]);

  if (!miner || !financials) return <div>Miner not found</div>;

  return (
    <div className="space-y-8 animate-fade-in">
      <button 
        onClick={onBack}
        className="flex items-center text-gray-500 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" /> Back to List
      </button>

      {/* Header & Main Info */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-8">
            {/* Image Section */}
            <div className="w-full md:w-1/3 flex items-center justify-center bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                {miner.imageUrl ? (
                    <img src={miner.imageUrl} alt={miner.name} className="max-h-64 object-contain" />
                ) : (
                    <div className="h-64 w-full flex items-center justify-center text-gray-300">No Image</div>
                )}
            </div>

            <div className="flex-1">
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded text-xs font-bold uppercase">{miner.manufacturer}</span>
                    <span className="bg-teal-50 dark:bg-teal-900 text-teal-700 dark:text-teal-300 px-2 py-1 rounded text-xs font-bold uppercase">{miner.algorithm}</span>
                    <span className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-2 py-1 rounded text-xs font-bold uppercase">{miner.minableCoins[0]}</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{miner.name}</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Released: {miner.releaseDate}</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Est. Market Price</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(miner.price * (settings.currency === 'USD' ? 1 : 0.92), settings.currency)}</p>
                </div>
                </div>

                <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                    {miner.description || `The ${miner.name} is a high-performance ASIC miner by ${miner.manufacturer} utilizing the ${miner.algorithm} algorithm.`}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1"><Cpu size={14}/> Hashrate</div>
                        <div className="font-bold text-gray-900 dark:text-white">{miner.hashrate} <span className="text-sm font-normal">{miner.hashrateUnit}</span></div>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1"><Zap size={14}/> {t('miners', 'power')}</div>
                        <div className="font-bold text-gray-900 dark:text-white">{miner.power} <span className="text-sm font-normal">W</span></div>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1"><Wind size={14}/> {t('miners', 'noise')}</div>
                        <div className="font-bold text-gray-900 dark:text-white">{miner.noise} <span className="text-sm font-normal">dB</span></div>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1"><DollarSign size={14}/> {t('miners', 'efficiency')}</div>
                        <div className="font-bold text-gray-900 dark:text-white">{(miner.power / miner.hashrate).toFixed(1)} <span className="text-sm font-normal">J/T</span></div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Tabs / Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
              
              {/* Historical Chart Section */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t('miners', 'historicalChart')}</h3>
                    {isHistoryLoading && <span className="text-xs text-teal-600 animate-pulse">Loading data...</span>}
                 </div>
                 <div className="h-48 w-full">
                    {historicalData.length > 0 ? (
                        <SimpleLineChart data={historicalData} />
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                            {isHistoryLoading ? 'Loading chart...' : 'No historical data available for this coin.'}
                        </div>
                    )}
                 </div>
              </div>

              {/* ROI Calculator */}
              <Calculator settings={settings} initialMiner={miner} />
              
              {/* Heat Recovery Toggle */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-lg">
                          <Thermometer size={24} />
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">
                          {t('miners', 'toggleHeat')}
                      </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={showHeatRecovery}
                        onChange={(e) => setShowHeatRecovery(e.target.checked)}
                      />
                      <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
                  </label>
              </div>

              {/* DCC Heat Recovery (Conditional) */}
              {showHeatRecovery && (
                  <DccCalculator settings={settings} selectedMiner={miner} />
              )}
          </div>

          <div className="space-y-8">
              {/* Mineable Coins */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Mineable Coins (Live Data)</h3>
                 <table className="w-full text-left">
                    <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700/50">
                        <tr>
                            <th className="p-3">Coin</th>
                            <th className="p-3">Price</th>
                            <th className="p-3 text-right">Rev/Day</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {miner.minableCoins && miner.minableCoins.map(ticker => {
                            const coin = coins.find(c => c.symbol === ticker);
                            if(!coin) return null;
                            
                            return (
                                <tr key={ticker} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                    <td className="p-3 font-medium text-gray-900 dark:text-white">{coin.name}</td>
                                    <td className="p-3 text-sm text-gray-900 dark:text-white">{formatCurrency(coin.price, 'USD')}</td>
                                    <td className="p-3 text-right font-medium text-green-600 dark:text-green-400">
                                        {coin.symbol === financials.coinSymbol ? formatCurrency(financials.dailyRevenue, 'USD') : '-'}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                 </table>
              </div>

             {/* Vendors */}
             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Where to buy</h3>
                <div className="space-y-3">
                    {miner.vendorLinks && miner.vendorLinks.length > 0 ? miner.vendorLinks.map((link, idx) => (
                        <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="block p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-teal-500 transition-colors group">
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-900 dark:text-white group-hover:text-teal-600">{link.vendor}</span>
                                <ArrowUpRight size={16} className="text-gray-400 group-hover:text-teal-600" />
                            </div>
                            <div className="text-xs text-gray-500 mt-1">Check stock & price</div>
                        </a>
                    )) : (
                        <p className="text-sm text-gray-500">No vendors listed.</p>
                    )}
                </div>
             </div>

             {/* Hosting Options - NEW */}
             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Server size={18} /> {t('miners', 'hostingOptions')}
                </h3>
                <div className="space-y-3">
                    {HOSTING_PROVIDERS.slice(0, 3).map((provider, idx) => (
                        <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg flex justify-between items-center">
                            <div>
                                <div className="font-medium text-gray-900 dark:text-white">{provider.name}</div>
                                <div className="text-xs text-gray-500">{provider.location} • {formatCurrency(provider.pricePerKwh, 'USD')}/kWh</div>
                            </div>
                            <a href={provider.website} target="_blank" className="text-teal-600 hover:text-teal-700 dark:text-teal-400 text-sm font-medium">Visit</a>
                        </div>
                    ))}
                    <button className="w-full text-center text-sm text-teal-600 hover:text-teal-700 dark:text-teal-400 mt-2">View all hosts</button>
                </div>
             </div>
          </div>
      </div>

      {/* Accessories Section - NEW (At the bottom) */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Wrench size={24} className="text-teal-600" /> {t('miners', 'accessories')}
          </h2>
          {relevantAccessories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relevantAccessories.map((item) => (
                      <div key={item.id} className="border border-gray-100 dark:border-gray-700 rounded-lg p-4 flex gap-4 hover:shadow-md transition-shadow">
                          <div className="w-20 h-20 bg-gray-50 dark:bg-gray-700 rounded-md flex items-center justify-center flex-shrink-0">
                              {item.imageUrl ? <img src={item.imageUrl} alt={item.name} className="max-h-full max-w-full" /> : <Wrench size={24} className="text-gray-400" />}
                          </div>
                          <div>
                              <h4 className="font-bold text-gray-900 dark:text-white">{item.name}</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">{item.description}</p>
                              <p className="text-teal-600 font-bold mt-2">{formatCurrency(item.price, settings.currency)}</p>
                          </div>
                      </div>
                  ))}
              </div>
          ) : (
              <p className="text-gray-500 text-center py-4">No specific accessories found for this cooling type.</p>
          )}
      </div>
    </div>
  );
};

export default MinerDetail;

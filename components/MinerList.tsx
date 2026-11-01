
import React from 'react';
import { Search, Sliders, ArrowUp, ArrowDown, Filter, Scale } from 'lucide-react';
import { AppSettings, Miner, SortField, SortDirection, CoolingType } from '../types';
import { calculateFinancials, formatCurrency, getTranslation } from '../utils';
import { useMiners } from '../context/MinerContext';

interface MinerListProps {
  settings: AppSettings;
  onNavigate: (page: string, minerId?: string) => void;
  categoryFilter?: CoolingType; // For direct category navigation
}

const MinerList: React.FC<MinerListProps> = ({ settings, onNavigate, categoryFilter }) => {
  const t = (key: string) => getTranslation(settings.language, 'miners', key);
  const tc = (key: string) => getTranslation(settings.language, 'categories', key);
  const { miners, coins, compareList, toggleCompare } = useMiners();

  const [searchTerm, setSearchTerm] = React.useState('');
  const [algoFilter, setAlgoFilter] = React.useState<string[]>([]);
  const [coinFilter, setCoinFilter] = React.useState<string[]>([]);
  const [coolingFilterState, setCoolingFilterState] = React.useState<string>(categoryFilter || 'all');
  
  const [sortField, setSortField] = React.useState<SortField>('profit');
  const [sortDirection, setSortDirection] = React.useState<SortDirection>('desc');

  // Sync prop category with internal state
  React.useEffect(() => {
     if(categoryFilter) setCoolingFilterState(categoryFilter);
  }, [categoryFilter]);

  // Extract unique algorithms
  const allAlgorithms = Array.from(new Set(miners.map(m => m.algorithm))) as string[];
  
  // Prepare data with live calculations
  const processedMiners = React.useMemo(() => {
    return miners.map(miner => ({
      ...miner,
      financials: calculateFinancials(miner, settings.electricityCost, settings.currency, coins)
    }));
  }, [miners, coins, settings.electricityCost, settings.currency]);

  // Filter and Sort
  const filteredMiners = React.useMemo(() => {
    let result = processedMiners;

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(m => m.name.toLowerCase().includes(lower) || m.manufacturer.toLowerCase().includes(lower));
    }

    if (algoFilter.length > 0) {
      result = result.filter(m => algoFilter.includes(m.algorithm));
    }

    if (coinFilter.length > 0) {
       result = result.filter(m => 
           m.minableCoins && m.minableCoins.some(c => coinFilter.includes(c))
       );
    }

    if (coolingFilterState !== 'all') {
      result = result.filter(m => m.cooling === coolingFilterState);
    }

    return result.sort((a, b) => {
      let valA: number | string = 0;
      let valB: number | string = 0;

      switch (sortField) {
        case 'profit':
          valA = a.financials.dailyProfit;
          valB = b.financials.dailyProfit;
          break;
        case 'hashrate':
          valA = a.hashrate;
          valB = b.hashrate;
          break;
        case 'power':
          valA = a.power;
          valB = b.power;
          break;
        case 'name':
          valA = a.name;
          valB = b.name;
          break;
        case 'roi':
          valA = a.financials.roiDays;
          valB = b.financials.roiDays;
          break;
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [processedMiners, searchTerm, algoFilter, coinFilter, coolingFilterState, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc'); // Default to desc for metrics usually
    }
  };

  const toggleAlgoFilter = (algo: string) => {
     setAlgoFilter(prev => prev.includes(algo) ? prev.filter(a => a !== algo) : [...prev, algo]);
  }

  const toggleCoinFilter = (coin: string) => {
    setCoinFilter(prev => prev.includes(coin) ? prev.filter(c => c !== coin) : [...prev, coin]);
 }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1 inline" /> : <ArrowDown size={14} className="ml-1 inline" />;
  };

  // Category Hero
  let categoryInfo = null;
  if (coolingFilterState === 'Air') {
      categoryInfo = { title: tc('airTitle'), desc: tc('airDesc') };
  } else if (coolingFilterState === 'Hydro') {
      categoryInfo = { title: tc('hydroTitle'), desc: tc('hydroDesc') };
  } else if (coolingFilterState === 'Immersion') {
      categoryInfo = { title: tc('immersionTitle'), desc: tc('immersionDesc') };
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {categoryInfo && (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 text-white mb-6">
              <h1 className="text-3xl font-bold mb-2">{categoryInfo.title}</h1>
              <p className="text-gray-300">{categoryInfo.desc}</p>
          </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        {!categoryInfo && 
           <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">{t('found').replace('{count}', filteredMiners.length.toString())}</p>
           </div>
        }
      </div>

      {/* Filters Panel */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col gap-4">
        
        {/* Top Row: Search & Cooling Toggle (if not category page) */}
        <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
                type="text" 
                placeholder={t('searchPlaceholder')} 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            </div>
            {!categoryFilter && (
                <div className="flex gap-2">
                    {['all', 'Air', 'Hydro', 'Immersion'].map((type: string) => (
                        <button 
                            key={type}
                            onClick={() => setCoolingFilterState(type)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${coolingFilterState === type ? 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'}`}
                        >
                            {type === 'all' ? t('all') : tc(type)}
                        </button>
                    ))}
                </div>
            )}
        </div>

        {/* Algorithm Multi-Select */}
        <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-semibold text-gray-500 uppercase mr-2">{t('filterAlgo')}:</span>
            {allAlgorithms.map(algo => (
                <button
                    key={algo}
                    onClick={() => toggleAlgoFilter(algo)}
                    className={`px-3 py-1 rounded-full text-xs border ${algoFilter.includes(algo) ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'}`}
                >
                    {algo}
                </button>
            ))}
        </div>
         {/* Coin Multi-Select */}
         <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-semibold text-gray-500 uppercase mr-2">{t('filterCoin')}:</span>
            {['BTC', 'LTC', 'KAS', 'ETC'].map(coin => (
                <button
                    key={coin}
                    onClick={() => toggleCoinFilter(coin)}
                    className={`px-3 py-1 rounded-full text-xs border ${coinFilter.includes(coin) ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'}`}
                >
                    {coin}
                </button>
            ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs uppercase tracking-wider border-b border-gray-200 dark:border-gray-600">
                <th className="p-4 w-12 text-center"><Scale size={16} className="mx-auto" /></th>
                <th className="p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600" onClick={() => handleSort('name')}>{t('title')} <SortIcon field="name" /></th>
                <th className="p-4 hidden sm:table-cell">{t('release')}</th>
                <th className="p-4 hidden md:table-cell">Coin</th>
                <th className="p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600" onClick={() => handleSort('hashrate')}>Hashrate <SortIcon field="hashrate" /></th>
                <th className="p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600" onClick={() => handleSort('power')}>{t('power')} <SortIcon field="power" /></th>
                <th className="p-4 hidden md:table-cell">{t('filterCooling')}</th>
                <th className="p-4 text-right cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600" onClick={() => handleSort('profit')}>{t('profit')} <SortIcon field="profit" /></th>
                <th className="p-4 text-right cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600" onClick={() => handleSort('roi')}>ROI <SortIcon field="roi" /></th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredMiners.map((miner) => (
                <tr 
                  key={miner.id} 
                  className={`transition-colors cursor-pointer group ${compareList.includes(miner.id) ? 'bg-teal-50 dark:bg-teal-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
                  onClick={(e) => {
                      // Prevent navigation if clicking checkbox
                      if ((e.target as HTMLElement).tagName !== 'INPUT') {
                         onNavigate('detail', miner.id)
                      }
                  }}
                >
                  <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                     <input 
                        type="checkbox" 
                        checked={compareList.includes(miner.id)} 
                        onChange={() => toggleCompare(miner.id)}
                        className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 cursor-pointer"
                     />
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-gray-900 dark:text-white">{miner.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{miner.manufacturer} • {miner.algorithm}</div>
                  </td>
                  <td className="p-4 text-sm text-gray-600 dark:text-gray-300 hidden sm:table-cell">{miner.releaseDate}</td>
                  <td className="p-4 hidden md:table-cell">
                      <span className="inline-block px-2 py-1 bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 text-xs font-bold rounded">
                          {miner.minableCoins[0]}
                      </span>
                  </td>
                  <td className="p-4 text-gray-700 dark:text-gray-300 font-medium">{miner.hashrate} <span className="text-xs text-gray-500 dark:text-gray-400">{miner.hashrateUnit}</span></td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">{miner.power}W</td>
                  <td className="p-4 hidden md:table-cell text-sm text-gray-600 dark:text-gray-300">{miner.cooling}</td>
                  <td className="p-4 text-right">
                    <div className={`font-bold text-base ${miner.financials.dailyProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>
                      {formatCurrency(miner.financials.dailyProfit, settings.currency)}
                    </div>
                    <div className="text-xs text-gray-400">Rev: {formatCurrency(miner.financials.dailyRevenue, settings.currency)}</div>
                  </td>
                  <td className="p-4 text-right text-gray-700 dark:text-gray-300">
                    {miner.financials.roiDays === Infinity ? <span className="text-gray-400">Never</span> : `${Math.round(miner.financials.roiDays)} ${t('days').toLowerCase()}`}
                  </td>
                  <td className="p-4 text-right">
                    <span className="inline-block px-3 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600 transition-all">
                      Details
                    </span>
                  </td>
                </tr>
              ))}
              {filteredMiners.length === 0 && (
                <tr>
                  <td colSpan={10} className="p-12 text-center text-gray-500 dark:text-gray-400">
                    No miners found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MinerList;

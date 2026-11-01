import React from 'react';
import { Miner, AppSettings } from '../../types';
import { formatCurrency } from '../../utils';
import { ArrowRight, Zap, Droplets, Waves } from 'lucide-react';

interface MinerGridProps {
  miners: Miner[];
  onMinerClick: (id: string) => void;
  settings: AppSettings;
}

const MinerGrid: React.FC<MinerGridProps> = ({ miners, onMinerClick, settings }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {miners.map((miner) => (
        <div 
          key={miner.id}
          onClick={() => onMinerClick(miner.id)}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col"
        >
          <div className="h-56 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-6 flex items-center justify-center relative">
            {miner.imageUrl ? (
                <img src={miner.imageUrl} alt={miner.name} className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300" />
            ) : (
                <span className="text-gray-400 font-medium">No Image Available</span>
            )}
            <div className="absolute top-4 right-4 flex gap-2">
                <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${
                    miner.cooling === 'Immersion' 
                    ? 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800' 
                    : 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800'
                }`}>
                    {miner.cooling === 'Immersion' ? <Waves size={12} /> : <Droplets size={12} />}
                    {miner.cooling}
                </span>
            </div>
          </div>
          
          <div className="p-6 flex-1 flex flex-col">
            <div className="mb-4">
                <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">{miner.manufacturer}</div>
                <h3 className="font-bold text-xl text-gray-900 dark:text-white leading-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {miner.name}
                </h3>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700/30 p-2 rounded-lg">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Hashrate</div>
                    <div className="font-semibold text-gray-900 dark:text-white">{miner.hashrate} <span className="text-xs font-normal">{miner.hashrateUnit}</span></div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/30 p-2 rounded-lg">
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1"><Zap size={10} /> Power</div>
                    <div className="font-semibold text-gray-900 dark:text-white">{miner.power} W</div>
                </div>
            </div>

            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Est. Price</div>
                    <div className="font-bold text-lg text-gray-900 dark:text-white">
                        {formatCurrency(miner.price, settings.currency)}
                    </div>
                </div>
                <button className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                    <ArrowRight size={16} />
                </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MinerGrid;
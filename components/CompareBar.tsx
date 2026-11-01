import React from 'react';
import { X, ArrowRightLeft } from 'lucide-react';
import { useMiners } from '../context/MinerContext';

interface CompareBarProps {
  onCompare: () => void;
}

const CompareBar: React.FC<CompareBarProps> = ({ onCompare }) => {
  const { compareList, miners, toggleCompare, clearCompare } = useMiners();

  if (compareList.length === 0) return null;

  const selectedMiners = miners.filter(m => compareList.includes(m.id));

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-4 rounded-full shadow-2xl z-40 flex items-center gap-6 animate-fade-in border border-gray-700 max-w-[90vw]">
      <div className="flex items-center gap-3">
        <span className="font-bold text-teal-400 flex items-center gap-2">
            <ArrowRightLeft size={18} />
            {compareList.length}/3
        </span>
        <div className="hidden sm:flex gap-2">
            {selectedMiners.map(m => (
                <div key={m.id} className="text-xs bg-gray-800 px-2 py-1 rounded-md border border-gray-700 flex items-center gap-2">
                    <span className="truncate max-w-[80px]">{m.name}</span>
                    <button onClick={() => toggleCompare(m.id)} className="hover:text-red-400"><X size={12}/></button>
                </div>
            ))}
        </div>
      </div>
      
      <div className="flex items-center gap-3 border-l border-gray-700 pl-6">
        <button 
            onClick={clearCompare}
            className="text-xs text-gray-400 hover:text-white transition-colors"
        >
            Clear
        </button>
        <button 
            onClick={onCompare}
            disabled={compareList.length < 2}
            className={`px-4 py-2 rounded-full font-bold text-sm transition-colors ${
                compareList.length < 2 
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                : 'bg-teal-600 hover:bg-teal-500 text-white'
            }`}
        >
            Compare Now
        </button>
      </div>
    </div>
  );
};

export default CompareBar;

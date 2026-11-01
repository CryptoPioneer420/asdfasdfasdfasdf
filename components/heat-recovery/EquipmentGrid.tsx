
import React from 'react';
import { Equipment, AppSettings } from '../../types';
import { formatCurrency } from '../../utils';
import { ArrowRight, Box, Zap } from 'lucide-react';

interface EquipmentGridProps {
  equipment: Equipment[];
  settings: AppSettings;
}

const EquipmentGrid: React.FC<EquipmentGridProps> = ({ equipment, settings }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {equipment.map((item) => (
        <div 
          key={item.id}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col"
        >
          <div className="h-40 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-4 flex items-center justify-center relative">
            {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover rounded-lg opacity-80 group-hover:opacity-100 transition-opacity" />
            ) : (
                <span className="text-gray-400 font-medium">No Image</span>
            )}
            <div className="absolute top-4 right-4">
                <span className="text-xs font-bold px-2 py-1 rounded bg-gray-900/10 dark:bg-white/10 text-gray-600 dark:text-gray-300">
                    {item.type}
                </span>
            </div>
          </div>
          
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 leading-tight">
                {item.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                {item.description}
            </p>

            <div className="mt-auto flex justify-between items-end">
                <div>
                     <div className="text-xs text-gray-500 dark:text-gray-400">Capacity</div>
                     <div className="font-semibold text-gray-900 dark:text-white">{item.capacity}</div>
                </div>
                <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Price</div>
                    <div className="font-bold text-teal-600 dark:text-teal-400">
                        {formatCurrency(item.price, settings.currency)}
                    </div>
                </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EquipmentGrid;

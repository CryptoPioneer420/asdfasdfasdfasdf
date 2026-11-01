
import React, { useState } from 'react';
import { AppSettings, HostingProvider } from '../types';
import { HOSTING_PROVIDERS } from '../constants';
import { MapPin, Zap, Shield, Check, Globe } from 'lucide-react';
import { formatCurrency, getTranslation } from '../utils';

interface HostingDirectoryProps {
  settings: AppSettings;
}

const HostingDirectory: React.FC<HostingDirectoryProps> = ({ settings }) => {
  const t = (key: string) => getTranslation(settings.language, 'hosting', key);
  const [filterLoc, setFilterLoc] = useState('');

  const filteredProviders = HOSTING_PROVIDERS.filter(p => 
      p.location.toLowerCase().includes(filterLoc.toLowerCase()) || 
      p.name.toLowerCase().includes(filterLoc.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
       <div className="text-center mb-8">
           <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('title')}</h1>
           <p className="text-gray-500 dark:text-gray-400">{t('subtitle')}</p>
       </div>

       <div className="max-w-md mx-auto mb-8">
          <div className="relative">
             <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
             <input 
                type="text" 
                placeholder="Filter by location or name..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-800 dark:text-white"
                value={filterLoc}
                onChange={(e) => setFilterLoc(e.target.value)}
             />
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
           {filteredProviders.map(provider => (
               <div key={provider.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col hover:shadow-md transition-shadow">
                   <div className="flex justify-between items-start mb-4">
                       <div>
                           <h3 className="text-xl font-bold text-gray-900 dark:text-white">{provider.name}</h3>
                           <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm mt-1">
                               <Globe size={14} /> {provider.location}
                           </div>
                       </div>
                       <div className="text-right">
                           <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                               {formatCurrency(provider.pricePerKwh, 'USD')}<span className="text-sm text-gray-400 font-normal">/kWh</span>
                           </div>
                           <div className="text-xs text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded inline-block mt-1">
                               {provider.greenEnergy ? '100% Green' : 'Mixed Grid'}
                           </div>
                       </div>
                   </div>

                   <div className="space-y-3 mb-6 flex-1">
                       <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                           <Shield size={16} className="text-gray-400" />
                           <span>{provider.security}</span>
                       </div>
                       <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                           <Zap size={16} className="text-gray-400" />
                           <span>Min. {provider.minUnits} Units</span>
                       </div>
                       <div className="pt-2 border-t border-gray-100 dark:border-gray-700 mt-2">
                           <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Features</p>
                           <div className="flex flex-wrap gap-2">
                               {provider.features.map((feat, idx) => (
                                   <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded flex items-center gap-1">
                                       <Check size={10} /> {feat}
                                   </span>
                               ))}
                           </div>
                       </div>
                   </div>

                   <a 
                     href={provider.website} 
                     className="block w-full text-center bg-gray-900 dark:bg-gray-700 text-white py-3 rounded-lg font-medium hover:bg-teal-600 transition-colors"
                   >
                       {t('visit')}
                   </a>
               </div>
           ))}
       </div>
    </div>
  );
};

export default HostingDirectory;

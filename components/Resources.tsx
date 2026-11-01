
import React from 'react';
import { MINING_POOLS, WALLETS, TAX_SOFTWARE, EVENTS, REPAIR_CENTERS } from '../constants';
import { Calendar, MapPin, ExternalLink, ShieldCheck, Wallet, FileText, Pickaxe, Wrench, Globe } from 'lucide-react';
import { getTranslation } from '../utils';

interface ResourcesProps {
    language: 'en' | 'de' | 'ru' | 'es' | 'zh';
}

const Resources: React.FC<ResourcesProps> = ({ language }) => {
  const t = (key: string) => getTranslation(language, 'resources', key);

  const ResourceCard = ({ title, icon: Icon, items, colorClass }: any) => (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden h-full flex flex-col">
          <div className={`p-6 border-b border-gray-100 dark:border-gray-700 ${colorClass}`}>
             <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
               <Icon size={22} className="opacity-80" /> {title}
             </h2>
          </div>
          <div className="p-6 space-y-4 flex-1">
             {items.map((item: any) => (
                 <div key={item.id} className="group p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-600">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-teal-600 transition-colors flex items-center gap-2">
                                {item.name}
                                {item.featured && <span className="text-[10px] bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 px-1.5 rounded">POPULAR</span>}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.description}</p>
                        </div>
                        <ExternalLink size={16} className="text-gray-300 group-hover:text-teal-500" />
                    </div>
                 </div>
             ))}
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700 text-center">
             <button className="text-sm font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400">View All</button>
          </div>
      </div>
  );

  // Group Repair Centers by Region
  const regions = Array.from(new Set(REPAIR_CENTERS.map(r => r.region)));

  return (
    <div className="space-y-12 animate-fade-in max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('title')}</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      {/* Main Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ResourceCard 
            title={t('pools')} 
            icon={Pickaxe} 
            items={MINING_POOLS} 
            colorClass="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300" 
          />
          <ResourceCard 
            title={t('wallets')} 
            icon={Wallet} 
            items={WALLETS} 
            colorClass="bg-purple-50 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300" 
          />
          <ResourceCard 
            title={t('tax')} 
            icon={FileText} 
            items={TAX_SOFTWARE} 
            colorClass="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300" 
          />
      </div>

      {/* Repair Centers Section (New) */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-red-50 dark:bg-red-900/20">
             <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
               <Wrench className="text-red-600" size={22} /> {t('repair')}
             </h2>
          </div>
          <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {regions.map(region => (
                      <div key={region} className="space-y-4">
                          <h3 className="font-bold text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-700 pb-2 flex items-center gap-2">
                              <Globe size={16} /> {region}
                          </h3>
                          <div className="space-y-3">
                              {REPAIR_CENTERS.filter(r => r.region === region).map(center => (
                                  <div key={center.id} className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg hover:shadow-sm transition-shadow">
                                      <div className="flex justify-between items-start">
                                          <div className="font-bold text-gray-900 dark:text-white">{center.name}</div>
                                          <span className="text-[10px] bg-green-100 text-green-800 px-1.5 py-0.5 rounded">Active</span>
                                      </div>
                                      <div className="text-sm text-gray-600 dark:text-gray-300 mt-1 flex items-center gap-1"><MapPin size={12}/> {center.location}</div>
                                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">{center.specialization}</div>
                                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{center.description}</p>
                                  </div>
                              ))}
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* Events Section (Horizontal) */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-orange-50 dark:bg-orange-900/20">
             <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
               <Calendar className="text-orange-600" size={20} /> {t('events')}
             </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVENTS.map(event => (
              <div key={event.id} className="flex gap-4 group p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                 <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center min-w-[70px] flex flex-col justify-center transition-colors group-hover:bg-orange-100 dark:group-hover:bg-orange-900/30">
                    <span className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 group-hover:text-orange-700 dark:group-hover:text-orange-300">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">{new Date(event.date).getDate()}</span>
                 </div>
                 <div className="flex-1">
                    <h3 className="font-bold text-base text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-1">{event.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 flex items-center gap-1 text-sm mt-1">
                        <MapPin size={14} /> {event.location}
                    </p>
                 </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default Resources;

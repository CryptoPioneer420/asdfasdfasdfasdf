import React from 'react';
import { X, Moon, Sun, Globe, DollarSign, Zap } from 'lucide-react';
import { AppSettings, Language, Currency } from '../types';
import { getTranslation } from '../utils';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSave: (settings: AppSettings) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, settings, onSave }) => {
  const [localSettings, setLocalSettings] = React.useState<AppSettings>(settings);

  React.useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  if (!isOpen) return null;

  const t = (section: string, key: string) => getTranslation(localSettings.language, section, key);

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md transition-colors duration-200`}>
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('settings', 'title')}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Language */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Globe size={16} /> {t('settings', 'language')}
            </label>
            <select
              value={localSettings.language}
              onChange={(e) => setLocalSettings({...localSettings, language: e.target.value as Language})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700 dark:text-white"
            >
              <option value="en">English 🇺🇸</option>
              <option value="de">Deutsch 🇩🇪</option>
              <option value="ru">Русский 🇷🇺</option>
              <option value="es">Español 🇪🇸</option>
              <option value="zh">中文 🇨🇳</option>
            </select>
          </div>

          {/* Currency */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <DollarSign size={16} /> {t('settings', 'currency')}
            </label>
            <select
              value={localSettings.currency}
              onChange={(e) => setLocalSettings({...localSettings, currency: e.target.value as Currency})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700 dark:text-white"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="CNY">CNY (¥)</option>
            </select>
          </div>

          {/* Electricity */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Zap size={16} /> {t('settings', 'elecCost')}
            </label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                step="0.01"
                value={localSettings.electricityCost}
                onChange={(e) => setLocalSettings({...localSettings, electricityCost: parseFloat(e.target.value)})}
                className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700 dark:text-white"
              />
              <input 
                type="range" min="0" max="0.5" step="0.01"
                value={localSettings.electricityCost}
                onChange={(e) => setLocalSettings({...localSettings, electricityCost: parseFloat(e.target.value)})}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Avg: $0.10 - $0.15</p>
          </div>

          {/* Pool Fee */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('settings', 'poolFee')}
            </label>
             <div className="flex items-center gap-4">
              <input 
                type="range" min="0" max="5" step="0.1"
                value={localSettings.poolFee} 
                onChange={(e) => setLocalSettings({...localSettings, poolFee: parseFloat(e.target.value)})}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <span className="text-gray-900 dark:text-gray-100 font-medium w-12 text-right">{localSettings.poolFee}%</span>
            </div>
          </div>
          
           {/* Dark Mode */}
           <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Dark Mode</label>
              <button 
                onClick={() => setLocalSettings({...localSettings, theme: localSettings.theme === 'light' ? 'dark' : 'light'})}
                className={`p-2 rounded-lg border ${localSettings.theme === 'dark' ? 'bg-gray-700 border-gray-600 text-yellow-400' : 'bg-gray-100 border-gray-200 text-gray-600'}`}
              >
                  {localSettings.theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
           </div>
        </div>

        <div className="p-6 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-b-lg flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white font-medium mr-3"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 font-medium transition-colors"
          >
            {t('settings', 'save')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;

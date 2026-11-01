
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Server, Settings, BookOpen, Calculator as CalcIcon, Menu, X, Droplets, Wind, Waves, Lock, ThermometerSun, Globe, Box, FileText, Download } from 'lucide-react';
import { AppSettings, CoolingType } from './types';
import Dashboard from './components/Dashboard';
import MinerList from './components/MinerList';
import MinerDetail from './components/MinerDetail';
import Resources from './components/Resources';
import Calculator from './components/Calculator';
import DccCalculator from './components/DccCalculator';
import SettingsModal from './components/SettingsModal';
import AdminPanel from './components/AdminPanel';
import CompareBar from './components/CompareBar';
import CompareView from './components/CompareView';
import HeatRecoveryPage from './components/HeatRecoveryPage';
import HostingDirectory from './components/HostingDirectory';
import PortfolioManager from './components/PortfolioManager';
import { formatCurrency, getTranslation } from './utils';
import { MinerProvider } from './context/MinerContext';

const App: React.FC = () => {
  // Navigation State
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedMinerId, setSelectedMinerId] = useState<string | undefined>(undefined);
  const [categoryFilter, setCategoryFilter] = useState<CoolingType | undefined>(undefined);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Settings State
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('mining-hub-settings');
    // Default to browser language if supported, else 'en'
    const browserLang = typeof navigator !== 'undefined' ? navigator.language.slice(0, 2) : 'en';
    const initialLang = ['en', 'de', 'ru', 'es', 'zh'].includes(browserLang) ? browserLang : 'en';

    return saved ? JSON.parse(saved) : {
      electricityCost: 0.12,
      currency: 'USD',
      language: initialLang,
      theme: 'light',
      poolFee: 2
    };
  });

  // Effects
  useEffect(() => {
    localStorage.setItem('mining-hub-settings', JSON.stringify(settings));
    // Apply theme
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  // Translation Helper
  const t = (key: string) => getTranslation(settings.language, 'nav', key);
  const tf = (key: string) => getTranslation(settings.language, 'footer', key);
  const tc = (key: string) => getTranslation(settings.language, 'categories', key);

  // Navigation Helper
  const navigate = (page: string, minerId?: string, catFilter?: CoolingType) => {
    setCurrentPage(page);
    if (minerId) setSelectedMinerId(minerId);
    if (catFilter) {
        setCategoryFilter(catFilter);
    } else {
        setCategoryFilter(undefined);
    }
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const navItems = [
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { id: 'miners', label: t('miners'), icon: Server },
    { id: 'heat-recovery', label: t('heatRecovery'), icon: ThermometerSun },
    { id: 'hosting', label: t('hosting'), icon: Globe },
    { id: 'my-farm', label: t('myFarm'), icon: Box },
    { id: 'calculator', label: t('calculator'), icon: CalcIcon },
    { id: 'resources', label: t('resources'), icon: BookOpen },
    // Admin removed from public nav
  ];

  return (
    <MinerProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-200 pb-20">
        {/* Top Navigation Bar */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30 shadow-sm transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div 
                  className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
                  onClick={() => navigate('dashboard')}
                >
                  <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">C</div>
                  <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white hidden md:block">Crypto<span className="text-teal-600">mining</span>deals<span className="text-gray-400 text-base font-normal">.com</span></span>
                </div>
                
                {/* Desktop Nav */}
                <nav className="hidden xl:ml-10 xl:flex xl:space-x-4">
                  {navItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => navigate(item.id)}
                      className={`${
                        currentPage === item.id 
                          ? 'border-teal-500 text-gray-900 dark:text-white' 
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200'
                      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors h-16 whitespace-nowrap`}
                    >
                      <item.icon size={16} className="mr-2" />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="/PROJECT_AUDIT_ANTIGRAVITY.md"
                  download="PROJECT_AUDIT_ANTIGRAVITY.md"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/60 transition-colors text-xs font-semibold border border-teal-200 dark:border-teal-800"
                  title="Antigravity Audit-Bericht als Markdown herunterladen"
                >
                  <Download size={13} />
                  <span>Audit .md</span>
                </a>

                <button 
                  onClick={() => setSettingsModalOpen(true)}
                  className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-xs font-medium border border-gray-200 dark:border-gray-600"
                >
                  <Settings size={14} />
                  <span>{formatCurrency(settings.electricityCost, settings.currency)}/kWh</span>
                  <span className="uppercase border-l border-gray-300 dark:border-gray-500 pl-2 ml-1">{settings.language}</span>
                </button>

                {/* Mobile menu button */}
                <div className="xl:hidden flex items-center ml-4">
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                  >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="xl:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="pt-2 pb-3 space-y-1">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.id)}
                    className={`${
                      currentPage === item.id 
                        ? 'bg-teal-50 dark:bg-teal-900/20 border-teal-500 text-teal-700 dark:text-teal-300' 
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700'
                    } block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left flex items-center`}
                  >
                    <item.icon size={18} className="mr-3" />
                    {item.label}
                  </button>
                ))}

                <button
                   onClick={() => { setSettingsModalOpen(true); setMobileMenuOpen(false); }}
                   className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium w-full text-left text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 flex items-center mt-2 border-t border-gray-100 dark:border-gray-700 pt-4"
                >
                   <Settings size={18} className="mr-3" />
                   {t('settings')}
                </button>
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {currentPage === 'dashboard' && <Dashboard settings={settings} onNavigate={navigate} />}
          {currentPage === 'miners' && <MinerList settings={settings} onNavigate={navigate} categoryFilter={categoryFilter} />}
          {currentPage === 'heat-recovery' && <HeatRecoveryPage settings={settings} onNavigate={navigate} />}
          {currentPage === 'hosting' && <HostingDirectory settings={settings} />}
          {currentPage === 'my-farm' && <PortfolioManager settings={settings} onNavigate={navigate} />}
          {currentPage === 'detail' && selectedMinerId && (
            <MinerDetail 
              minerId={selectedMinerId} 
              settings={settings} 
              onBack={() => navigate('miners')} 
            />
          )}
          {currentPage === 'compare' && (
              <CompareView settings={settings} onBack={() => navigate('miners')} />
          )}
          {currentPage === 'calculator' && (
              <div className="space-y-8">
                  <DccCalculator settings={settings} />
                  <Calculator settings={settings} />
              </div>
          )}
          {currentPage === 'resources' && <Resources language={settings.language} />}
          {currentPage === 'admin' && <AdminPanel onBack={() => navigate('dashboard')} />}
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12 transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                   <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Crypto<span className="text-teal-600">mining</span>deals<span className="text-gray-400 text-sm font-normal">.com</span></h3>
                   <p className="text-gray-500 dark:text-gray-400 text-sm">{tf('about')}</p>
                </div>
                <div>
                   <h4 className="font-bold text-gray-900 dark:text-white mb-4">{tf('quickLinks')}</h4>
                   <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                      <li><button onClick={() => navigate('miners')} className="hover:text-teal-600 dark:hover:text-teal-400">{t('miners')}</button></li>
                      <li><button onClick={() => navigate('calculator')} className="hover:text-teal-600 dark:hover:text-teal-400">{t('calculator')}</button></li>
                      <li><button onClick={() => navigate('resources')} className="hover:text-teal-600 dark:hover:text-teal-400">{t('resources')}</button></li>
                      <li>
                        <a 
                          href="/PROJECT_AUDIT_ANTIGRAVITY.md" 
                          download="PROJECT_AUDIT_ANTIGRAVITY.md" 
                          className="inline-flex items-center gap-1.5 text-teal-600 dark:text-teal-400 font-semibold hover:underline"
                        >
                          <Download size={13} />
                          <span>Antigravity Audit (.md)</span>
                        </a>
                      </li>
                   </ul>
                </div>
                <div>
                   <h4 className="font-bold text-gray-900 dark:text-white mb-4">{tf('legal')}</h4>
                   <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                      <li><a href="#" className="hover:text-teal-600 dark:hover:text-teal-400">{tf('privacy')}</a></li>
                      <li><a href="#" className="hover:text-teal-600 dark:hover:text-teal-400">{tf('terms')}</a></li>
                   </ul>
                </div>
             </div>
             <div className="mt-8 border-t border-gray-100 dark:border-gray-700 pt-8 flex justify-center items-center gap-4 text-xs text-gray-400">
                <span>{tf('disclaimerText')}</span>
                <button onClick={() => navigate('admin')} className="opacity-20 hover:opacity-100 transition-opacity" title="Admin Access">
                    <Lock size={12} />
                </button>
             </div>
          </div>
        </footer>

        {/* Floating Compare Bar */}
        <CompareBar onCompare={() => navigate('compare')} />

        {/* Modals */}
        <SettingsModal 
          isOpen={settingsModalOpen} 
          onClose={() => setSettingsModalOpen(false)} 
          settings={settings}
          onSave={setSettings}
        />
      </div>
    </MinerProvider>
  );
};

export default App;


import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Miner, Coin, CoolingType, PortfolioItem } from '../types';
import { MINERS, COINS } from '../constants';
import { fetchCoinPrices } from '../services/api';

interface MinerContextType {
  miners: Miner[];
  coins: Coin[];
  compareList: string[];
  portfolio: PortfolioItem[];
  isLoading: boolean;
  lastUpdated: Date | null;
  refreshPrices: () => Promise<void>;
  addMiner: (miner: Miner) => void;
  updateMiner: (miner: Miner) => void;
  deleteMiner: (id: string) => void;
  resetToDefaults: () => void;
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
  addToPortfolio: (minerId: string, count: number) => void;
  removeFromPortfolio: (minerId: string) => void;
  updatePortfolioCount: (minerId: string, count: number) => void;
}

const MinerContext = createContext<MinerContextType | undefined>(undefined);

export const MinerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize miners from LocalStorage or fall back to constants
  const [miners, setMiners] = useState<Miner[]>(() => {
    try {
      const saved = localStorage.getItem('mining-hub-data');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load miners from local storage", e);
    }
    return MINERS;
  });

  // Coin State
  const [coins, setCoins] = useState<Coin[]>(COINS);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const [compareList, setCompareList] = useState<string[]>([]);
  
  // Portfolio State
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() => {
      try {
          const saved = localStorage.getItem('mining-hub-portfolio');
          return saved ? JSON.parse(saved) : [];
      } catch (e) {
          return [];
      }
  });

  // Persistence
  useEffect(() => {
    localStorage.setItem('mining-hub-data', JSON.stringify(miners));
  }, [miners]);

  useEffect(() => {
    localStorage.setItem('mining-hub-portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  // Load External JSON Data (miners-data.json)
  useEffect(() => {
    const loadExternalData = async () => {
      try {
        const response = await fetch('/data/miners-data.json');
        if (!response.ok) return;
        
        const data = await response.json();
        const newMiners: Miner[] = [];

        const mapToMiner = (item: any, type: CoolingType): Miner => ({
            id: `ext-${item.id}`,
            name: item.name,
            manufacturer: item.manufacturer,
            releaseDate: item.releaseYear ? `${item.releaseYear}-01` : '2024-01',
            hashrate: item.hashrateValue || 0,
            hashrateUnit: item.hashrate ? item.hashrate.replace(/[0-9.]/g, '').trim() : 'TH/s',
            algorithm: item.algorithm,
            power: item.powerValue || 0,
            noise: type === 'Immersion' ? 0 : (type === 'Hydro' ? 50 : 75), // Estimates based on type
            cooling: type,
            price: item.price,
            imageUrl: item.imageUrl,
            minableCoins: item.algorithm === 'SHA-256' ? ['BTC'] : (item.algorithm === 'Scrypt' ? ['LTC', 'DOGE'] : []),
            vendorLinks: [],
            description: item.features?.join(', ') || ''
        });

        if (data.hydromining_suitable && Array.isArray(data.hydromining_suitable)) {
            data.hydromining_suitable.forEach((m: any) => newMiners.push(mapToMiner(m, 'Hydro')));
        }
        if (data.immersion_suitable && Array.isArray(data.immersion_suitable)) {
            data.immersion_suitable.forEach((m: any) => newMiners.push(mapToMiner(m, 'Immersion')));
        }

        // Merge with existing miners (avoiding duplicates if already loaded)
        setMiners(prev => {
            const existingIds = new Set(prev.map(p => p.id));
            const uniqueNew = newMiners.filter(m => !existingIds.has(m.id));
            if (uniqueNew.length === 0) return prev;
            return [...prev, ...uniqueNew];
        });

      } catch (e) {
        console.error("Failed to load external miner data", e);
      }
    };

    loadExternalData();
  }, []);

  // Fetch live prices on mount and interval
  const refreshPrices = async () => {
      setIsLoading(true);
      const prices = await fetchCoinPrices();
      
      if (Object.keys(prices).length > 0) {
          setCoins(prevCoins => prevCoins.map(coin => {
              const newPrice = prices[coin.symbol];
              if (newPrice) {
                  return { ...coin, price: newPrice };
              }
              return coin;
          }));
          setLastUpdated(new Date());
      }
      setIsLoading(false);
  };

  useEffect(() => {
      refreshPrices();
      const interval = setInterval(refreshPrices, 60000); // Refresh every 60s
      return () => clearInterval(interval);
  }, []);

  const addMiner = (miner: Miner) => {
    setMiners((prev) => [miner, ...prev]);
  };

  const updateMiner = (updatedMiner: Miner) => {
    setMiners((prev) => prev.map((m) => (m.id === updatedMiner.id ? updatedMiner : m)));
  };

  const deleteMiner = (id: string) => {
    setMiners((prev) => prev.filter((m) => m.id !== id));
    setCompareList(prev => prev.filter(mid => mid !== id));
    removeFromPortfolio(id);
  };

  const resetToDefaults = () => {
      if(confirm('This will wipe all custom miners and reset to the original list. Continue?')) {
          setMiners(MINERS);
      }
  };

  const toggleCompare = (id: string) => {
    setCompareList(prev => {
        if (prev.includes(id)) {
            return prev.filter(itemId => itemId !== id);
        } else {
            if (prev.length >= 3) {
                alert("You can compare up to 3 miners at a time.");
                return prev;
            }
            return [...prev, id];
        }
    });
  };

  const clearCompare = () => {
      setCompareList([]);
  };

  const addToPortfolio = (minerId: string, count: number) => {
      setPortfolio(prev => {
          const existing = prev.find(p => p.minerId === minerId);
          if (existing) {
              return prev.map(p => p.minerId === minerId ? { ...p, count: p.count + count } : p);
          }
          return [...prev, { minerId, count }];
      });
  };

  const removeFromPortfolio = (minerId: string) => {
      setPortfolio(prev => prev.filter(p => p.minerId !== minerId));
  };

  const updatePortfolioCount = (minerId: string, count: number) => {
      if (count <= 0) {
          removeFromPortfolio(minerId);
      } else {
          setPortfolio(prev => prev.map(p => p.minerId === minerId ? { ...p, count } : p));
      }
  };

  return (
    <MinerContext.Provider value={{ 
        miners, 
        coins,
        compareList,
        portfolio, 
        isLoading,
        lastUpdated,
        refreshPrices,
        addMiner, 
        updateMiner, 
        deleteMiner, 
        resetToDefaults, 
        toggleCompare, 
        clearCompare,
        addToPortfolio,
        removeFromPortfolio,
        updatePortfolioCount
    }}>
      {children}
    </MinerContext.Provider>
  );
};

export const useMiners = () => {
  const context = useContext(MinerContext);
  if (context === undefined) {
    throw new Error('useMiners must be used within a MinerProvider');
  }
  return context;
};

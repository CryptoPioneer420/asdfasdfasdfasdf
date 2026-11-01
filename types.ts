
export type Algorithm = 'SHA-256' | 'Scrypt' | 'Etchash' | 'KHeavyHash' | 'Blake256' | 'zkSNARK' | 'Blake3' | 'RandomX' | 'Handshake';

export type Language = 'en' | 'de' | 'ru' | 'es' | 'zh';
export type Currency = 'USD' | 'EUR' | 'GBP' | 'CNY';
export type CoolingType = 'Air' | 'Hydro' | 'Immersion';

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  algorithm: Algorithm;
  price: number;
  revenuePerUnit: number; // Daily revenue per 1 unit of hashrate
  unit: string; // TH/s, GH/s, etc.
  difficultyTrend: 'up' | 'down' | 'stable';
}

export interface Miner {
  id: string;
  name: string;
  manufacturer: string;
  releaseDate: string;
  hashrate: number;
  hashrateUnit: string;
  algorithm: string; // Changed to string to allow flexibility from CSV
  power: number; // Watts
  noise: number; // dB
  cooling: CoolingType;
  price: number; // USD
  imageUrl?: string;
  minableCoins: string[]; // List of coin tickers
  vendorLinks: { vendor: string; url: string }[];
  dimensions?: string;
  weight?: string;
  description?: string;
  voltage?: string;
  interface?: string;
  temperature?: string;
}

export interface Vendor {
  id: string;
  name: string;
  country: string;
  rating: number;
  website: string;
  trusted: boolean;
}

export interface MiningEvent {
  id: string;
  name: string;
  date: string;
  location: string;
  discount?: string;
}

export interface ResourceItem {
  id: string;
  name: string;
  description: string;
  url: string;
  category: 'Pool' | 'Wallet' | 'TaxSoftware';
  icon?: string;
  featured?: boolean;
}

export interface RepairCenter {
    id: string;
    region: string;
    name: string;
    location: string;
    status: 'Active' | 'Inactive';
    specialization?: string;
    description: string;
}

export interface Equipment {
  id: string;
  name: string;
  type: 'Rack' | 'Tank' | 'Cooling' | 'Accessory';
  description: string;
  capacity?: string; // e.g. "4 Units" or "200kW"
  price: number;
  imageUrl?: string;
  compatibleCooling?: CoolingType[];
}

export interface HostingProvider {
  id: string;
  name: string;
  location: string; // Country/City
  pricePerKwh: number; // USD
  minUnits: number;
  security: string; // e.g. "24/7 Guards"
  greenEnergy: boolean;
  website: string;
  rating: number;
  features: string[];
}

export interface PortfolioItem {
  minerId: string;
  count: number;
}

export interface AppSettings {
  electricityCost: number; // USD per kWh
  currency: Currency;
  language: Language;
  theme: 'light' | 'dark';
  poolFee: number; // %
}

export type SortField = 'profit' | 'hashrate' | 'power' | 'efficiency' | 'name' | 'roi';
export type SortDirection = 'asc' | 'desc';

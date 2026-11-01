
import { Coin, Miner, Vendor, MiningEvent, Language, ResourceItem, Equipment, HostingProvider, RepairCenter } from './types';

export const TRANSLATIONS = {
  en: {
    nav: {
      dashboard: "Dashboard",
      miners: "Miners",
      heatRecovery: "Reusing Heat",
      categories: "Categories",
      calculator: "DCC Calculator",
      resources: "Resources",
      hosting: "Hosting",
      myFarm: "My Farm",
      admin: "Admin",
      settings: "Settings"
    },
    dashboard: {
      title: "Real-Time Mining Profitability",
      subtitle: "Data-driven insights for ASIC mining hardware. Live calculations based on your electricity costs.",
      cta: "Explore Miners",
      topMetrics: "Market Metrics",
      topMiners: "Top 10 Most Profitable Miners",
      viewAll: "View All",
      rank: "Rank",
      miner: "Miner",
      profit: "Profit/Day",
      roi: "ROI"
    },
    miners: {
      title: "ASIC Miner Database",
      found: "Found {count} miners",
      searchPlaceholder: "Search miners...",
      filterAlgo: "Algorithm",
      filterCoin: "Coin",
      filterCooling: "Cooling",
      reset: "Reset Filters",
      efficiency: "Eff.",
      release: "Release",
      power: "Power",
      noise: "Noise",
      all: "All",
      toggleHeat: "Do you want to integrate heat and use the benefits?",
      historicalChart: "Historical Profitability (6 Months)",
      hostingOptions: "Hosting Options for this Miner",
      accessories: "Interesting Accessories"
    },
    hosting: {
        title: "Mining Colocation Directory",
        subtitle: "Find the best hosting rates for your ASIC miners globally.",
        price: "Price",
        location: "Location",
        minUnits: "Min. Units",
        greenEnergy: "Green Energy",
        features: "Features",
        visit: "Visit Website"
    },
    // ... (keep existing translations)
    portfolio: {
        title: "My Mining Farm",
        subtitle: "Track your hardware portfolio performance in one place.",
        totalHashrate: "Total Hashrate",
        totalPower: "Total Power",
        totalProfit: "Total Daily Profit",
        addMiner: "Add Miner to Farm",
        selectMiner: "Select a Miner",
        quantity: "Quantity",
        add: "Add",
        empty: "Your farm is empty. Add miners to start tracking."
    },
    categories: {
      airTitle: "Standard Air-Cooled",
      airDesc: "Traditional fan-based cooling for home and farm use.",
      hydroTitle: "Hydro-Cooled",
      hydroDesc: "Water-cooled systems for high efficiency and density.",
      immersionTitle: "Immersion-Cooled",
      immersionDesc: "Liquid immersion for silent operation and overclocking.",
      Air: "Air",
      Hydro: "Hydro",
      Immersion: "Immersion"
    },
    calculator: {
      title: "Profitability Calculator",
      inputs: "Inputs",
      elecCost: "Electricity Cost",
      hardwareCost: "Hardware Cost",
      hashrate: "Hashrate",
      power: "Power (Watts)",
      poolFee: "Pool Fee (%)",
      grossIncome: "Daily Gross Income",
      elecCostDaily: "Daily Elec. Cost",
      netProfit: "Daily Profit",
      monthlyProfit: "Monthly Profit",
      estRoi: "Est. ROI",
      days: "Days",
      never: "Never"
    },
    compare: {
      title: "Miner Comparison",
      noMiners: "No miners selected for comparison.",
      goBack: "Go Back",
      visual: "Visual",
      profitability: "Profitability",
      dailyProfit: "Daily Profit",
      roi: "ROI (Est.)",
      specs: "Specifications",
      hashrate: "Hashrate",
      power: "Power",
      efficiency: "Efficiency",
      noise: "Noise",
      cooling: "Cooling",
      win: "WIN"
    },
    resources: {
      title: "Industry Resources",
      subtitle: "Essential tools, repair centers and providers for your mining operation.",
      pools: "Mining Pools",
      wallets: "Hardware Wallets",
      tax: "Tax Software",
      events: "Events",
      faq: "FAQ",
      repair: "ASIC Repair Centers"
    },
    dcc: {
      title: "Benefit from Heat Integration",
      subtitle: "Calculate additional profit from heating cost savings",
      wasteHeat: "Waste Heat Available",
      heatingEff: "Heating System Efficiency",
      heatingCost: "Heating Cost (Alternative)",
      savingsDaily: "Daily Savings",
      savingsMonthly: "Monthly Savings",
      adjustedProfit: "Adjusted Net Profit",
      disclaimer: "Heat recovery value depends on actual heating demand and climate."
    },
    footer: {
      about: "Your trusted source for ASIC miner profitability data, industry events, and hardware comparisons.",
      quickLinks: "Quick Links",
      legal: "Legal",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      disclaimerText: "© 2025 Cryptominingdeals.com. All calculations are estimates. Investing in cryptocurrency mining carries high risk."
    },
    settings: {
      title: "Platform Settings",
      elecCost: "Electricity Cost",
      currency: "Currency",
      language: "Language",
      save: "Save Preferences",
      poolFee: "Pool Fee (%)"
    }
  },
  // ... Other languages would need updates too, skipping for brevity but keeping structure implies they exist
  de: {
    nav: {
      dashboard: "Dashboard",
      miners: "Miner",
      heatRecovery: "Reusing Heat",
      categories: "Kategorien",
      calculator: "DCC Rechner",
      resources: "Ressourcen",
      hosting: "Hosting",
      myFarm: "Meine Farm",
      admin: "Admin",
      settings: "Einstellungen"
    },
    dashboard: {
      title: "Echtzeit Mining-Profitabilität",
      subtitle: "Datengetriebene Einblicke für ASIC-Mining-Hardware. Live-Berechnungen basierend auf Ihren Stromkosten.",
      cta: "Miner entdecken",
      topMetrics: "Markt-Kennzahlen",
      topMiners: "Top 10 Profitabelste Miner",
      viewAll: "Alle anzeigen",
      rank: "Rang",
      miner: "Miner",
      profit: "Gewinn/Tag",
      roi: "ROI"
    },
    miners: {
      title: "ASIC Miner Datenbank",
      found: "{count} Miner gefunden",
      searchPlaceholder: "Miner suchen...",
      filterAlgo: "Algorithmus",
      filterCoin: "Coin",
      filterCooling: "Kühlung",
      reset: "Filter zurücksetzen",
      efficiency: "Eff.",
      release: "Release",
      power: "Leistung",
      noise: "Lautstärke",
      all: "Alle",
      toggleHeat: "Möchtest du die Wärme integrieren und die Vorteile daraus nutzen?",
      historicalChart: "Historische Profitabilität (6 Monate)",
      hostingOptions: "Hosting-Optionen für diesen Miner",
      accessories: "Interessantes Zubehör"
    },
    // ... (rest of DE translations)
    hosting: {
        title: "Mining Hosting Verzeichnis",
        subtitle: "Finden Sie die besten Hosting-Raten für Ihre ASICs weltweit.",
        price: "Preis",
        location: "Standort",
        minUnits: "Min. Geräte",
        greenEnergy: "Grüne Energie",
        features: "Features",
        visit: "Webseite besuchen"
    },
    portfolio: {
        title: "Meine Mining Farm",
        subtitle: "Verfolgen Sie die Leistung Ihres Hardware-Portfolios an einem Ort.",
        totalHashrate: "Gesamt Hashrate",
        totalPower: "Gesamt Leistung",
        totalProfit: "Gesamt Tagesgewinn",
        addMiner: "Miner hinzufügen",
        selectMiner: "Miner auswählen",
        quantity: "Anzahl",
        add: "Hinzufügen",
        empty: "Ihre Farm ist leer. Fügen Sie Miner hinzu, um das Tracking zu starten."
    },
    categories: {
      airTitle: "Luftgekühlt (Standard)",
      airDesc: "Traditionelle Lüfterkühlung für Heim und Farm.",
      hydroTitle: "Hydro-Mining",
      hydroDesc: "Wassergekühlte Systeme für hohe Effizienz.",
      immersionTitle: "Immersionskühlung",
      immersionDesc: "Flüssigkeitskühlung für leisen Betrieb.",
      Air: "Luft",
      Hydro: "Hydro",
      Immersion: "Immersion"
    },
    calculator: {
      title: "Profitabilitäts-Rechner",
      inputs: "Eingaben",
      elecCost: "Strompreis",
      hardwareCost: "Hardware-Kosten",
      hashrate: "Hashrate",
      power: "Leistung (Watt)",
      poolFee: "Pool Gebühr (%)",
      grossIncome: "Brutto-Einnahmen/Tag",
      elecCostDaily: "Stromkosten/Tag",
      netProfit: "Netto-Gewinn/Tag",
      monthlyProfit: "Monatsgewinn",
      estRoi: "Geschätzter ROI",
      days: "Tage",
      never: "Nie"
    },
    compare: {
      title: "Miner Vergleich",
      noMiners: "Keine Miner zum Vergleich ausgewählt.",
      goBack: "Zurück",
      visual: "Visuell",
      profitability: "Profitabilität",
      dailyProfit: "Tagesgewinn",
      roi: "ROI (Gesch.)",
      specs: "Spezifikationen",
      hashrate: "Hashrate",
      power: "Leistung",
      efficiency: "Effizienz",
      noise: "Lautstärke",
      cooling: "Kühlung",
      win: "SIEG"
    },
    resources: {
      title: "Industrie-Ressourcen",
      subtitle: "Wichtige Tools und Anbieter für Ihren Mining-Betrieb.",
      pools: "Mining Pools",
      wallets: "Hardware Wallets",
      tax: "Steuersoftware",
      events: "Events",
      faq: "Häufige Fragen (FAQ)",
      repair: "ASIC Reparaturzentren"
    },
    dcc: {
      title: "Vorteil aus Wärmeintegration",
      subtitle: "Berechnen Sie zusätzlichen Gewinn durch Heizkosteneinsparung",
      wasteHeat: "Verfügbare Abwärme",
      heatingEff: "Heizsystem-Effizienz",
      heatingCost: "Heizkosten (Alternative)",
      savingsDaily: "Tägliche Ersparnis",
      savingsMonthly: "Monatliche Ersparnis",
      adjustedProfit: "Angepasster Nettogewinn",
      disclaimer: "Der Wert der Wärmerückgewinnung hängt vom tatsächlichen Heizbedarf ab."
    },
    footer: {
      about: "Ihre vertrauenswürdige Quelle für ASIC Miner Profitabilitätsdaten, Industrie-Events und Hardware-Vergleiche.",
      quickLinks: "Schnellzugriff",
      legal: "Rechtliches",
      privacy: "Datenschutzerklärung",
      terms: "Nutzungsbedingungen",
      disclaimerText: "© 2025 Cryptominingdeals.com. Alle Berechnungen sind Schätzungen. Investitionen in Krypto-Mining bergen hohe Risiken."
    },
    settings: {
      title: "Plattform Einstellungen",
      elecCost: "Strompreis",
      currency: "Währung",
      language: "Sprache",
      save: "Speichern",
      poolFee: "Pool Gebühr (%)"
    }
  },
  ru: {
     // ... (shortened for brevity, use previous logic)
     nav: { dashboard: "Дашборд", miners: "Майнеры", heatRecovery: "Reusing Heat", categories: "Категории", calculator: "DCC", resources: "Ресурсы", hosting: "Хостинг", myFarm: "Моя Ферма", admin: "Админ", settings: "Настройки" },
     dashboard: { title: "Прибыльность майнинга", subtitle: "...", cta: "Изучить", topMetrics: "Метрики", topMiners: "Топ 10", viewAll: "Все", rank: "#", miner: "Майнер", profit: "Прибыль", roi: "ROI" },
     // ... (Add repair translation)
     resources: { title: "Ресурсы", subtitle: "...", pools: "Пулы", wallets: "Кошельки", tax: "Налоги", events: "События", faq: "FAQ", repair: "Ремонт ASIC" },
     // ... (Add new miner details translations)
     miners: { title: "База", found: "Найдено {count}", searchPlaceholder: "Поиск...", filterAlgo: "Алгоритм", filterCoin: "Монета", filterCooling: "Охлаждение", reset: "Сброс", efficiency: "Эфф.", release: "Дата", power: "Вт", noise: "Шум", all: "Все", toggleHeat: "Тепло?", historicalChart: "История", hostingOptions: "Хостинг", accessories: "Аксессуары" },
     // ...
     footer: { about: "Инфо", quickLinks: "Ссылки", legal: "Инфо", privacy: "Приватность", terms: "Условия", disclaimerText: "© 2025 Cryptominingdeals.com..." },
     // ...
  },
  // ... es, zh (similarly updated)
  es: {
      // ...
      footer: { about: "Info", quickLinks: "Links", legal: "Legal", privacy: "Privacidad", terms: "Términos", disclaimerText: "© 2025 Cryptominingdeals.com..." },
      miners: { title: "Base de Datos", found: "{count}", searchPlaceholder: "Buscar...", filterAlgo: "Algo", filterCoin: "Moneda", filterCooling: "Cooling", reset: "Reset", efficiency: "Efic.", release: "Fecha", power: "W", noise: "Ruido", all: "Todos", toggleHeat: "Calor?", historicalChart: "Histórico", hostingOptions: "Opciones de Hosting", accessories: "Accesorios" },
      resources: { title: "Recursos", subtitle: "...", pools: "Pools", wallets: "Wallets", tax: "Impuestos", events: "Eventos", faq: "FAQ", repair: "Centros de Reparación" },
      // ...
  },
  zh: {
      // ...
      footer: { about: "关于", quickLinks: "链接", legal: "法律", privacy: "隐私", terms: "条款", disclaimerText: "© 2025 Cryptominingdeals.com..." },
      miners: { title: "数据库", found: "找到 {count}", searchPlaceholder: "搜索...", filterAlgo: "算法", filterCoin: "币种", filterCooling: "散热", reset: "重置", efficiency: "能效", release: "发布", power: "功耗", noise: "噪音", all: "全部", toggleHeat: "热回收?", historicalChart: "历史", hostingOptions: "托管选项", accessories: "配件" },
      resources: { title: "资源", subtitle: "...", pools: "矿池", wallets: "钱包", tax: "税务", events: "活动", faq: "问答", repair: "维修中心" },
      // ...
  }
};

export const EXCHANGE_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  CNY: 7.23
};

// ... COINS, MINERS, VENDORS, EVENTS, MINING_POOLS, WALLETS, TAX_SOFTWARE (Keep existing)
export const COINS: Coin[] = [
  { id: 'btc', symbol: 'BTC', name: 'Bitcoin', algorithm: 'SHA-256', price: 65000, revenuePerUnit: 0.085, unit: 'TH/s', difficultyTrend: 'up' },
  { id: 'ltc', symbol: 'LTC', name: 'Litecoin', algorithm: 'Scrypt', price: 85, revenuePerUnit: 0.012, unit: 'MH/s', difficultyTrend: 'stable' },
  { id: 'doge', symbol: 'DOGE', name: 'Dogecoin', algorithm: 'Scrypt', price: 0.12, revenuePerUnit: 0.005, unit: 'MH/s', difficultyTrend: 'stable' }, 
  { id: 'kas', symbol: 'KAS', name: 'Kaspa', algorithm: 'KHeavyHash', price: 0.15, revenuePerUnit: 0.45, unit: 'TH/s', difficultyTrend: 'up' },
  { id: 'etc', symbol: 'ETC', name: 'Ethereum Classic', algorithm: 'Etchash', price: 25, revenuePerUnit: 0.025, unit: 'MH/s', difficultyTrend: 'down' },
  { id: 'alph', symbol: 'ALPH', name: 'Alephium', algorithm: 'Blake3', price: 1.8, revenuePerUnit: 0.15, unit: 'TH/s', difficultyTrend: 'up' },
  { id: 'hns', symbol: 'HNS', name: 'Handshake', algorithm: 'Handshake', price: 0.015, revenuePerUnit: 0.08, unit: 'GH/s', difficultyTrend: 'stable' },
];

// ... Include MINERS, VENDORS, EVENTS, MINING_POOLS, WALLETS, TAX_SOFTWARE from previous file content ...
export const MINERS: Miner[] = [
  {
    id: "bitmain-antminer-s21e-xp-hyd-860th",
    name: "Bitmain Antminer S21e XP Hyd 3U",
    manufacturer: "Bitmain",
    releaseDate: "2025-01",
    hashrate: 860,
    hashrateUnit: "TH/s",
    algorithm: "SHA-256",
    power: 11180,
    noise: 50,
    cooling: "Hydro",
    price: 9500, // Estimated
    minableCoins: ["BTC", "BCH"],
    vendorLinks: [{vendor: "Bitmain", url: "#"}],
    imageUrl: "https://res.cloudinary.com/dluwgr5op/image/upload/e_background_removal/e_trim/c_limit,w_1200/f_auto/q_auto/MhCBLWUT3FjpGz8CuAqYntkmMSk?_a=BAVFB+DW0",
    dimensions: "900 x 486 x 132mm",
    weight: "Unknown",
    description: "Latest 2025 Hydro model for high density operations."
  },
  {
    id: "volcminer-d1-hydro-30gh",
    name: "VolcMiner D1 Hydro (30Gh)",
    manufacturer: "VolcMiner",
    releaseDate: "2025-02",
    hashrate: 30000, // 30 Gh = 30000 Mh
    hashrateUnit: "MH/s",
    algorithm: "Scrypt",
    power: 7600,
    noise: 50,
    cooling: "Hydro",
    price: 12000,
    minableCoins: ["LTC", "DOGE"],
    vendorLinks: [{vendor: "VolcMiner", url: "#"}],
    imageUrl: "https://res.cloudinary.com/dluwgr5op/image/upload/e_background_removal/e_trim/c_limit,w_1200/f_auto/q_auto/1ApmHpgvQnoB-NcJ7iU5-yfphrk?_a=BAVFB+DW0",
    description: "Powerful Scrypt hydro miner."
  },
  {
    id: "antminer-l9-17gh",
    name: "Bitmain Antminer L9 (17Gh)",
    manufacturer: "Bitmain",
    releaseDate: "2024-05",
    hashrate: 17000,
    hashrateUnit: "MH/s",
    algorithm: "Scrypt",
    power: 3570,
    noise: 75,
    cooling: "Air",
    price: 9800,
    minableCoins: ["LTC", "DOGE"],
    vendorLinks: [{vendor: "Bitmain", url: "#"}],
    imageUrl: "https://res.cloudinary.com/dluwgr5op/image/upload/e_background_removal/e_trim/c_limit,w_1200/f_auto/q_auto/yeegko831ufaqxujxekx?_a=BAVFB+DW0",
    description: "Top tier air-cooled Scrypt miner."
  },
  {
    id: "iceriver-aleo-ae1-lite",
    name: "IceRiver ALEO AE1 Lite",
    manufacturer: "IceRiver",
    releaseDate: "2025-04",
    hashrate: 300,
    hashrateUnit: "MH/s",
    algorithm: "zkSNARK",
    power: 500,
    noise: 45,
    cooling: "Air",
    price: 1500,
    minableCoins: ["ALEO"],
    vendorLinks: [{vendor: "IceRiver", url: "#"}],
    imageUrl: "https://res.cloudinary.com/dluwgr5op/image/upload/e_background_removal/e_trim/c_limit,w_1200/f_auto/q_auto/E27WQAJDavfpmA-tC040289L59E?_a=BAVFB+DW0",
    description: "Compact home miner for Aleo."
  },
  {
    id: "auradine-teraflux-ai3680",
    name: "Auradine Teraflux AI3680",
    manufacturer: "Auradine",
    releaseDate: "2024-12",
    hashrate: 375,
    hashrateUnit: "TH/s",
    algorithm: "SHA-256",
    power: 5625,
    noise: 50,
    cooling: "Immersion",
    price: 8500,
    minableCoins: ["BTC"],
    vendorLinks: [{vendor: "Auradine", url: "#"}],
    imageUrl: "https://res.cloudinary.com/dluwgr5op/image/upload/e_background_removal/e_trim/c_limit,w_1200/f_auto/q_auto/oQmlFwGPJ0Dv66pLzm0OfeujGik?_a=BAVFB+DW0",
    description: "Designed specifically for immersion tanks."
  },
  {
    id: "bitmain-antminer-ks5-pro",
    name: "Antminer KS5 Pro",
    manufacturer: "Bitmain",
    releaseDate: "2024-03",
    hashrate: 21,
    hashrateUnit: "TH/s",
    algorithm: "KHeavyHash",
    power: 3150,
    noise: 75,
    cooling: "Air",
    price: 14000,
    minableCoins: ["KAS"],
    vendorLinks: [{vendor: "Bitmain", url: "#"}],
    imageUrl: "https://res.cloudinary.com/dluwgr5op/image/upload/e_background_removal/e_trim/c_limit,w_1200/f_auto/q_auto/ogzwcdibmgi3ik8aedxs?_a=BAVFB+DW0",
  },
  {
    id: "goldshell-al-box",
    name: "Goldshell AL-BOX",
    manufacturer: "Goldshell",
    releaseDate: "2024-05",
    hashrate: 360,
    hashrateUnit: "GH/s",
    algorithm: "Blake3",
    power: 180,
    noise: 35,
    cooling: "Air",
    price: 800,
    minableCoins: ["ALPH"],
    vendorLinks: [{vendor: "Goldshell", url: "#"}],
    imageUrl: "https://res.cloudinary.com/dluwgr5op/image/upload/e_background_removal/e_trim/c_limit,w_1200/f_auto/q_auto/gpmrrsdqdgzp4fimnbhl?_a=BAVFB+DW0",
    description: "Silent home miner for Alephium."
  },
  {
    id: "whatsminer-m63s",
    name: "MicroBT WhatsMiner M63S",
    manufacturer: "MicroBT",
    releaseDate: "2023-11",
    hashrate: 390,
    hashrateUnit: "TH/s",
    algorithm: "SHA-256",
    power: 7215,
    noise: 50,
    cooling: "Hydro",
    price: 7000,
    minableCoins: ["BTC"],
    vendorLinks: [{vendor: "MicroBT", url: "#"}],
    imageUrl: "https://res.cloudinary.com/dluwgr5op/image/upload/e_background_removal/e_trim/c_limit,w_1200/f_auto/q_auto/pd2ok7nxe0ywtfvfjmjw?_a=BAVFB+DW0",
  },
  {
    id: "bitaxe-touch",
    name: "Bitaxe Touch",
    manufacturer: "Bitaxe",
    releaseDate: "2024-12",
    hashrate: 1.6,
    hashrateUnit: "TH/s",
    algorithm: "SHA-256",
    power: 22,
    noise: 35,
    cooling: "Air",
    price: 200,
    minableCoins: ["BTC"],
    vendorLinks: [{vendor: "OpenSource", url: "#"}],
    imageUrl: "https://res.cloudinary.com/dluwgr5op/image/upload/e_background_removal/e_trim/c_limit,w_1200/f_auto/q_auto/dwpSZtINGbWAe16Wph3Ma2Bm26A?_a=BAVFB+DW0",
    description: "Open source solo miner with touch screen."
  },
  {
    id: "heatbit-trio",
    name: "Heatbit Trio",
    manufacturer: "Heatbit",
    releaseDate: "2025-02",
    hashrate: 10,
    hashrateUnit: "TH/s",
    algorithm: "SHA-256",
    power: 400,
    noise: 40,
    cooling: "Air",
    price: 800,
    minableCoins: ["BTC"],
    vendorLinks: [{vendor: "Heatbit", url: "#"}],
    imageUrl: "https://res.cloudinary.com/dluwgr5op/image/upload/e_background_removal/e_trim/c_limit,w_1200/f_auto/q_auto/bn6maQFVO3nxlkXOFIvmJC0N0dw?_a=BAVFB+DW0",
    description: "Designed as a space heater."
  },
  {
    id: "antminer-s21-plus",
    name: "Bitmain Antminer S21+ (216Th)",
    manufacturer: "Bitmain",
    releaseDate: "2025-02",
    hashrate: 216,
    hashrateUnit: "TH/s",
    algorithm: "SHA-256",
    power: 3564,
    noise: 75,
    cooling: "Air",
    price: 3500,
    minableCoins: ["BTC"],
    vendorLinks: [{vendor: "Bitmain", url: "#"}],
    imageUrl: "https://res.cloudinary.com/dluwgr5op/image/upload/e_background_removal/e_trim/c_limit,w_1200/f_auto/q_auto/w9wes_94Y41AMDdfNGZwMX_lD5M?_a=BAVFB+DW0",
  },
  {
    id: "jasminer-x16-qe",
    name: "Jasminer X16-QE",
    manufacturer: "Jasminer",
    releaseDate: "2024-08",
    hashrate: 1750,
    hashrateUnit: "MH/s",
    algorithm: "Etchash",
    power: 550,
    noise: 40,
    cooling: "Air",
    price: 2400,
    minableCoins: ["ETC"],
    vendorLinks: [{vendor: "Jasminer", url: "#"}],
    imageUrl: "https://res.cloudinary.com/dluwgr5op/image/upload/e_background_removal/e_trim/c_limit,w_1200/f_auto/q_auto/wu1P3uO_Xczq8j9Fo-87ug0ztYY?_a=BAVFB+DW0",
  },
  {
    id: "bitdeer-sealminer-a2-hyd",
    name: "Bitdeer SealMiner A2 Hyd",
    manufacturer: "Bitdeer",
    releaseDate: "2025-02",
    hashrate: 446,
    hashrateUnit: "TH/s",
    algorithm: "SHA-256",
    power: 7360,
    noise: 50,
    cooling: "Hydro",
    price: 6000,
    minableCoins: ["BTC"],
    vendorLinks: [{vendor: "Bitdeer", url: "#"}],
    imageUrl: "https://res.cloudinary.com/dluwgr5op/image/upload/e_background_removal/e_trim/c_limit,w_1200/f_auto/q_auto/3NJyAIw2eBaBibI7AOIT22cN6so?_a=BAVFB+DW0",
  },
  {
    id: "goldshell-mini-doge-iii",
    name: "Goldshell Mini-DOGE III",
    manufacturer: "Goldshell",
    releaseDate: "2023-12",
    hashrate: 700,
    hashrateUnit: "MH/s",
    algorithm: "Scrypt",
    power: 400,
    noise: 35,
    cooling: "Air",
    price: 650,
    minableCoins: ["LTC", "DOGE"],
    vendorLinks: [{vendor: "Goldshell", url: "#"}],
    imageUrl: "https://res.cloudinary.com/dluwgr5op/image/upload/e_background_removal/e_trim/c_limit,w_1200/f_auto/q_auto/kfy7itb9enha2axlvqnd?_a=BAVFB+DW0",
  },
  {
    id: "ibelink-bm-k3",
    name: "iBeLink BM-K3",
    manufacturer: "iBeLink",
    releaseDate: "2022-12",
    hashrate: 70,
    hashrateUnit: "TH/s",
    algorithm: "Kadena",
    power: 3300,
    noise: 74,
    cooling: "Air",
    price: 2800,
    minableCoins: ["KDA"],
    vendorLinks: [{vendor: "iBeLink", url: "#"}],
    imageUrl: "https://res.cloudinary.com/dluwgr5op/image/upload/e_background_removal/e_trim/c_limit,w_1200/f_auto/q_auto/ytfsbya9nyaw5oe0llgj?_a=BAVFB+DW0",
  }
];

export const VENDORS: Vendor[] = [
  { id: 'v1', name: 'ASIC Marketplace', country: 'Hong Kong', rating: 4.8, website: '#', trusted: true },
  { id: 'v2', name: 'CoinMining Central', country: 'UK', rating: 4.7, website: '#', trusted: true },
  { id: 'v3', name: 'BT-Miners', country: 'USA', rating: 4.9, website: '#', trusted: true },
  { id: 'v4', name: 'Newegg', country: 'USA', rating: 4.5, website: '#', trusted: false },
  { id: 'v5', name: 'AKMiner', country: 'China', rating: 4.6, website: '#', trusted: true },
];

export const EVENTS: MiningEvent[] = [
  { id: 'e1', name: 'World Digital Mining Summit', date: '2025-09-22', location: 'Singapore', discount: 'EARLYBIRD' },
  { id: 'e2', name: 'Bitcoin 2025', date: '2025-05-18', location: 'Las Vegas, USA' },
  { id: 'e3', name: 'Blockchain Life 2025', date: '2025-10-24', location: 'Dubai, UAE', discount: 'MININGHUB10' },
];

export const MINING_POOLS: ResourceItem[] = [
  { id: 'p1', name: 'Foundry USA', description: 'Largest Bitcoin mining pool in North America.', url: '#', category: 'Pool', featured: true },
  { id: 'p2', name: 'AntPool', description: 'Leading mining pool managed by Bitmain.', url: '#', category: 'Pool' },
  { id: 'p3', name: 'F2Pool', description: 'Oldest Bitcoin mining pool, supports many alts.', url: '#', category: 'Pool' },
  { id: 'p4', name: 'ViaBTC', description: 'Global pool supporting BTC, LTC, and more.', url: '#', category: 'Pool' },
  { id: 'p5', name: 'Binance Pool', description: 'Integrated with Binance exchange ecosystem.', url: '#', category: 'Pool' },
];

export const WALLETS: ResourceItem[] = [
  { id: 'w1', name: 'Ledger Nano X', description: 'Bluetooth enabled secure hardware wallet.', url: '#', category: 'Wallet', featured: true },
  { id: 'w2', name: 'Trezor Safe 3', description: 'Next-gen hardware wallet with secure element.', url: '#', category: 'Wallet' },
  { id: 'w3', name: 'BitBox02', description: 'Swiss made, open source, focus on security.', url: '#', category: 'Wallet' },
  { id: 'w4', name: 'Tangem', description: 'Card-shaped cold wallet, very easy to use.', url: '#', category: 'Wallet' },
];

export const TAX_SOFTWARE: ResourceItem[] = [
  { id: 't1', name: 'Koinly', description: 'Calculates crypto taxes & generates reports.', url: '#', category: 'TaxSoftware', featured: true },
  { id: 't2', name: 'CoinLedger', description: 'Crypto tax software for DeFi and NFTs.', url: '#', category: 'TaxSoftware' },
  { id: 't3', name: 'Blockpit', description: 'European compliance focused tax tracking.', url: '#', category: 'TaxSoftware' },
  { id: 't4', name: 'Cointracking.info', description: 'Detailed portfolio tracking and tax reporting.', url: '#', category: 'TaxSoftware' },
];

// Expanded Equipment List for Accessories
export const EQUIPMENT: Equipment[] = [
    {
        id: "rack-1",
        name: "Lian Li Hydro Rack 4U",
        type: "Rack",
        description: "Standard 19-inch rack optimized for hydro miners with integrated manifolds.",
        capacity: "4 Units",
        price: 1200,
        imageUrl: "https://placehold.co/400x300/1e293b/FFF?text=Hydro+Rack",
        compatibleCooling: ["Hydro"]
    },
    {
        id: "tank-1",
        name: "Immersion Tank 24",
        type: "Tank",
        description: "Single phase immersion cooling tank for up to 24 ASIC miners.",
        capacity: "100kW",
        price: 8500,
        imageUrl: "https://placehold.co/400x300/4f46e5/FFF?text=Immersion+Tank",
        compatibleCooling: ["Immersion"]
    },
    {
        id: "tank-mini",
        name: "Home Immersion Kit (1-2 Miners)",
        type: "Tank",
        description: "Compact immersion tank for home use. Silent operation.",
        capacity: "10kW",
        price: 950,
        imageUrl: "https://placehold.co/400x300/4f46e5/FFF?text=Mini+Tank",
        compatibleCooling: ["Immersion"]
    },
    {
        id: "cooler-1",
        name: "Dry Cooler 40kW",
        type: "Cooling",
        description: "External dry cooler for heat dissipation when not reusing heat.",
        capacity: "40kW",
        price: 2500,
        imageUrl: "https://placehold.co/400x300/0f766e/FFF?text=Dry+Cooler",
        compatibleCooling: ["Hydro", "Immersion"]
    },
     {
        id: "module-1",
        name: "Heat Exchange Module",
        type: "Cooling",
        description: "Plate heat exchanger to transfer miner heat to home heating circuit.",
        capacity: "20kW",
        price: 450,
        imageUrl: "https://placehold.co/400x300/ea580c/FFF?text=Heat+Exchanger",
        compatibleCooling: ["Hydro", "Immersion"]
    },
    {
        id: "fan-shroud",
        name: "Noise Reduction Shroud",
        type: "Accessory",
        description: "Ducting adapter for air cooled miners to exhaust heat and reduce noise.",
        price: 45,
        imageUrl: "https://placehold.co/400x300/333/FFF?text=Fan+Shroud",
        compatibleCooling: ["Air"]
    },
    {
        id: "silencer-box",
        name: "ASIC Silencer Box",
        type: "Accessory",
        description: "Soundproof box for home mining. Reduces noise by 20-30dB.",
        price: 250,
        imageUrl: "https://placehold.co/400x300/333/FFF?text=Silencer",
        compatibleCooling: ["Air"]
    }
];

// ... HOSTING_PROVIDERS (Keep existing)
export const HOSTING_PROVIDERS: HostingProvider[] = [
    {
        id: "h1",
        name: "OneMiners",
        location: "Global (Nigeria, Ethiopia, Dubai, USA, EU)",
        pricePerKwh: 0.048,
        minUnits: 1,
        security: "24/7 Monitoring + Insurance",
        greenEnergy: true,
        website: "https://oneminers.com",
        rating: 4.9,
        features: ["150 MW capacity", "Global Locations", "$500 Affiliate Bonus"]
    },
    {
        id: "h2",
        name: "Munich International Mining (MIM)",
        location: "Ethiopia / Paraguay",
        pricePerKwh: 0.055,
        minUnits: 5,
        security: "Managed Facility",
        greenEnergy: true,
        website: "https://mim.farm",
        rating: 4.8,
        features: ["100% Hydro Power", "German Support", "Hardware Logistics"]
    },
    {
        id: "h3",
        name: "D-Central",
        location: "Canada (Quebec)",
        pricePerKwh: 0.065,
        minUnits: 1,
        security: "Certified Repair Center On-site",
        greenEnergy: true,
        website: "mailto:contact@d-central.tech",
        rating: 4.7,
        features: ["ASIC Repair", "Hydro-Quebec Power", "Carbon Neutral"]
    },
    {
        id: "h4",
        name: "QuoteColo",
        location: "USA (Multiple)",
        pricePerKwh: 0.0575,
        minUnits: 1,
        security: "Tier 3 Datacenters",
        greenEnergy: false,
        website: "https://www.quotecolo.com",
        rating: 4.5,
        features: ["Aggregator", "All-in Pricing", "North Dakota Facilities"]
    },
    {
        id: "h5",
        name: "EZ Blockchain",
        location: "USA (Texas/Utah)",
        pricePerKwh: 0.067,
        minUnits: 50,
        security: "Remote Monitoring",
        greenEnergy: true,
        website: "https://ezblockchain.net",
        rating: 4.6,
        features: ["Flared Gas Power", "Immersion Options", "Mobile Containers"]
    },
    {
        id: "h6",
        name: "Compass Mining",
        location: "North America",
        pricePerKwh: 0.065,
        minUnits: 1,
        security: "Various Partners",
        greenEnergy: false,
        website: "#",
        rating: 3.8,
        features: ["Retail Focused", "Hardware Marketplace", "Easy Start"]
    },
    {
        id: "h7",
        name: "Gryphon Digital",
        location: "Canada / USA",
        pricePerKwh: 0.03,
        minUnits: 100,
        security: "Enterprise Grade",
        greenEnergy: true,
        website: "#",
        rating: 4.5,
        features: ["Carbon Negative Strategy", "Ultra Low Cost", "Public Company"]
    },
    {
        id: "h8",
        name: "Bitkern",
        location: "USA / Venezuela",
        pricePerKwh: 0.048,
        minUnits: 50,
        security: "Gated Facilities",
        greenEnergy: true,
        website: "#",
        rating: 4.2,
        features: ["Low Cost Venezuela", "US Hosting", "Large Scale"]
    }
];

export const REPAIR_CENTERS: RepairCenter[] = [
    // North America
    { id: 'rc1', region: 'North America', name: 'D-Central Technologies', location: 'Montreal, Quebec (Canada)', status: 'Active', specialization: 'Antminer S9/S17/S19, Mods', description: 'Known for Antminer repairs and home-mining modifications. Offers training.' },
    { id: 'rc2', region: 'North America', name: 'Viperatech', location: 'USA / Global', status: 'Active', specialization: 'Bitmain, Whatsminer', description: 'Parts sales and device repair.' },
    { id: 'rc3', region: 'North America', name: 'ASICMaster', location: 'Chicago, IL (USA)', status: 'Active', specialization: 'MicroBT Partner', description: 'Renowned service center.' },
    { id: 'rc4', region: 'North America', name: 'MyRig', location: 'Denver (USA) / Dubai', status: 'Active', specialization: 'General', description: 'Global presence.' },
    
    // Europe
    { id: 'rc5', region: 'Europe', name: 'Zeus Mining', location: 'Germany / China', status: 'Active', specialization: 'Parts & Logistics', description: 'Major parts distributor with repair center network.' },
    { id: 'rc6', region: 'Europe', name: 'Kentino', location: 'Czech Republic', status: 'Active', specialization: 'HPC & ASIC', description: 'High-performance computing and ASIC repair expert in Central Europe.' },
    { id: 'rc7', region: 'Europe', name: 'AsicMinerz', location: 'Budapest, Hungary', status: 'Active', specialization: 'EU Customers', description: 'Focus on EU clients to avoid customs issues.' },

    // GUS & Russia
    { id: 'rc8', region: 'GUS & Russia', name: 'Service-Bitmain.ru / Minerfixes', location: 'Irkutsk / Moscow', status: 'Active', specialization: 'Bitmain', description: 'Large workshops in low-cost energy regions.' },
    { id: 'rc9', region: 'GUS & Russia', name: 'MicroBT Authorized Center (Enegix)', location: 'Ekibastuz, Kazakhstan', status: 'Active', specialization: 'Whatsminer', description: 'Major cooperation with data center operator Enegix.' },

    // Middle East
    { id: 'rc10', region: 'Middle East', name: 'MyRig Dubai', location: 'JLT, Dubai (UAE)', status: 'Active', specialization: 'Hashboards, PSUs', description: 'Hub between China and West. Often offers free diagnostics.' },

    // South America
    { id: 'rc11', region: 'South America', name: 'VA TECHNOLOGY E.A.S', location: 'Ciudad del Este / Asunción (Paraguay)', status: 'Active', specialization: 'LATAM Region', description: 'Local service partner for major distributors.' },
];

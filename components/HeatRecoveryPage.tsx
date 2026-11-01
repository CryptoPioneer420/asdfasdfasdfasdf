
import React from 'react';
import { useMiners } from '../context/MinerContext';
import HeatRecoveryHero from './heat-recovery/HeatRecoveryHero';
import MinerGrid from './heat-recovery/MinerGrid';
import EquipmentGrid from './heat-recovery/EquipmentGrid';
import FAQAccordion from './heat-recovery/FAQAccordion';
import CTASection from './heat-recovery/CTASection';
import { AppSettings } from '../types';
import { EQUIPMENT } from '../constants';

interface HeatRecoveryPageProps {
    onNavigate: (page: string, minerId?: string) => void;
    settings: AppSettings;
}

const HeatRecoveryPage: React.FC<HeatRecoveryPageProps> = ({ onNavigate, settings }) => {
    const { miners, isLoading } = useMiners();

    const heatRecoveryMiners = miners.filter(m => 
        m.cooling === 'Hydro' || m.cooling === 'Immersion'
    );

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in space-y-16">
            <HeatRecoveryHero />
            
            {/* Miners Section */}
            <div className="container mx-auto">
                <div className="flex justify-between items-end mb-8 px-4">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Specialized Hardware</h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Top efficiency miners for hydro and immersion setups</p>
                    </div>
                    <div className="hidden md:block text-sm text-gray-500">
                        Showing {heatRecoveryMiners.length} devices
                    </div>
                </div>
                
                <div className="px-4">
                    <MinerGrid 
                        miners={heatRecoveryMiners} 
                        onMinerClick={(id) => onNavigate('detail', id)} 
                        settings={settings}
                    />
                </div>
            </div>

            {/* Equipment Section (New) */}
            <div className="container mx-auto bg-gray-50 dark:bg-gray-800/30 py-12 rounded-3xl">
                <div className="px-4 mb-8">
                     <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Infrastructure & Equipment</h2>
                     <p className="text-gray-500 dark:text-gray-400 mt-2">Essential components for building your heat reuse system</p>
                </div>
                <div className="px-4">
                    <EquipmentGrid equipment={EQUIPMENT} settings={settings} />
                </div>
            </div>

            <div className="px-4 max-w-7xl mx-auto">
                <CTASection 
                    variant="split"
                    title="Ready for the next step?"
                    subtitle="Calculate your potential savings with Digital Thermal Computing (DTC)."
                    bottomButton={{
                        text: "Open Calculator",
                        href: "#", // In SPA handle via prop if needed, but keeping generic
                        variant: "secondary",
                        icon: "calculator"
                    }}
                />
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 py-16">
                 <div className="container mx-auto px-4">
                    <FAQAccordion title="Heat Recovery FAQ" showCategoryFilter={true} />
                 </div>
            </div>
        </div>
    );
};

export default HeatRecoveryPage;

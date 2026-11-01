/**
 * CTASection.tsx
 * 
 * Split-screen oder Stacked CTA Section
 * Features: Responsive layout, Analytics tracking, Multiple button styles
 * 
 * @domain cryptominingdeals.com
 * @pages /heat-recovery, /heat-recovery/hydromining, /heat-recovery/immersion-cooling
 */

import React from 'react';

// Types
interface CTAButton {
  text: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: 'arrow' | 'calculator' | 'chat' | 'miners';
  trackingId?: string;
}

interface CTACard {
  title: string;
  description: string;
  icon?: string;
  iconColor?: string;
  button: CTAButton;
}

interface CTASectionProps {
  variant?: 'split' | 'stacked' | 'single';
  cards?: CTACard[];
  bottomButton?: CTAButton;
  title?: string;
  subtitle?: string;
  backgroundStyle?: 'gradient' | 'dark' | 'light';
}

// Icon components
const Icons = {
  arrow: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  ),
  calculator: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  chat: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  miners: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  ),
  droplet: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
    </svg>
  ),
  waves: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15c2.483 0 4.345-1.571 5.5-3 1.155 1.429 3.017 3 5.5 3s4.345-1.571 5.5-3M3 11c2.483 0 4.345-1.571 5.5-3 1.155 1.429 3.017 3 5.5 3s4.345-1.571 5.5-3" />
    </svg>
  )
};

// Default cards for heat recovery page
const defaultCards: CTACard[] = [
  {
    title: "Hydromining",
    description: "Die bewährte Lösung für professionelle Mining-Farms mit 10-500 Minern. Einfache Wartung, gute Skalierbarkeit.",
    icon: "droplet",
    iconColor: "#3b82f6",
    button: {
      text: "Zu Hydromining",
      href: "/heat-recovery/hydromining",
      variant: "primary",
      icon: "arrow"
    }
  },
  {
    title: "Immersion Cooling",
    description: "Maximale Effizienz für große Operationen. 95%+ Kühleffizienz und höchste Wärmerückgewinnung.",
    icon: "waves",
    iconColor: "#8b5cf6",
    button: {
      text: "Zu Immersion",
      href: "/heat-recovery/immersion-cooling",
      variant: "primary",
      icon: "arrow"
    }
  }
];

const defaultBottomButton: CTAButton = {
  text: "Jetzt Miner vergleichen",
  href: "/miners",
  variant: "secondary",
  icon: "miners"
};

// Button component
const CTAButtonComponent: React.FC<{ button: CTAButton; className?: string }> = ({ 
  button, 
  className = "" 
}) => {
  const baseClasses = "inline-flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-xl transition-all duration-300";
  
  const variantClasses = {
    primary: "bg-white text-slate-900 hover:bg-slate-100 shadow-lg hover:shadow-xl",
    secondary: "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40",
    outline: "bg-transparent border-2 border-white/30 text-white hover:bg-white/10"
  };

  const handleClick = () => {
    // Analytics tracking placeholder
    if (button.trackingId && typeof window !== 'undefined') {
      // Example: gtag('event', 'click', { 'event_category': 'CTA', 'event_label': button.trackingId });
      console.log(`CTA clicked: ${button.trackingId}`);
    }
  };

  return (
    <a
      href={button.href}
      onClick={handleClick}
      className={`${baseClasses} ${variantClasses[button.variant || 'primary']} ${className}`}
    >
      {button.text}
      {button.icon && Icons[button.icon as keyof typeof Icons]}
    </a>
  );
};

export const CTASection: React.FC<CTASectionProps> = ({
  variant = 'split',
  cards = defaultCards,
  bottomButton = defaultBottomButton,
  title,
  subtitle,
  backgroundStyle = 'gradient'
}) => {
  const backgroundClasses = {
    gradient: "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
    dark: "bg-slate-900",
    light: "bg-slate-100"
  };

  const textColorClass = backgroundStyle === 'light' ? 'text-slate-900' : 'text-white';
  const subtitleColorClass = backgroundStyle === 'light' ? 'text-slate-600' : 'text-slate-300';

  return (
    <section className={`py-16 lg:py-24 ${backgroundClasses[backgroundStyle]} relative overflow-hidden`}>
      {/* Background decoration */}
      {backgroundStyle !== 'light' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Optional Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className={`text-3xl sm:text-4xl font-bold ${textColorClass} mb-4`}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`text-lg ${subtitleColorClass} max-w-2xl mx-auto`}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Cards - Split or Stacked layout */}
        {variant !== 'single' && cards.length > 0 && (
          <div className={`
            grid gap-6 lg:gap-8 mb-8
            ${variant === 'split' ? 'md:grid-cols-2' : 'grid-cols-1 max-w-2xl mx-auto'}
          `}>
            {cards.map((card, index) => (
              <div
                key={index}
                className={`
                  p-6 lg:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1
                  ${backgroundStyle === 'light' 
                    ? 'bg-white shadow-lg hover:shadow-xl border border-slate-200' 
                    : 'bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10'
                  }
                `}
              >
                {/* Icon */}
                {card.icon && (
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${card.iconColor}20` }}
                  >
                    <div style={{ color: card.iconColor }}>
                      {card.icon === 'droplet' && Icons.droplet}
                      {card.icon === 'waves' && Icons.waves}
                    </div>
                  </div>
                )}

                {/* Content */}
                <h3 className={`text-2xl font-bold ${textColorClass} mb-3`}>
                  {card.title}
                </h3>
                <p className={`${subtitleColorClass} mb-6 leading-relaxed`}>
                  {card.description}
                </p>

                {/* Button */}
                <CTAButtonComponent 
                  button={{
                    ...card.button,
                    variant: backgroundStyle === 'light' ? 'secondary' : card.button.variant
                  }} 
                />
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        {bottomButton && (
          <div className="text-center">
            <CTAButtonComponent 
              button={bottomButton}
              className="text-lg px-8 py-4"
            />
          </div>
        )}
      </div>
    </section>
  );
};

// Pre-configured variants for common use cases
export const HeatRecoveryCTA: React.FC = () => (
  <CTASection
    variant="split"
    title="Bereit für den nächsten Schritt?"
    subtitle="Wählen Sie die passende Kühlmethode für Ihre Mining-Operation"
    cards={defaultCards}
    bottomButton={defaultBottomButton}
  />
);

export const HydrominingCTA: React.FC = () => (
  <CTASection
    variant="stacked"
    backgroundStyle="dark"
    cards={[
      {
        title: "Jetzt starten",
        description: "Finden Sie die passenden Miner und planen Sie Ihr Hydromining-Setup.",
        button: {
          text: "Miner für Hydromining anzeigen",
          href: "/miners?cooling=hydromining",
          variant: "primary",
          icon: "miners"
        }
      }
    ]}
    bottomButton={{
      text: "ROI berechnen",
      href: "/heat-recovery/calculator",
      variant: "outline",
      icon: "calculator"
    }}
  />
);

export const ImmersionCTA: React.FC = () => (
  <CTASection
    variant="stacked"
    backgroundStyle="gradient"
    title="Bereit für maximale Effizienz?"
    cards={[
      {
        title: "Individuelle Beratung",
        description: "Lassen Sie sich von unseren Experten ein maßgeschneidertes Immersion-Setup planen.",
        icon: "waves",
        iconColor: "#8b5cf6",
        button: {
          text: "Beratung anfragen",
          href: "/contact",
          variant: "primary",
          icon: "chat"
        }
      }
    ]}
    bottomButton={{
      text: "Immersion-kompatible Miner anzeigen",
      href: "/miners?cooling=immersion",
      variant: "secondary",
      icon: "miners"
    }}
  />
);

export default CTASection;
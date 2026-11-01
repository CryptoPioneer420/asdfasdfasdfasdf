/**
 * FAQAccordion.tsx
 * 
 * Expandable FAQ Section mit Smooth Animations
 * Features: Dynamic data from JSON, Category filtering, SEO-friendly structure
 * 
 * @domain cryptominingdeals.com
 * @pages /heat-recovery, /heat-recovery/hydromining, /heat-recovery/immersion-cooling
 */

import React, { useState } from 'react';

// Types
interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

interface FAQAccordionProps {
  faqs?: FAQItem[];
  title?: string;
  subtitle?: string;
  showCategoryFilter?: boolean;
  defaultOpenIndex?: number;
  maxVisible?: number;
}

// Default FAQ data
const defaultFAQs: FAQItem[] = [
  {
    id: "hr-001",
    question: "Wie sicher ist Wärmenutzung von ASIC-Minern?",
    answer: "Die Wärmenutzung von ASIC-Minern ist bei korrekter Installation absolut sicher. Die Systeme arbeiten mit geschlossenen Kreisläufen, die physisch von der Mining-Hardware getrennt sind. Bei Hydromining zirkuliert destilliertes Wasser durch spezielle Kühlkörper - es besteht kein direkter Kontakt zwischen Wasser und Elektronik. Bei Immersion Cooling werden dielektrische (nicht-leitende) Flüssigkeiten verwendet, die selbst bei direktem Kontakt mit der Hardware keine Kurzschlüsse verursachen können.",
    category: "safety"
  },
  {
    id: "hr-002",
    question: "Welche ASIC-Miner eignen sich am besten für Wärmerückgewinnung?",
    answer: "Die besten Miner für Wärmerückgewinnung kombinieren hohe Hashrate mit effizienter Wärmeabgabe. Aktuelle Top-Modelle sind der Antminer S21 und S21 Pro von Bitmain sowie der Whatsminer M60 und M60S von MicroBT. Diese Geräte erzeugen 3.000-5.000 Watt thermische Energie pro Einheit, was sie ideal für Heat-Recovery-Projekte macht.",
    category: "equipment"
  },
  {
    id: "hr-003",
    question: "Wie viel kann ich mit Wärmerückgewinnung verdienen?",
    answer: "Die Einnahmen aus Wärmerückgewinnung hängen von mehreren Faktoren ab: Miner-Anzahl, gewählte Kühlmethode, Art der Wärmenutzung und lokale Energiepreise. Als Faustregel können 30-50% der eingesetzten elektrischen Energie als nutzbare Wärme zurückgewonnen werden. Bei einem Setup mit 10 Antminer S21 können Sie mit €1.700-2.600 monatlichen Wärme-Einnahmen rechnen.",
    category: "financial"
  },
  {
    id: "hr-004",
    question: "Gibt es Finanzierungsmöglichkeiten für Heat-Recovery-Systeme?",
    answer: "Ja, es gibt verschiedene Finanzierungswege: Leasing-Modelle über 24-60 Monate, Förderprogramme für energieeffiziente Technologien (KfW, BAFA in Deutschland), sowie Kooperationsmodelle mit Energieversorgern. Auch Contracting-Modelle sind möglich, bei denen ein Drittanbieter die Infrastruktur installiert und betreibt.",
    category: "financial"
  },
  {
    id: "hr-005",
    question: "Wie lange dauert die Installation eines Heat-Recovery-Systems?",
    answer: "Die Installationsdauer variiert je nach Systemgröße. Für ein Hydromining-Setup mit 10-20 Minern: 3-5 Tage reine Installation plus 1-2 Wochen Planung. Bei Immersion-Cooling: 5-10 Tage Installation. Die Gesamtprojektdauer von Planung bis Inbetriebnahme beträgt typischerweise 6-12 Wochen für kleine bis mittlere Setups.",
    category: "installation"
  },
  {
    id: "hr-006",
    question: "Kann ich die Wärme auch im Sommer nutzen?",
    answer: "Ja, es gibt verschiedene Sommernutzungs-Optionen: Warmwasserbereitung (ganzjährig), industrielle Trocknungsprozesse, Gewächshäuser und Aquakultur. Für größere Operationen bieten sich Absorptionskältemaschinen an, die Wärme nutzen um Kälte zu erzeugen. Alternativ kann überschüssige Wärme über Dry-Cooler abgeführt werden.",
    category: "installation"
  }
];

// Category labels
const categoryLabels: Record<string, string> = {
  safety: "Sicherheit",
  equipment: "Ausrüstung",
  financial: "Finanzen",
  installation: "Installation",
  maintenance: "Wartung",
  environmental: "Umwelt",
  cost: "Kosten"
};

// Single FAQ Item Component
const FAQItemComponent: React.FC<{
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ faq, isOpen, onToggle }) => {
  return (
    <div 
      className={`
        border border-slate-200 rounded-xl overflow-hidden transition-all duration-300
        ${isOpen ? 'bg-white shadow-lg' : 'bg-slate-50 hover:bg-white hover:shadow'}
      `}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-inset"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-slate-900 pr-8">
          {faq.question}
        </span>
        <span 
          className={`
            flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
            transition-all duration-300
            ${isOpen ? 'bg-orange-500 text-white rotate-180' : 'bg-slate-200 text-slate-600'}
          `}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      
      <div 
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="px-5 pb-5">
          <div className="pt-2 border-t border-slate-100">
            <p className="text-slate-600 leading-relaxed mt-4">
              {faq.answer}
            </p>
            {faq.category && (
              <div className="mt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                  {categoryLabels[faq.category] || faq.category}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  faqs = defaultFAQs,
  title = "Häufig gestellte Fragen",
  subtitle = "Antworten auf die wichtigsten Fragen zu Heat Recovery",
  showCategoryFilter = false,
  defaultOpenIndex = 0,
  maxVisible
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAll, setShowAll] = useState(false);

  // Get unique categories
  const categories = ['all', ...new Set(faqs.map(f => f.category).filter(Boolean) as string[])];

  // Filter FAQs by category
  const filteredFAQs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(f => f.category === selectedCategory);

  // Limit visible FAQs if maxVisible is set
  const visibleFAQs = maxVisible && !showAll 
    ? filteredFAQs.slice(0, maxVisible) 
    : filteredFAQs;

  const hasMore = maxVisible && filteredFAQs.length > maxVisible && !showAll;

  return (
    <section className="py-16 lg:py-24 bg-white" id="faq">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Category Filter */}
        {showCategoryFilter && categories.length > 2 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setOpenIndex(null);
                }}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${selectedCategory === category
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }
                `}
              >
                {category === 'all' ? 'Alle' : categoryLabels[category] || category}
              </button>
            ))}
          </div>
        )}

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {visibleFAQs.map((faq, index) => (
              <FAQItemComponent
                key={faq.id}
                faq={faq}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>

          {/* Show More Button */}
          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium transition-colors"
              >
                <span>Alle {filteredFAQs.length} Fragen anzeigen</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}

          {/* No Results */}
          {filteredFAQs.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              Keine Fragen in dieser Kategorie gefunden.
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12 p-8 bg-slate-50 rounded-2xl max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Ihre Frage nicht dabei?
          </h3>
          <p className="text-slate-600 mb-6">
            Kontaktieren Sie uns - wir helfen Ihnen gerne weiter.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Kontakt aufnehmen
          </a>
        </div>
      </div>

      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
    </section>
  );
};

export default FAQAccordion;
import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  cityName?: string;
}

export default function FAQAccordion({ cityName }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: `Jak funguje hypoteční kalkulačka${cityName ? ` pro ${cityName}` : ''}?`,
      answer: `Naše hypoteční kalkulačka vám pomůže rychle spočítat měsíční splátku hypotéky${cityName ? ` v ${cityName}` : ''}. Stačí zadat cenu nemovitosti, výši vlastního kapitálu (zálohy), úrokovou sazbu a dobu splácení. Kalkulačka automaticky vypočítá výši měsíční splátky, celkovou částku k zaplacení a výši úroků.`,
    },
    {
      question: 'Jaká je průměrná úroková sazba hypotéky v ČR?',
      answer: 'Úrokové sazby hypotéky se v České republice pohybují v průměru mezi 5% a 6% ročně (2024-2025). Konkrétní sazba závisí na výši úvěru, délce fixace, vaší bonitě a konkrétní bance. Doporučujeme porovnat nabídky od více bank.',
    },
    {
      question: 'Kolik procent zálohy je potřeba na hypotéku?',
      answer: 'V České republice banky standardně vyžadují vlastní kapitál (zálohu) ve výši alespoň 10-20% z hodnoty nemovitosti. Čím vyšší záloha, tím lepší podmínky hypotéky obvykle získáte - nižší úrokovou sazbu a menší měsíční splátku.',
    },
    {
      question: 'Jak dlouho trvá schválení hypotéky?',
      answer: 'Proces schvalování hypotéky v České republice trvá obvykle 2-4 týdny. Závisí to na kompletnosti podkladů, vytíženosti banky a složitosti vašeho případu. Předběžné schválení můžete získat často do několika dnů.',
    },
    {
      question: 'Mohu si hypotéku vzít na jakoukoliv nemovitost?',
      answer: 'Hypotéku můžete získat na nákup bytu, rodinného domu, pozemku nebo na rekonstrukci. Banka vždy vyhodnotí stav a hodnotu nemovitosti. Nemovitost slouží jako zajištění úvěru, proto musí splňovat určité podmínky stanovené bankou.',
    },
    {
      question: 'Co je fixace úrokové sazby?',
      answer: 'Fixace je doba, po kterou zůstává úroková sazba hypotéky nezměněná. V ČR jsou nejčastější fixace na 3, 5 nebo 10 let. Po uplynutí fixace můžete změnit podmínky nebo refinancovat hypotéku u jiné banky.',
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate JSON-LD structured data for SEO
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      {/* FAQ Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex p-3 bg-primary-light rounded-full mb-4">
              <HelpCircle className="text-primary" size={28} />
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-800 mb-3">
              Často kladené otázky
            </h2>
            <p className="text-lg text-neutral-600">
              Vše, co potřebujete vědět o hypotékách v České republice
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-neutral-300 rounded-xl overflow-hidden transition-all duration-200 hover:border-primary/50 bg-white shadow-sm"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left bg-white hover:bg-neutral-50 transition-colors"
                  aria-expanded={openIndex === index ? 'true' : 'false'}
                >
                  <span className="text-base font-medium text-neutral-800 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`text-primary flex-shrink-0 transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    size={20}
                  />
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200">
                    <p className="text-neutral-600 leading-relaxed text-[15px]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

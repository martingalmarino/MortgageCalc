import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import RatesTable from '@/components/RatesTable';
import { TrendingDown, ExternalLink, AlertCircle } from 'lucide-react';
import bankRatesData from '@/lib/bankRatesData.json';

interface BankRate {
  bank: string;
  fixed_periods: Array<{ term: string; rate: number }>;
  conditions: string;
  last_updated: string;
  source: string;
}

interface ComparePageProps {
  banks: BankRate[];
  lastUpdated: string;
}

export default function CompareMortgageRates({ banks, lastUpdated }: ComparePageProps) {
  const title = 'Srovnání hypotečních sazeb 2025 - Porovnejte nabídky bank';
  const description = 'Aktuální přehled hypotečních sazeb od největších českých bank. Porovnejte úrokové sazby pro různé doby fixace a najděte nejvýhodnější hypotéku pro říjen 2025.';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="cs_CZ" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ratecomparecz.com/compare-mortgage-rates" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: title,
              description: description,
              url: 'https://www.ratecomparecz.com/compare-mortgage-rates',
              mainEntity: {
                '@type': 'Table',
                about: 'Srovnání hypotečních sazeb českých bank',
              },
            }),
          }}
        />
      </Head>

      <Header />

      <main className="min-h-screen bg-neutralBg">
        {/* Hero Section */}
        <section className="py-12 md:py-16" style={{ background: 'linear-gradient(135deg, #047857 0%, #059669 100%)' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex p-3 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                <TrendingDown className="text-white" size={32} />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">
                Srovnání hypotečních sazeb 2025
              </h1>
              
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-6">
                Aktuální přehled úrokových sazeb od největších českých bank. 
                Porovnejte nabídky a najděte nejvýhodnější hypotéku.
              </p>

              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-white">
                <AlertCircle size={16} />
                Aktualizováno: {new Date(lastUpdated).toLocaleDateString('cs-CZ', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="py-8 bg-white border-b border-cardBorder">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-textSecondary max-w-4xl mx-auto">
              Níže najdete aktuální úrokové sazby hypotéčních úvěrů od šesti největších bank v České republice. 
              Sazby jsou uvedeny pro různé doby fixace. <strong className="text-primary">Nejnižší sazba v každé kategorii je zvýrazněna zeleně.</strong>
            </p>
          </div>
        </section>

        {/* Rates Table */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <RatesTable banks={banks} />
          </div>
        </section>

        {/* Notes Section */}
        <section className="py-8 bg-white border-t border-cardBorder">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-textMain mb-3 flex items-center gap-2">
                <AlertCircle className="text-accent" size={20} />
                Důležité informace
              </h3>
              <ul className="space-y-2 text-sm text-textSecondary">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Sazby jsou aktualizovány k nejnovějším informacím od každé banky. Podmínky se mohou lišit.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Uvedené sazby jsou orientační a platí pro standardní podmínky (LTV, bonita, účel úvěru).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Konečná sazba závisí na individuálním posouzení klienta a může se lišit.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Doporučujeme kontaktovat konkrétní banku pro aktuální nabídku.</span>
                </li>
              </ul>
              
              <div className="mt-6 pt-6 border-t border-accent/20">
                <p className="text-sm text-textSecondary mb-3">
                  Pro srovnání s oficiálními referenčními sazbami navštivte:
                </p>
                <a 
                  href="https://www.cnb.cz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primaryHover font-medium transition-colors"
                >
                  Česká národní banka (ČNB)
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-gradient-to-br from-accent/10 to-primary/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-semibold text-textMain mb-4">
              Chcete spočítat měsíční splátku?
            </h2>
            <p className="text-lg text-textSecondary mb-6">
              Použijte naši hypoteční kalkulačku a zjistěte, kolik vás bude hypotéka skutečně stát.
            </p>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primaryHover text-white font-medium h-12 px-8 rounded-lg transition-all duration-200 hover:scale-[1.02] shadow-sm"
            >
              Přejít na kalkulačku
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-8 mt-16" style={{ background: '#059669' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-2">Hypoteční kalkulačka ČR</h3>
              <p className="text-sm text-white/80 mb-4">
                Profesionální nástroj pro výpočet hypotéky zdarma pro celou Českou republiku
              </p>
              <div className="flex flex-wrap justify-center gap-3 text-sm text-white/70">
                <span>© 2025 Hypoteční kalkulačka</span>
                <span>•</span>
                <span>Vytvořeno pro český trh</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // Get the most recent update date from all banks
  const dates = bankRatesData.map(bank => new Date(bank.last_updated));
  const lastUpdated = new Date(Math.max(...dates.map(d => d.getTime()))).toISOString().split('T')[0];

  return {
    props: {
      banks: bankRatesData,
      lastUpdated,
    },
  };
};


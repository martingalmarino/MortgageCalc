import { GetStaticProps } from 'next';
import Head from 'next/head';
import { citiesCZ } from '@/lib/citiesCZ';
import { getReferenceInterestRate } from '@/lib/mortgageCalc';
import Header from '@/components/Header';
import CalculatorHero from '@/components/CalculatorHero';
import CTACompareBanks from '@/components/CTACompareBanks';
import CityPills from '@/components/CityPills';
import FAQAccordion from '@/components/FAQAccordion';

interface HomeProps {
  referenceRate: number;
}

export default function Home({ referenceRate }: HomeProps) {
  const title = 'Hypoteční kalkulačka 2025 – Spočítejte měsíční splátku hypotéky';
  const description = `Profesionální hypoteční kalkulačka pro Českou republiku. Spočítejte si měsíční splátku, celkové náklady a porovnejte nabídky bank. Aktuální sazby ${referenceRate}%. Zdarma a bez registrace.`;

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
        <link rel="canonical" href="https://www.ratecomparecz.com/" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Hypoteční kalkulačka ČR',
              description: description,
              url: 'https://www.ratecomparecz.com/',
              applicationCategory: 'FinanceApplication',
              operatingSystem: 'Any',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'CZK',
              },
            }),
          }}
        />
      </Head>

      <Header />

      <main className="min-h-screen">
        {/* Calculator Hero Section */}
        <CalculatorHero defaultRate={referenceRate} />

        {/* CTA Compare Banks */}
        <div className="bg-neutralBg py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <CTACompareBanks />
          </div>
        </div>

        {/* All Cities for SEO */}
        <div className="bg-cardBg py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <CityPills cities={citiesCZ} />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-neutralBg">
          <FAQAccordion />
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 py-8 mt-16" style={{ background: 'linear-gradient(90deg, #047857 0%, #059669 100%)' }}>
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
  const referenceRate = getReferenceInterestRate();

  return {
    props: {
      referenceRate,
    },
  };
};

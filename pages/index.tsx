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
        <link rel="canonical" href="https://hypotecni-kalkulacka.cz/" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Hypoteční kalkulačka ČR',
              description: description,
              url: 'https://hypotecni-kalkulacka.cz/',
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <CTACompareBanks />
        </div>

        {/* All Cities for SEO */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <CityPills cities={citiesCZ} />
        </div>

        {/* FAQ Section */}
        <FAQAccordion />

        {/* Footer */}
        <footer className="bg-text-primary text-white py-12 mt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Hypoteční kalkulačka ČR</h3>
              <p className="text-gray-300 mb-6">
                Profesionální nástroj pro výpočet hypotéky zdarma pro celou Českou republiku
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
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

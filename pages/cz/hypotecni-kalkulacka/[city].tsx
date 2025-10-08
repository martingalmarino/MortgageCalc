import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { getAllCitySlugs, getCityBySlug, getOtherCities, City } from '@/lib/citiesCZ';
import { getReferenceInterestRate } from '@/lib/mortgageCalc';
import CalculatorHero from '@/components/CalculatorHero';
import CTACompareBanks from '@/components/CTACompareBanks';
import CityPills from '@/components/CityPills';
import FAQAccordion from '@/components/FAQAccordion';

interface CityPageProps {
  city: City;
  otherCities: City[];
  referenceRate: number;
}

export default function CityPage({ city, otherCities, referenceRate }: CityPageProps) {
  const title = `Hypoteční kalkulačka ${city.name} 2025 – Spočítejte měsíční splátku`;
  const description = `Použijte naší hypoteční kalkulačku pro ${city.name}. Spočítejte si měsíční splátku hypotéky, celkové náklady a porovnejte nabídky bank. Aktuální sazby ${referenceRate}% ✓ Zdarma ✓ Bez registrace`;

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
        <link rel="canonical" href={`https://hypotecni-kalkulacka.cz/cz/hypotecni-kalkulacka/${city.slug}`} />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: `Hypoteční kalkulačka ${city.name}`,
              description: description,
              url: `https://hypotecni-kalkulacka.cz/cz/hypotecni-kalkulacka/${city.slug}`,
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

      <main className="min-h-screen">
        {/* Calculator Hero Section */}
        <CalculatorHero cityName={city.name} defaultRate={referenceRate} />

        {/* CTA Compare Banks */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <CTACompareBanks />
        </div>

        {/* City Pills for Interlinking */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <CityPills cities={otherCities} currentCity={city.name} />
        </div>

        {/* FAQ Section */}
        <FAQAccordion cityName={city.name} />

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
                <span>Vytvořeno s ❤️ pro český trh</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const citySlugs = getAllCitySlugs();
  
  const paths = citySlugs.map((slug) => ({
    params: { city: slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const citySlug = params?.city as string;
  const city = getCityBySlug(citySlug);

  if (!city) {
    return {
      notFound: true,
    };
  }

  const otherCities = getOtherCities(citySlug, 8);
  const referenceRate = getReferenceInterestRate();

  return {
    props: {
      city,
      otherCities,
      referenceRate,
    },
  };
};


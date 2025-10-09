import { GetServerSideProps } from 'next';
import { getAllCitySlugs } from '@/lib/citiesCZ';

function generateSiteMap(cities: string[]) {
  const baseUrl = 'https://www.ratecomparecz.com';
  
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Homepage -->
     <url>
       <loc>${baseUrl}</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>1.0</priority>
     </url>
     
     <!-- Compare Mortgage Rates -->
     <url>
       <loc>${baseUrl}/compare-mortgage-rates</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.9</priority>
     </url>
     
     <!-- City Pages -->
     ${cities
       .map((city) => {
         return `
     <url>
       <loc>${baseUrl}/cz/hypotecni-kalkulacka/${city}</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.8</priority>
     </url>`;
       })
       .join('')}
   </urlset>
 `;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const cities = getAllCitySlugs();
  const sitemap = generateSiteMap(cities);

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

// Default export to prevent Next.js errors
export default function SiteMap() {
  return null;
}


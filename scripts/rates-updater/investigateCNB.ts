/**
 * Script to investigate ČNB website structure for mortgage rates
 */

import axios from 'axios';
import * as cheerio from 'cheerio';

async function investigateCNB() {
  console.log('🔍 Investigating ČNB website structure...\n');

  const urls = [
    'https://www.cnb.cz/cs/financni-trhy/',
    'https://www.cnb.cz/cs/financni-trhy/penezni-trh-a-urokove-sazby/',
    'https://www.cnb.cz/cs/statistika/',
  ];

  for (const url of urls) {
    console.log(`\n📄 Checking: ${url}`);
    try {
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          'Accept': 'text/html',
        },
      });

      const $ = cheerio.load(response.data);

      // Look for mortgage-related keywords
      const keywords = ['hypotéka', 'hypoteční', 'úrok', 'úvěr', 'mortgage'];
      
      keywords.forEach(keyword => {
        $('a, h1, h2, h3, h4').each((_, element) => {
          const text = $(element).text();
          if (text.toLowerCase().includes(keyword.toLowerCase())) {
            const href = $(element).attr('href');
            console.log(`  ✓ Found "${keyword}": ${text.substring(0, 60)}...`);
            if (href) {
              console.log(`    Link: ${href}`);
            }
          }
        });
      });

    } catch (error) {
      console.error(`  ❌ Error: ${error instanceof Error ? error.message : 'Unknown'}`);
    }
  }

  console.log('\n\n📊 Trying ARAD system...');
  
  // Try ARAD (ČNB's statistical database)
  const aradUrls = [
    'https://www.cnb.cz/arad/',
    'https://www.cnb.cz/cnb/STAT.ARADY_PKG.STROM_DRILL?p_strid=AEBA&p_lang=CS',
  ];

  for (const url of aradUrls) {
    console.log(`\n📄 Checking ARAD: ${url}`);
    try {
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0',
        },
      });
      
      console.log(`  ✓ Status: ${response.status}`);
      console.log(`  ✓ Content type: ${response.headers['content-type']}`);
      
    } catch (error) {
      console.error(`  ❌ Error: ${error instanceof Error ? error.message : 'Unknown'}`);
    }
  }
}

investigateCNB().catch(console.error);

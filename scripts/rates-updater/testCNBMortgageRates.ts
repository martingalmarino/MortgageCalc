/**
 * Test fetching mortgage rates from specific ČNB page
 */

import axios from 'axios';
import * as cheerio from 'cheerio';

async function testMortgageRatesPage() {
  console.log('🔍 Testing ČNB mortgage rates page...\n');

  // URL found in investigation
  const url = 'https://www.cnb.cz/cs/dohled-financni-trh/ochrana-spotrebitele/spotrebitelsky-uver/prumer-zapujcnich-urokovych-sazeb-dle-117a-zakona-o-spotrebitelskem-uveru/index.html';

  try {
    console.log(`📄 Fetching: ${url}\n`);
    
    const response = await axios.get(url, {
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml',
      },
    });

    const $ = cheerio.load(response.data);
    
    console.log('✅ Page loaded successfully\n');
    console.log('📊 Looking for mortgage-related data...\n');

    // Look for tables
    $('table').each((tableIndex, table) => {
      console.log(`\n🔹 Table ${tableIndex + 1}:`);
      
      // Get headers
      const headers: string[] = [];
      $(table).find('th').each((_, th) => {
        headers.push($(th).text().trim());
      });
      
      if (headers.length > 0) {
        console.log('  Headers:', headers.join(' | '));
      }

      // Get first few rows
      $(table).find('tr').slice(0, 5).each((rowIndex, row) => {
        const cells: string[] = [];
        $(row).find('td').each((_, td) => {
          cells.push($(td).text().trim());
        });
        if (cells.length > 0) {
          console.log(`  Row ${rowIndex + 1}:`, cells.join(' | '));
        }
      });
    });

    // Look for specific keywords
    console.log('\n\n📝 Looking for keywords...\n');
    const keywords = ['hypotéka', 'hypoteční', 'bydlení', 'nemovitost', 'fixace', 'sazba'];
    
    keywords.forEach(keyword => {
      const found: string[] = [];
      $('*').each((_, element) => {
        const text = $(element).text();
        if (text.toLowerCase().includes(keyword) && text.length < 100) {
          const cleanText = text.trim().replace(/\s+/g, ' ');
          if (cleanText && !found.includes(cleanText)) {
            found.push(cleanText);
          }
        }
      });
      
      if (found.length > 0 && found.length < 10) {
        console.log(`  "${keyword}":`, found.slice(0, 3).join(' | '));
      }
    });

    // Look for CSV/download links
    console.log('\n\n📥 Looking for download links...\n');
    $('a').each((_, link) => {
      const href = $(link).attr('href');
      const text = $(link).text();
      if (href && (href.includes('.csv') || href.includes('.xls') || href.includes('download') || href.includes('export'))) {
        console.log(`  ✓ ${text}: ${href}`);
      }
    });

  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : 'Unknown');
  }
}

testMortgageRatesPage().catch(console.error);

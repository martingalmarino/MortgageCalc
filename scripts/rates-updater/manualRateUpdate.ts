/**
 * Manual Rate Update Tool
 * Simple script to update mortgage rates manually when you find the current rate
 */

import * as fs from 'fs';
import * as path from 'path';

const DATA_FILE_PATH = path.join(__dirname, '../../lib/mortgageRatesCZ.json');

interface RateUpdate {
  rate: number;
  source?: string;
  period?: string;
  note?: string;
}

/**
 * Update rate manually
 * Usage: npm run update:rates:manual -- --rate 5.6 --source "ČNB official" --period "November 2025"
 */
function updateRateManually(update: RateUpdate) {
  console.log('📝 Manual Rate Update');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Validate rate
  if (!update.rate || update.rate < 1 || update.rate > 20) {
    console.error('❌ Invalid rate. Must be between 1 and 20');
    process.exit(1);
  }

  // Read current data
  let currentData: any = {};
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      currentData = JSON.parse(fs.readFileSync(DATA_FILE_PATH, 'utf-8'));
    }
  } catch (error) {
    console.warn('⚠️  Could not read current data');
  }

  const previousRate = currentData.averageRate || 0;

  // Create updated data
  const currentDate = new Date();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  
  const updatedData = {
    lastUpdated: currentDate.toISOString().split('T')[0],
    averageRate: Math.round(update.rate * 10) / 10, // Round to 1 decimal
    rateDecimal: update.rate / 100,
    source: update.source || 'Manual update',
    period: update.period || `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`,
    note: update.note || 'Manually verified rate'
  };

  // Show comparison
  console.log('📊 Rate Update Summary:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log(`  Previous:  ${previousRate}%`);
  console.log(`  New:       ${updatedData.averageRate}%`);
  
  const diff = updatedData.averageRate - previousRate;
  if (diff !== 0) {
    const emoji = diff > 0 ? '📈' : '📉';
    console.log(`  Change:    ${emoji} ${diff > 0 ? '+' : ''}${diff.toFixed(1)}%`);
  }
  
  console.log(`\n  Period:    ${updatedData.period}`);
  console.log(`  Source:    ${updatedData.source}`);
  console.log(`  Updated:   ${updatedData.lastUpdated}\n`);

  // Save
  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(updatedData, null, 2), 'utf-8');
    console.log('✅ Rate updated successfully!');
    console.log(`💾 Saved to: ${DATA_FILE_PATH}\n`);
  } catch (error) {
    console.error('❌ Failed to save:', error);
    process.exit(1);
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('💡 Tip: Commit and push to update the website:');
  console.log('   git add lib/mortgageRatesCZ.json');
  console.log('   git commit -m "Update mortgage rate to ' + updatedData.averageRate + '%"');
  console.log('   git push\n');
}

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const update: RateUpdate = { rate: 0 };

  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace('--', '');
    const value = args[i + 1];

    switch (key) {
      case 'rate':
        update.rate = parseFloat(value);
        break;
      case 'source':
        update.source = value;
        break;
      case 'period':
        update.period = value;
        break;
      case 'note':
        update.note = value;
        break;
    }
  }

  return update;
}

// Main
if (require.main === module) {
  const update = parseArgs();

  if (!update.rate) {
    console.log('📝 Manual Rate Update Tool');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('Usage:');
    console.log('  npm run update:rates:manual -- --rate 5.6\n');
    console.log('Optional arguments:');
    console.log('  --source "ČNB official"');
    console.log('  --period "November 2025"');
    console.log('  --note "Your note here"\n');
    console.log('Example:');
    console.log('  npm run update:rates:manual -- --rate 5.6 --source "ČNB website" --period "Nov 2025"\n');
    process.exit(1);
  }

  updateRateManually(update);
}

export { updateRateManually };

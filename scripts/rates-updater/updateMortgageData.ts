/**
 * Update Mortgage Data Script
 * Fetches latest rates from ČNB and updates local JSON file
 */

import * as fs from 'fs';
import * as path from 'path';
import { fetchCNBRates, validateRate, formatRate } from './fetchCNBRates';

const DATA_FILE_PATH = path.join(__dirname, '../../lib/mortgageRatesCZ.json');

interface UpdateResult {
  success: boolean;
  previousRate?: number;
  newRate?: number;
  changed: boolean;
  error?: string;
}

/**
 * Main update function
 */
async function updateMortgageData(): Promise<UpdateResult> {
  console.log('🚀 Starting mortgage rate update...\n');

  try {
    // Read current data
    const currentData = readCurrentData();
    const previousRate = currentData?.averageRate || 0;

    console.log(`📖 Current rate: ${previousRate}%`);

    // Fetch new data from ČNB
    const newData = await fetchCNBRates();

    // Validate the fetched rate
    if (!validateRate(newData.averageRate)) {
      throw new Error(`Invalid rate received: ${newData.averageRate}%`);
    }

    // Format rate for consistency
    newData.averageRate = formatRate(newData.averageRate);

    // Check if rate changed
    const rateChanged = Math.abs(newData.averageRate - previousRate) > 0.05;

    if (rateChanged) {
      const diff = newData.averageRate - previousRate;
      const direction = diff > 0 ? '📈' : '📉';
      console.log(`\n${direction} Rate changed: ${previousRate}% → ${newData.averageRate}% (${diff > 0 ? '+' : ''}${diff.toFixed(2)}%)`);
    } else {
      console.log(`\n✓ Rate unchanged: ${newData.averageRate}%`);
    }

    // Save updated data
    saveData(newData);

    console.log(`\n✅ Data updated successfully!`);
    console.log(`📅 Last updated: ${newData.lastUpdated}`);
    console.log(`📊 Source: ${newData.source}`);

    return {
      success: true,
      previousRate,
      newRate: newData.averageRate,
      changed: rateChanged,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`\n❌ Update failed: ${errorMessage}`);
    
    return {
      success: false,
      changed: false,
      error: errorMessage,
    };
  }
}

/**
 * Read current mortgage data from JSON file
 */
function readCurrentData(): any {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileContent = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
      return JSON.parse(fileContent);
    }
  } catch (error) {
    console.warn('⚠️  Could not read current data file');
  }
  return null;
}

/**
 * Save mortgage data to JSON file
 */
function saveData(data: any): void {
  try {
    const dirPath = path.dirname(DATA_FILE_PATH);
    
    // Ensure directory exists
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Write with pretty formatting
    fs.writeFileSync(
      DATA_FILE_PATH,
      JSON.stringify(data, null, 2),
      'utf-8'
    );

    console.log(`💾 Saved to: ${DATA_FILE_PATH}`);
  } catch (error) {
    throw new Error(`Failed to save data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Create backup of current data
 */
function createBackup(): void {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const backupPath = DATA_FILE_PATH.replace('.json', `.backup.${Date.now()}.json`);
      fs.copyFileSync(DATA_FILE_PATH, backupPath);
      console.log(`📦 Backup created: ${backupPath}`);
    }
  } catch (error) {
    console.warn('⚠️  Could not create backup');
  }
}

// Run if executed directly
if (require.main === module) {
  updateMortgageData()
    .then((result) => {
      if (result.success) {
        console.log('\n✨ Update completed successfully!');
        process.exit(0);
      } else {
        console.error('\n💥 Update failed!');
        process.exit(1);
      }
    })
    .catch((error) => {
      console.error('\n💥 Fatal error:', error);
      process.exit(1);
    });
}

export { updateMortgageData };


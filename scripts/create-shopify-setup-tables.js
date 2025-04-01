/**
 * Script to create and populate Shopify Setup and Business Details tables in Airtable
 * Usage: node scripts/create-shopify-setup-tables.js
 */

require('dotenv').config();
const Airtable = require('airtable');
const {
  shopifySetupTable,
  businessDetailsTable,
  initialShopifyTasks,
  initialBusinessDetails,
  createShopifySetupTables
} = require('../memory-bank/technical/airtable-shopify-setup');

// Initialize Airtable client
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

async function main() {
  console.log('Starting to create Shopify setup tables in Airtable...');
  
  try {
    // Check if tables already exist
    const tables = await base.tables();
    const shopifyTableExists = tables.some(table => table.name === shopifySetupTable.name);
    const businessTableExists = tables.some(table => table.name === businessDetailsTable.name);
    
    if (shopifyTableExists) {
      console.log(`Table "${shopifySetupTable.name}" already exists.`);
    }
    
    if (businessTableExists) {
      console.log(`Table "${businessDetailsTable.name}" already exists.`);
    }
    
    if (shopifyTableExists && businessTableExists) {
      console.log('Both tables already exist. Exiting...');
      return;
    }
    
    // Create tables and populate with initial data
    await createShopifySetupTables(base);
    
    console.log('✅ Shopify setup tables created successfully!');
    console.log(`Created "${shopifySetupTable.name}" with ${initialShopifyTasks.length} initial tasks`);
    console.log(`Created "${businessDetailsTable.name}" with ${initialBusinessDetails.length} initial items`);
    
  } catch (error) {
    console.error('Error creating tables:', error);
    process.exit(1);
  }
}

// Run the script
main();
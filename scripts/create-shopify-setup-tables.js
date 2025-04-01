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
    // Skip checking if tables exist as the tables() function isn't available
    // in the current version of the Airtable API
    console.log('Creating tables in Airtable...');
    
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
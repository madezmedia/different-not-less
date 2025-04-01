#!/usr/bin/env node

/**
 * Test script for the Different Not Less Apparel n8n workflow
 * 
 * This script sends a test request to the n8n webhook endpoint to create a new product.
 * 
 * Usage:
 *   node test-workflow.js [webhook-url] [api-key]
 * 
 * Example:
 *   node test-workflow.js http://localhost:5678/webhook/product-creation my-api-key
 */

const https = require('https');
const http = require('http');

// Get command line arguments
const webhookUrl = process.argv[2] || 'http://localhost:5678/webhook/product-creation';
const apiKey = process.argv[3] || 'your-webhook-api-key';

// Parse the URL to determine if we should use http or https
const url = new URL(webhookUrl);
const client = url.protocol === 'https:' ? https : http;

// Sample test data
const testData = {
  prompt: "Your Words Matter t-shirt with AAC device layout in blue and gold colors",
  productType: "t-shirt",
  title: "Your Words Matter - AAC Device",
  description: "Celebrate all forms of communication with our signature AAC-inspired design.",
  collections: ["Your Words Matter", "SLP Collection"],
  tags: ["AAC", "speech therapy", "communication", "SLP"],
  variants: [
    { color: "white", sizes: ["S", "M", "L", "XL", "2XL"] },
    { color: "light blue", sizes: ["S", "M", "L", "XL"] }
  ]
};

// Convert data to JSON string
const postData = JSON.stringify(testData);

// Request options
const options = {
  hostname: url.hostname,
  port: url.port || (url.protocol === 'https:' ? 443 : 80),
  path: url.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
    'x-api-key': apiKey
  }
};

console.log(`Sending test request to: ${webhookUrl}`);
console.log(`Using API key: ${apiKey}`);
console.log('Request data:', JSON.stringify(testData, null, 2));

// Send the request
const req = client.request(options, (res) => {
  console.log(`\nResponse status: ${res.statusCode}`);
  console.log(`Response headers: ${JSON.stringify(res.headers, null, 2)}`);
  
  let data = '';
  
  // Collect response data
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  // Process complete response
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(data);
      console.log('\nResponse data:');
      console.log(JSON.stringify(parsedData, null, 2));
      
      if (parsedData.success) {
        console.log('\n✅ Test successful!');
        console.log(`\nProduct created: ${parsedData.product.title}`);
        console.log(`Printify URL: ${parsedData.product.printifyEditUrl}`);
        console.log(`Shopify URL: ${parsedData.product.shopifyUrl}`);
      } else {
        console.log('\n❌ Test failed!');
        console.log(`Error: ${parsedData.message}`);
      }
    } catch (e) {
      console.log('\n❌ Error parsing response:');
      console.log(e.message);
      console.log('\nRaw response:');
      console.log(data);
    }
  });
});

// Handle request errors
req.on('error', (e) => {
  console.error(`\n❌ Request error: ${e.message}`);
});

// Send the data
req.write(postData);
req.end();

console.log('\nRequest sent, waiting for response...');

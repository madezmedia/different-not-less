#!/usr/bin/env node

/**
 * Different Not Less Apparel - n8n Workflow Update Script
 * 
 * This script updates an existing n8n workflow with the contents of a JSON file.
 * It's useful for version controlling your workflows and deploying changes.
 * 
 * Usage:
 *   node update-workflow.js [workflow-id] [json-file] [n8n-url] [api-key]
 * 
 * Example:
 *   node update-workflow.js 1 product-creation-workflow.json http://localhost:5678 n8n_api_12345
 */

const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');

// Get command line arguments
const workflowId = process.argv[2];
const jsonFile = process.argv[3] || 'product-creation-workflow.json';
const n8nUrl = process.argv[4] || 'http://localhost:5678';
const apiKey = process.argv[5];

// Validate arguments
if (!workflowId) {
  console.error('Error: Workflow ID is required');
  console.log('Usage: node update-workflow.js [workflow-id] [json-file] [n8n-url] [api-key]');
  process.exit(1);
}

// Read the workflow JSON file
let workflowData;
try {
  const filePath = path.resolve(jsonFile);
  workflowData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  console.log(`Read workflow data from ${filePath}`);
} catch (error) {
  console.error(`Error reading workflow file: ${error.message}`);
  process.exit(1);
}

// Parse the n8n URL
const url = new URL(n8nUrl);
const client = url.protocol === 'https:' ? https : http;

// Prepare the request options
const options = {
  hostname: url.hostname,
  port: url.port || (url.protocol === 'https:' ? 443 : 80),
  path: `/rest/workflows/${workflowId}`,
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  }
};

// Add API key if provided
if (apiKey) {
  options.headers['X-N8N-API-KEY'] = apiKey;
}

console.log(`Updating workflow with ID ${workflowId} at ${n8nUrl}`);

// Send the request
const req = client.request(options, (res) => {
  console.log(`Response status: ${res.statusCode}`);
  
  let data = '';
  
  // Collect response data
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  // Process complete response
  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✅ Workflow updated successfully!');
      try {
        const response = JSON.parse(data);
        console.log(`Workflow name: ${response.data.name}`);
        console.log(`Last updated: ${new Date(response.data.updatedAt).toLocaleString()}`);
      } catch (e) {
        console.log('Response data could not be parsed as JSON');
      }
    } else {
      console.log('❌ Failed to update workflow');
      console.log('Response data:');
      console.log(data);
    }
  });
});

// Handle request errors
req.on('error', (e) => {
  console.error(`Request error: ${e.message}`);
});

// Send the workflow data
const postData = JSON.stringify(workflowData);
req.write(postData);
req.end();

console.log('Request sent, waiting for response...');

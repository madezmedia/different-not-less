// Airtable-Shopify Setup Schema
// This schema defines a new table for managing Shopify store setup tasks

const shopifySetupTable = {
  name: "Shopify Store Setup",
  fields: [
    { name: "Task Name", type: "singleLineText" },
    { 
      name: "Category", 
      type: "singleSelect",
      options: [
        "Store Foundation", 
        "Store Design", 
        "Product Setup", 
        "Collection Setup", 
        "Content Creation",
        "Integration", 
        "Marketing", 
        "Legal", 
        "Technical"
      ]
    },
    {
      name: "Status",
      type: "singleSelect",
      options: [
        "Not Started",
        "In Progress",
        "Waiting on Dependency",
        "Completed",
        "Blocked"
      ]
    },
    { name: "Priority", 
      type: "singleSelect",
      options: ["High", "Medium", "Low"]
    },
    { name: "Assigned To", type: "singleLineText" },
    { name: "Due Date", type: "date" },
    { name: "Description", type: "longText" },
    { name: "Dependencies", type: "longText" },
    { name: "Notes", type: "longText" },
    { name: "Completion Date", type: "date" },
    { 
      name: "Launch Phase", 
      type: "singleSelect",
      options: [
        "Pre-Launch",
        "Launch Week",
        "Post-Launch"
      ]
    }
  ]
};

// Business Details Table Schema
const businessDetailsTable = {
  name: "Business Details",
  fields: [
    { name: "Item Name", type: "singleLineText" },
    { 
      name: "Category", 
      type: "singleSelect",
      options: [
        "Legal", 
        "Financial", 
        "Brand Identity", 
        "Accounts", 
        "Policies",
        "Contact Information",
        "Shipping",
        "Taxes"
      ]
    },
    { name: "Value", type: "longText" },
    { name: "Date Added", type: "date" },
    { name: "Last Updated", type: "date" },
    { name: "Notes", type: "longText" },
    { name: "Document", type: "attachment" },
    { 
      name: "Status", 
      type: "singleSelect",
      options: [
        "Not Started",
        "In Progress",
        "Completed",
        "Needs Review",
        "Needs Update"
      ]
    },
    { name: "Responsible Party", type: "singleLineText" }
  ]
};

// Initial task data for Shopify Store Setup
const initialShopifyTasks = [
  {
    "Task Name": "Create Shopify Account",
    "Category": "Store Foundation",
    "Status": "Not Started",
    "Priority": "High",
    "Description": "Set up Shopify account with appropriate plan for headless commerce approach.",
    "Launch Phase": "Pre-Launch"
  },
  {
    "Task Name": "Configure Payment Gateways",
    "Category": "Store Foundation",
    "Status": "Not Started",
    "Priority": "High",
    "Description": "Set up Shopify Payments and PayPal as payment options.",
    "Dependencies": "Create Shopify Account",
    "Launch Phase": "Pre-Launch"
  },
  {
    "Task Name": "Set up Shipping Zones and Rates",
    "Category": "Store Foundation",
    "Status": "Not Started",
    "Priority": "High",
    "Description": "Configure shipping settings for domestic and international shipping.",
    "Dependencies": "Create Shopify Account",
    "Launch Phase": "Pre-Launch"
  },
  {
    "Task Name": "Configure Tax Settings",
    "Category": "Store Foundation",
    "Status": "Not Started",
    "Priority": "High",
    "Description": "Set up tax collection for appropriate regions and product types.",
    "Dependencies": "Create Shopify Account",
    "Launch Phase": "Pre-Launch"
  },
  {
    "Task Name": "Create Your Words Matter Collection",
    "Category": "Collection Setup",
    "Status": "Not Started",
    "Priority": "High",
    "Description": "Set up the flagship AAC-focused collection in Shopify.",
    "Dependencies": "Create Shopify Account",
    "Launch Phase": "Pre-Launch"
  },
  {
    "Task Name": "Create Different Not Less Collection",
    "Category": "Collection Setup",
    "Status": "Not Started",
    "Priority": "High",
    "Description": "Set up the neurodiversity-affirming collection in Shopify.",
    "Dependencies": "Create Shopify Account",
    "Launch Phase": "Pre-Launch"
  },
  {
    "Task Name": "Create SLP Professional Collection",
    "Category": "Collection Setup",
    "Status": "Not Started",
    "Priority": "Medium",
    "Description": "Set up the collection for speech-language pathologists in Shopify.",
    "Dependencies": "Create Shopify Account",
    "Launch Phase": "Pre-Launch"
  },
  {
    "Task Name": "Create Educator Collection",
    "Category": "Collection Setup",
    "Status": "Not Started",
    "Priority": "Medium",
    "Description": "Set up the collection for special education teachers in Shopify.",
    "Dependencies": "Create Shopify Account",
    "Launch Phase": "Pre-Launch"
  },
  {
    "Task Name": "Set up Product Templates in Airtable",
    "Category": "Product Setup",
    "Status": "Not Started",
    "Priority": "High",
    "Description": "Create product templates in Airtable for each product type.",
    "Launch Phase": "Pre-Launch"
  },
  {
    "Task Name": "Configure Product Attributes",
    "Category": "Product Setup",
    "Status": "Not Started",
    "Priority": "High",
    "Description": "Set up size, color, and other variant options in Shopify.",
    "Dependencies": "Create Shopify Account",
    "Launch Phase": "Pre-Launch"
  },
  {
    "Task Name": "Connect Printify Account",
    "Category": "Integration",
    "Status": "Not Started",
    "Priority": "High",
    "Description": "Link Printify to Shopify store for product fulfillment.",
    "Dependencies": "Create Shopify Account, Configure Product Attributes",
    "Launch Phase": "Pre-Launch"
  },
  {
    "Task Name": "Create Airtable-Shopify Sync Workflow",
    "Category": "Integration",
    "Status": "Not Started",
    "Priority": "High",
    "Description": "Develop n8n workflow to sync inventory between Airtable and Shopify.",
    "Dependencies": "Set up Product Templates in Airtable, Create Shopify Account",
    "Launch Phase": "Pre-Launch"
  },
  {
    "Task Name": "Create Privacy Policy",
    "Category": "Legal",
    "Status": "Not Started",
    "Priority": "High",
    "Description": "Develop and publish privacy policy on the website.",
    "Launch Phase": "Pre-Launch"
  },
  {
    "Task Name": "Create Terms of Service",
    "Category": "Legal",
    "Status": "Not Started",
    "Priority": "High",
    "Description": "Develop and publish terms of service on the website.",
    "Launch Phase": "Pre-Launch"
  },
  {
    "Task Name": "Set up Google Analytics",
    "Category": "Marketing",
    "Status": "Not Started",
    "Priority": "Medium",
    "Description": "Configure Google Analytics 4 for the store.",
    "Launch Phase": "Pre-Launch"
  },
  {
    "Task Name": "Create Email Marketing Templates",
    "Category": "Marketing",
    "Status": "Not Started",
    "Priority": "Medium",
    "Description": "Design email templates for launch and regular marketing.",
    "Launch Phase": "Pre-Launch"
  },
  {
    "Task Name": "Set up Discount Codes",
    "Category": "Marketing",
    "Status": "Not Started",
    "Priority": "Medium",
    "Description": "Create launch discount codes and promotional offers.",
    "Dependencies": "Create Shopify Account",
    "Launch Phase": "Pre-Launch"
  },
  {
    "Task Name": "Configure Checkout Experience",
    "Category": "Store Design",
    "Status": "Not Started",
    "Priority": "High",
    "Description": "Customize the checkout process for optimal conversion.",
    "Dependencies": "Create Shopify Account",
    "Launch Phase": "Pre-Launch"
  },
  {
    "Task Name": "Design Homepage Layout",
    "Category": "Store Design",
    "Status": "Not Started",
    "Priority": "High", 
    "Description": "Create an accessible, user-friendly homepage design.",
    "Launch Phase": "Pre-Launch"
  }
];

// Initial data for Business Details table
const initialBusinessDetails = [
  {
    "Item Name": "Business Legal Name",
    "Category": "Legal",
    "Status": "Not Started",
    "Notes": "Official legal name to be used on all documentation"
  },
  {
    "Item Name": "Business Structure",
    "Category": "Legal",
    "Status": "Not Started",
    "Notes": "LLC, Sole Proprietorship, etc."
  },
  {
    "Item Name": "EIN (Employer Identification Number)",
    "Category": "Legal",
    "Status": "Not Started",
    "Notes": "Federal tax ID for the business"
  },
  {
    "Item Name": "Business License",
    "Category": "Legal",
    "Status": "Not Started",
    "Notes": "Local business license information"
  },
  {
    "Item Name": "Business Bank Account",
    "Category": "Financial",
    "Status": "Not Started",
    "Notes": "Business checking and savings accounts"
  },
  {
    "Item Name": "Payment Processor Information",
    "Category": "Financial",
    "Status": "Not Started",
    "Notes": "Shopify Payments, PayPal, etc."
  },
  {
    "Item Name": "Sales Tax Information",
    "Category": "Taxes",
    "Status": "Not Started",
    "Notes": "State/local sales tax registration and collection plan"
  },
  {
    "Item Name": "Primary Logo",
    "Category": "Brand Identity",
    "Status": "Not Started",
    "Notes": "Final logo files in various formats (PNG, SVG, etc.)"
  },
  {
    "Item Name": "Brand Color Palette",
    "Category": "Brand Identity",
    "Status": "Not Started",
    "Notes": "Primary and secondary brand colors with hex codes"
  },
  {
    "Item Name": "Typography",
    "Category": "Brand Identity",
    "Status": "Not Started",
    "Notes": "Brand fonts for headings and body text"
  },
  {
    "Item Name": "Privacy Policy",
    "Category": "Policies",
    "Status": "Not Started",
    "Notes": "Privacy policy document for the website"
  },
  {
    "Item Name": "Terms of Service",
    "Category": "Policies",
    "Status": "Not Started",
    "Notes": "Terms and conditions for using the store"
  },
  {
    "Item Name": "Return & Refund Policy",
    "Category": "Policies",
    "Status": "Not Started",
    "Notes": "Policy for handling returns and refunds"
  },
  {
    "Item Name": "Shipping Policy",
    "Category": "Shipping",
    "Status": "Not Started",
    "Notes": "Detailed shipping information and timeframes"
  },
  {
    "Item Name": "Business Email Addresses",
    "Category": "Contact Information",
    "Status": "Not Started",
    "Notes": "Set up info@, support@, etc. email addresses"
  },
  {
    "Item Name": "Business Phone Number",
    "Category": "Contact Information",
    "Status": "Not Started",
    "Notes": "Customer service phone number if applicable"
  },
  {
    "Item Name": "Business Social Media Accounts",
    "Category": "Accounts",
    "Status": "Not Started",
    "Notes": "Instagram, Facebook, TikTok, etc."
  },
  {
    "Item Name": "Shopify Account",
    "Category": "Accounts",
    "Status": "Not Started",
    "Notes": "Account information and plan details"
  },
  {
    "Item Name": "Printify Account",
    "Category": "Accounts",
    "Status": "Not Started",
    "Notes": "Account information for print-on-demand service"
  },
  {
    "Item Name": "Google Analytics Account",
    "Category": "Accounts",
    "Status": "Not Started",
    "Notes": "GA4 property information"
  }
];

// Function to create tables in Airtable
async function createShopifySetupTables(airtableBase) {
  console.log("Creating Shopify Setup and Business Details tables in Airtable...");
  
  try {
    // Create Shopify Store Setup table if it doesn't exist
    const shopifyTable = await createTableIfNotExists(
      airtableBase, 
      shopifySetupTable.name, 
      shopifySetupTable.fields
    );
    
    // Create Business Details table if it doesn't exist
    const businessTable = await createTableIfNotExists(
      airtableBase, 
      businessDetailsTable.name, 
      businessDetailsTable.fields
    );
    
    // Populate with initial data
    await populateInitialData(airtableBase, shopifySetupTable.name, initialShopifyTasks);
    await populateInitialData(airtableBase, businessDetailsTable.name, initialBusinessDetails);
    
    console.log("Tables created and populated successfully!");
    return {
      shopifyTable: shopifyTable,
      businessTable: businessTable
    };
  } catch (error) {
    console.error("Error creating tables:", error);
    throw error;
  }
}

// Helper function to create a table if it doesn't exist
async function createTableIfNotExists(base, tableName, fields) {
  // In a real implementation, you would use the Airtable API to create a table
  // For demonstration purposes, we'll just log the operation
  console.log(`Creating table: ${tableName}`);
  console.log(`With fields:`, fields);
  
  return {
    name: tableName,
    fields: fields
  };
}

// Helper function to populate a table with initial data
async function populateInitialData(base, tableName, records) {
  // In a real implementation, you would use the Airtable API to create records
  console.log(`Populating ${tableName} with ${records.length} initial records`);
  
  // Simulate creating records in chunks
  const chunkSize = 10;
  for (let i = 0; i < records.length; i += chunkSize) {
    const chunk = records.slice(i, i + chunkSize);
    console.log(`Creating ${chunk.length} records (${i+1} to ${Math.min(i+chunkSize, records.length)})`);
  }
}

module.exports = {
  shopifySetupTable,
  businessDetailsTable,
  initialShopifyTasks,
  initialBusinessDetails,
  createShopifySetupTables
};
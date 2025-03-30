// Different Not Less Apparel - Airtable Base Schema
// This schema defines the structure for inventory management in Airtable

// Products Table Schema
const productsTable = {
  name: "Products",
  fields: [
    { name: "Product Name", type: "singleLineText" },
    { name: "Product ID", type: "singleLineText" },
    { name: "Shopify Product ID", type: "singleLineText" },
    { name: "Sanity Document ID", type: "singleLineText" },
    { name: "SKU", type: "singleLineText" },
    { name: "Description", type: "longText" },
    { 
      name: "Product Type", 
      type: "singleSelect",
      options: ["T-Shirt", "Sweatshirt", "Hoodie", "Tank Top", "Long Sleeve"]
    },
    { name: "Price", type: "currency", options: { precision: 2 } },
    { name: "Cost", type: "currency", options: { precision: 2 } },
    { name: "Profit Margin", type: "percent", options: { precision: 2 } },
    { 
      name: "Collections", 
      type: "multipleSelects",
      options: [
        "Your Words Matter", 
        "Different Not Less", 
        "AAC Collection", 
        "SLP Professional", 
        "Teacher Collection"
      ]
    },
    { name: "Main Image", type: "attachment" },
    { name: "Additional Images", type: "attachment" },
    { 
      name: "Status", 
      type: "singleSelect",
      options: ["Available", "Low Stock", "Out of Stock", "Discontinued"]
    },
    { name: "Featured Product", type: "checkbox" },
    { name: "New Arrival", type: "checkbox" },
    { name: "Creation Date", type: "date" },
    { name: "Last Modified", type: "date" },
    { name: "Variants", type: "link", options: { linkedTableName: "Inventory" } }
  ]
};

// Inventory Table Schema
const inventoryTable = {
  name: "Inventory",
  fields: [
    { name: "Product", type: "link", options: { linkedTableName: "Products" } },
    { name: "Variant ID", type: "singleLineText" },
    { 
      name: "Size", 
      type: "singleSelect",
      options: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"]
    },
    { 
      name: "Color", 
      type: "singleSelect",
      options: ["White", "Black", "Navy", "Gray", "Pink", "Light Blue", "Purple"]
    },
    { name: "Inventory Count", type: "number", options: { precision: 0 } },
    { name: "Reorder Threshold", type: "number", options: { precision: 0 } },
    { 
      name: "Reorder Status", 
      type: "formula", 
      options: { 
        formula: "IF({Inventory Count} <= {Reorder Threshold}, 'Needs Reorder', 'OK')"
      }
    },
    { name: "Last Inventory Update", type: "date" }
  ]
};

// Orders Table Schema
const ordersTable = {
  name: "Orders",
  fields: [
    { name: "Order Number", type: "singleLineText" },
    { name: "Shopify Order ID", type: "singleLineText" },
    { name: "Customer Name", type: "singleLineText" },
    { name: "Customer Email", type: "email" },
    { name: "Order Date", type: "date" },
    { name: "Products", type: "link", options: { linkedTableName: "Inventory" } },
    { name: "Quantities", type: "number", options: { precision: 0 } },
    { name: "Subtotal", type: "currency", options: { precision: 2 } },
    { name: "Shipping Cost", type: "currency", options: { precision: 2 } },
    { name: "Tax", type: "currency", options: { precision: 2 } },
    { name: "Total", type: "currency", options: { precision: 2 } },
    { 
      name: "Payment Status", 
      type: "singleSelect",
      options: ["Paid", "Pending", "Failed", "Refunded"]
    },
    { 
      name: "Fulfillment Status", 
      type: "singleSelect",
      options: ["Unfulfilled", "In Progress", "Fulfilled", "Partially Fulfilled", "Returned"]
    },
    { name: "Tracking Number", type: "singleLineText" },
    { name: "Notes", type: "longText" },
    { name: "Customer", type: "link", options: { linkedTableName: "Customers" } }
  ]
};

// Customers Table Schema
const customersTable = {
  name: "Customers",
  fields: [
    { name: "Customer Name", type: "singleLineText" },
    { name: "Email", type: "email" },
    { name: "Phone", type: "phoneNumber" },
    { name: "Shopify Customer ID", type: "singleLineText" },
    { name: "Orders", type: "link", options: { linkedTableName: "Orders" } },
    { name: "Total Orders", type: "count", options: { field: "Orders" } },
    { name: "Total Spent", type: "rollup", options: { field: "Orders.Total" } },
    { 
      name: "Average Order Value", 
      type: "formula", 
      options: { formula: "{Total Spent} / {Total Orders}" }
    },
    { name: "First Order Date", type: "rollup", options: { field: "Orders.Order Date", function: "MIN" } },
    { name: "Last Order Date", type: "rollup", options: { field: "Orders.Order Date", function: "MAX" } },
    { 
      name: "Customer Type", 
      type: "singleSelect",
      options: ["SLP", "Teacher", "Parent", "AAC User", "Other Professional", "General Customer"]
    },
    { 
      name: "Marketing Preferences", 
      type: "multipleSelects",
      options: ["Email", "SMS", "None"]
    },
    { name: "Notes", type: "longText" }
  ]
};

// Marketing Campaigns Table Schema
const marketingCampaignsTable = {
  name: "Marketing Campaigns",
  fields: [
    { name: "Campaign Name", type: "singleLineText" },
    { name: "Description", type: "longText" },
    { 
      name: "Platform", 
      type: "multipleSelects",
      options: ["Instagram", "Facebook", "TikTok", "Email", "Website"]
    },
    { name: "Start Date", type: "date" },
    { name: "End Date", type: "date" },
    { name: "Featured Products", type: "link", options: { linkedTableName: "Products" } },
    { name: "Discount Code", type: "singleLineText" },
    { name: "Budget", type: "currency", options: { precision: 2 } },
    { name: "Actual Spend", type: "currency", options: { precision: 2 } },
    { name: "Orders Generated", type: "count", options: { field: "Orders" } },
    { name: "Revenue Generated", type: "rollup", options: { field: "Orders.Total" } },
    { 
      name: "ROI", 
      type: "formula", 
      options: { formula: "({Revenue Generated} - {Actual Spend}) / {Actual Spend}" }
    },
    { 
      name: "Campaign Status", 
      type: "singleSelect",
      options: ["Planning", "Active", "Completed", "On Hold"]
    },
    { name: "Campaign Assets", type: "attachment" },
    { name: "Notes", type: "longText" }
  ]
};

// SEO Keywords Table Schema
const seoKeywordsTable = {
  name: "SEO Keywords",
  fields: [
    { name: "Keyword", type: "singleLineText" },
    { 
      name: "Category", 
      type: "singleSelect",
      options: ["Primary", "Secondary", "Long-tail", "Seasonal", "Product-specific"]
    },
    { 
      name: "Search Volume", 
      type: "singleSelect",
      options: ["High", "Medium", "Low"]
    },
    { 
      name: "Competition", 
      type: "singleSelect",
      options: ["High", "Medium", "Low"]
    },
    { name: "Relevance to Products", type: "link", options: { linkedTableName: "Products" } },
    { 
      name: "Priority", 
      type: "singleSelect",
      options: ["High", "Medium", "Low"]
    },
    { 
      name: "Implementation Status", 
      type: "singleSelect",
      options: ["Not Started", "In Progress", "Implemented", "Optimizing"]
    },
    { name: "Performance Rating", type: "rating", options: { max: 5 } },
    { name: "Notes", type: "longText" }
  ]
};

// Airtable Automations Configuration
const automations = [
  {
    name: "Low Stock Alert",
    trigger: {
      type: "When record matches conditions",
      table: "Inventory",
      conditions: [
        { field: "Reorder Status", operator: "Equal", value: "Needs Reorder" }
      ]
    },
    actions: [
      { type: "Send email", to: "{{ params.inventoryManager }}", subject: "Low Stock Alert: {{ triggeredRecord.Product.Name }}" }
    ]
  },
  {
    name: "New Order Notification",
    trigger: {
      type: "When record created",
      table: "Orders"
    },
    actions: [
      { type: "Send email", to: "{{ params.fulfillmentTeam }}", subject: "New Order: {{ triggeredRecord.Order Number }}" }
    ]
  },
  {
    name: "Inventory Adjustment",
    trigger: {
      type: "When record matches conditions",
      table: "Orders",
      conditions: [
        { field: "Fulfillment Status", operator: "Equal", value: "Fulfilled" }
      ]
    },
    actions: [
      { 
        type: "Update record", 
        table: "Inventory", 
        recordId: "{{ triggeredRecord.Products.id }}",
        fields: {
          "Inventory Count": "{{ triggeredRecord.Products.Inventory Count - triggeredRecord.Quantities }}"
        }
      }
    ]
  }
];

// Export schema for implementation
module.exports = {
  productsTable,
  inventoryTable,
  ordersTable,
  customersTable,
  marketingCampaignsTable,
  seoKeywordsTable,
  automations
};

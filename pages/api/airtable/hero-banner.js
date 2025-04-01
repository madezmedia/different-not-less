/**
 * Hero Banner API Endpoint
 * 
 * This API endpoint fetches hero banners from the Airtable image workspace
 * based on the collection name provided in the query parameters.
 * 
 * Example usage:
 * GET /api/airtable/hero-banner?collection=Your%20Words%20Matter
 */

import Airtable from 'airtable';

// Initialize Airtable
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID);

// Constants
const WEBSITE_IMAGES_TABLE = 'Website Images';

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { collection } = req.query;

    if (!collection) {
      return res.status(400).json({ error: 'Collection parameter is required' });
    }

    // Fetch hero banner for the specified collection
    const records = await base(WEBSITE_IMAGES_TABLE)
      .select({
        maxRecords: 1,
        filterByFormula: `AND(
          FIND("${collection}", {Collection Association}),
          {Image Type} = "Hero Banner",
          {Status} = "In Use"
        )`,
        sort: [{ field: 'Creation Date', direction: 'desc' }]
      })
      .firstPage();

    // If no hero banner found
    if (records.length === 0) {
      return res.status(404).json({ error: 'No hero banner found for this collection' });
    }

    // Get the first record
    const record = records[0];
    
    // Extract the image URL from the attachment
    const imageAttachments = record.fields['Image File'];
    
    if (!imageAttachments || imageAttachments.length === 0) {
      return res.status(404).json({ error: 'Hero banner has no image attachment' });
    }

    // Prepare the response
    const heroBanner = {
      id: record.id,
      name: record.fields['Image Name'],
      imageUrl: imageAttachments[0].url,
      thumbnailUrl: imageAttachments[0].thumbnails?.large?.url || imageAttachments[0].url,
      dimensions: record.fields['Image Dimensions'],
      altText: record.fields['Alt Text'] || `Hero banner for ${collection} collection`,
      collection: collection
    };

    // Return the hero banner data
    return res.status(200).json(heroBanner);
    
  } catch (error) {
    console.error('Error fetching hero banner:', error);
    return res.status(500).json({ error: 'Failed to fetch hero banner', details: error.message });
  }
}

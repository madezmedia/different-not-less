import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'qquhqgga',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-03-25',
  token: process.env.SANITY_API_TOKEN,
  useCdn: true,
});

// Helper function for image URL generation
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

// Helper function for fetching data
export async function fetchSanityData(query, params = {}) {
  try {
    return await client.fetch(query, params);
  } catch (error) {
    console.error('Sanity fetch error:', error);
    return null;
  }
}
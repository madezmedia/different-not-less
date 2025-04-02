export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'shopifyProductId',
      title: 'Shopify Product ID',
      type: 'string',
      description: 'The ID of this product in Shopify'
    },
    {
      name: 'printifyProductId',
      title: 'Printify Product ID',
      type: 'string'
    },
    {
      name: 'aacType',
      title: 'AAC Type',
      type: 'string',
      options: {
        list: [
          { title: 'High-Tech AAC', value: 'high-tech' },
          { title: 'Low-Tech AAC', value: 'low-tech' },
          { title: 'PECS', value: 'pecs' },
          { title: 'Sign Language', value: 'sign-language' },
          { title: 'Communication Board', value: 'comm-board' }
        ]
      }
    },
    {
      name: 'deviceModels',
      title: 'Device Models',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Specific AAC device models referenced (if applicable)'
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'images',
      title: 'Additional Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.max(160)
    },
    {
      name: 'designStyle',
      title: 'Design Style',
      type: 'string',
      options: {
        list: [
          { title: 'Typography-focused', value: 'typography' },
          { title: 'Illustrative', value: 'illustrative' },
          { title: 'Minimalist', value: 'minimalist' },
          { title: 'Watercolor', value: 'watercolor' },
          { title: 'Hand-drawn', value: 'hand-drawn' }
        ]
      }
    },
    {
      name: 'targetAudience',
      title: 'Target Audience',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'SLPs', value: 'slps' },
          { title: 'SPED Teachers', value: 'sped-teachers' },
          { title: 'RBTs/BCBAs', value: 'rbts-bcbas' },
          { title: 'Parents', value: 'parents' },
          { title: 'AAC Users', value: 'aac-users' },
          { title: 'Autism Community', value: 'autism-community' },
          { title: 'General Public', value: 'general-public' }
        ]
      }
    },
    {
      name: 'sensoryFeatures',
      title: 'Sensory Features',
      type: 'text',
      description: 'Description of sensory-friendly features'
    },
    {
      name: 'careInstructions',
      title: 'Care Instructions',
      type: 'text'
    },
    {
      name: 'isNewArrival',
      title: 'New Arrival',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'isFeatured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'collections',
      title: 'Collections',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'collection' } }]
    },
    {
      name: 'seo',
      title: 'SEO Information',
      type: 'seo'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage'
    }
  }
};
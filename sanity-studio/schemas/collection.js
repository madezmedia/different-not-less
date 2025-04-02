export default {
  name: 'collection',
  title: 'Collection',
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
      name: 'shopifyCollectionId',
      title: 'Shopify Collection ID',
      type: 'string',
      description: 'The ID of this collection in Shopify'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'educationalContext',
      title: 'Educational Context',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Educational context related to this collection'
    },
    {
      name: 'audienceDescription',
      title: 'Audience Description',
      type: 'text',
      description: 'Information about who this collection is designed for'
    },
    {
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which to display collections (lower numbers first)'
    },
    {
      name: 'featuredProduct',
      title: 'Featured Product',
      type: 'reference',
      to: { type: 'product' }
    },
    {
      name: 'featured',
      title: 'Featured Collection',
      type: 'boolean',
      description: 'Show this collection on the homepage'
    },
    {
      name: 'seo',
      title: 'SEO Information',
      type: 'seo'
    }
  ]
};
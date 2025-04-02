export default {
  name: 'aacResource',
  title: 'AAC Resource',
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
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'deviceModels',
      title: 'Device Models',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Specific AAC device models referenced (if applicable)'
    },
    {
      name: 'symbolSystems',
      title: 'Symbol Systems',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'PCS', value: 'pcs' },
          { title: 'Symbolstix', value: 'symbolstix' },
          { title: 'ARASAAC', value: 'arasaac' },
          { title: 'Blissymbols', value: 'blissymbols' },
          { title: 'Other', value: 'other' }
        ]
      }
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'content',
      title: 'Resource Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption'
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text'
            }
          ]
        }
      ]
    },
    {
      name: 'downloadableResources',
      title: 'Downloadable Resources',
      type: 'array',
      of: [
        {
          type: 'file',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Resource Title'
            },
            {
              name: 'description',
              type: 'text',
              title: 'Resource Description'
            }
          ]
        }
      ]
    },
    {
      name: 'implementationGuide',
      title: 'Implementation Guide',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Practical guidance for using this AAC resource'
    },
    {
      name: 'relatedProducts',
      title: 'Related Products',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'product' } }]
    },
    {
      name: 'seo',
      title: 'SEO Information',
      type: 'seo'
    }
  ]
};
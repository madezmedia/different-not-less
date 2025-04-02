export default {
  name: 'educationalResource',
  title: 'Educational Resource',
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
      name: 'resourceType',
      title: 'Resource Type',
      type: 'string',
      options: {
        list: [
          { title: 'Guide', value: 'guide' },
          { title: 'Infographic', value: 'infographic' },
          { title: 'Downloadable PDF', value: 'pdf' },
          { title: 'Interactive Tool', value: 'interactive' },
          { title: 'Video', value: 'video' }
        ]
      },
      validation: Rule => Rule.required()
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
      name: 'file',
      title: 'Resource File',
      type: 'file',
      description: 'Upload PDF or other downloadable file'
    },
    {
      name: 'externalLink',
      title: 'External Resource Link',
      type: 'url',
      description: 'Link to external resource (if applicable)'
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
              title: 'Caption',
              options: {
                isHighlighted: true
              }
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              options: {
                isHighlighted: true
              }
            }
          ]
        }
      ]
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
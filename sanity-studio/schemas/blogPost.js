export default {
  name: 'blogPost',
  title: 'Blog Post',
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
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'authorProfile' }
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
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'AAC Resources', value: 'aac-resources' },
          { title: 'Autism Acceptance', value: 'autism-acceptance' },
          { title: 'Professional Resources', value: 'professional-resources' },
          { title: 'Educational Implementation', value: 'educational-implementation' },
          { title: 'Communication Strategies', value: 'communication-strategies' }
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
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime'
    },
    {
      name: 'body',
      title: 'Body',
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
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage'
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`
      });
    }
  }
};
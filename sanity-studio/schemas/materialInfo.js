export default {
  name: 'materialInfo',
  title: 'Material Information',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Material Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'composition',
      title: 'Composition',
      type: 'string',
      description: 'e.g., "100% organic cotton"',
      validation: Rule => Rule.required()
    },
    {
      name: 'weight',
      title: 'Fabric Weight',
      type: 'string',
      description: 'e.g., "5.3 oz/yd²"'
    },
    {
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'OEKO-TEX', value: 'oeko-tex' },
          { title: 'GOTS Certified', value: 'gots' },
          { title: 'Fair Trade', value: 'fair-trade' },
          { title: 'Recycled Content', value: 'recycled-content' }
        ]
      }
    },
    {
      name: 'sensoryRating',
      title: 'Sensory Comfort Rating',
      type: 'number',
      description: 'Rating from 1-5, with 5 being maximum comfort',
      validation: Rule => Rule.min(1).max(5)
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Detailed description of the material properties'
    },
    {
      name: 'careInstructions',
      title: 'Care Instructions',
      type: 'array',
      of: [{ type: 'string' }]
    }
  ]
};
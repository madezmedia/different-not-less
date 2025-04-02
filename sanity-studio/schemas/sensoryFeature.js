export default {
  name: 'sensoryFeature',
  title: 'Sensory Feature',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'image'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Texture', value: 'texture' },
          { title: 'Sound', value: 'sound' },
          { title: 'Visual', value: 'visual' },
          { title: 'Fit', value: 'fit' }
        ]
      }
    }
  ]
};
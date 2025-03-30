// schemas/index.js - Main schema file for Sanity CMS
import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

// Import schema types
import product from './product';
import collection from './collection';
import blogPost from './blogPost';
import educationalResource from './educationalResource';
import authorProfile from './authorProfile';
import seo from './seo';
import homePage from './homePage';
import productFeature from './productFeature';
import materialInfo from './materialInfo';
import aacResource from './aacResource';

// Create schema
export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    product,
    collection,
    blogPost,
    educationalResource,
    authorProfile,
    seo,
    homePage,
    productFeature,
    materialInfo,
    aacResource
  ])
});

// schemas/product.js - Product schema
export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
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
    },
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
      name: 'airtableRecordId',
      title: 'Airtable Record ID',
      type: 'string',
      description: 'The ID of this product in Airtable'
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
      name: 'designElements',
      title: 'Design Elements',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'AAC Device', value: 'aac-device' },
          { title: 'PECS Cards', value: 'pecs-cards' },
          { title: 'Sign Language', value: 'sign-language' },
          { title: 'Speech Bubbles', value: 'speech-bubbles' },
          { title: 'Neurodiversity Symbol', value: 'neurodiversity-symbol' },
          { title: 'Communication Board', value: 'communication-board' },
          { title: 'Heart/Emotion', value: 'heart-emotion' },
          { title: 'Text Only', value: 'text-only' }
        ]
      }
    },
    {
      name: 'taglineMessage',
      title: 'Tagline/Message',
      type: 'string'
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
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'materialInfo',
      title: 'Material Information',
      type: 'reference',
      to: { type: 'materialInfo' }
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
      name: 'features',
      title: 'Product Features',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'productFeature' } }]
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

// schemas/collection.js - Collection schema
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
      name: 'seo',
      title: 'SEO Information',
      type: 'seo'
    }
  ]
};

// schemas/materialInfo.js - Material information schema
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

// schemas/blogPost.js - Blog post schema
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
      name: 'relatedResources',
      title: 'Related Resources',
      type: 'array',
      of: [
        { type: 'reference', to: { type: 'educationalResource' } },
        { type: 'reference', to: { type: 'aacResource' } }
      ]
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

// schemas/educationalResource.js - Educational resource schema
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

// schemas/aacResource.js - AAC-specific resource schema
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
/**
 * Airtable Image Workspace Schema
 * 
 * This file documents the schema for the Airtable image workspace used to manage
 * website and social media assets for Different Not Less.
 */

// Base ID: applwPKN2KZFZ9JfW

const AIRTABLE_SCHEMA = {
  // Website Images Table
  websiteImages: {
    tableId: 'tblvIGksraXr9MHlJ',
    tableName: 'Website Images',
    fields: {
      // Basic Information
      imageName: {
        name: 'Image Name',
        type: 'singleLineText',
        description: 'Unique name for the image following naming convention: [Type]-[Collection]-[Purpose]-[Dimensions]',
        example: 'Hero-YourWordsMatter-MainBanner-1200x400'
      },
      imageType: {
        name: 'Image Type',
        type: 'singleSelect',
        description: 'The type of image',
        options: [
          'Hero Banner',
          'Product Image',
          'Collection Thumbnail',
          'Social Media Post',
          'Facebook Cover',
          'Instagram Post',
          'Twitter Header',
          'Email Header',
          'Blog Feature',
          'Icon'
        ]
      },
      imageDimensions: {
        name: 'Image Dimensions',
        type: 'singleLineText',
        description: 'Dimensions of the image in pixels (width x height)',
        example: '1200x400'
      },
      status: {
        name: 'Status',
        type: 'singleSelect',
        description: 'Current status of the image in the workflow',
        options: [
          'Draft',         // Initial state, ready for generation
          'In Review',     // Generated and awaiting approval
          'Approved',      // Approved but not yet in use
          'In Use',        // Currently being used on the website
          'Archived',      // No longer in use
          'Rejected'       // Rejected during review
        ]
      },
      
      // Associations
      collectionAssociation: {
        name: 'Collection Association',
        type: 'multipleSelects',
        description: 'Which product collections this image is associated with',
        options: [
          'Your Words Matter',
          'Different Not Less',
          'SLP Professional',
          'BCBA/RBT'
        ]
      },
      usageLocation: {
        name: 'Usage Location',
        type: 'multipleSelects',
        description: 'Where this image is used on the website',
        options: [
          'Homepage',
          'Collection Page',
          'Product Page',
          'About Page',
          'Blog',
          'Email Campaign'
        ]
      },
      
      // Content
      imageFile: {
        name: 'Image File',
        type: 'attachment',
        description: 'The actual image file'
      },
      generationPrompt: {
        name: 'Generation Prompt',
        type: 'longText',
        description: 'The prompt used to generate this image with AI'
      },
      altText: {
        name: 'Alt Text',
        type: 'longText',
        description: 'Accessible alternative text for the image'
      },
      
      // Metadata
      tags: {
        name: 'Tags',
        type: 'multipleSelects',
        description: 'Tags for categorizing and searching images',
        options: [
          'AAC',
          'Inclusive',
          'Communication',
          'Autism',
          'Sensory',
          'Professional',
          'Awareness',
          'Education'
        ]
      },
      creationDate: {
        name: 'Creation Date',
        type: 'dateTime',
        description: 'When this image record was created'
      },
      lastModified: {
        name: 'Last Modified',
        type: 'dateTime',
        description: 'When this image was last modified'
      },
      
      // Relationships
      generationLogs: {
        name: 'Generation Logs',
        type: 'lookup',
        description: 'Linked generation log entries for this image',
        linkedTable: 'Image Generation Logs',
        linkedField: 'Related Image'
      },
      socialMediaPosts: {
        name: 'Social Media Posts',
        type: 'lookup',
        description: 'Social media posts using this image',
        linkedTable: 'Social Media Content',
        linkedField: 'Images'
      }
    }
  },
  
  // Image Generation Logs Table
  imageGenerationLogs: {
    tableId: 'tblZwp6nGsl31jupX',
    tableName: 'Image Generation Logs',
    fields: {
      // Relationships
      relatedImage: {
        name: 'Related Image',
        type: 'link',
        description: 'Link to the image record this log is for',
        linkedTable: 'Website Images'
      },
      
      // Generation Details
      generationTool: {
        name: 'Generation Tool',
        type: 'singleSelect',
        description: 'The tool used to generate the image',
        options: [
          'fal.ai',
          'DALL-E',
          'Midjourney',
          'Stable Diffusion',
          'Manual'
        ]
      },
      promptUsed: {
        name: 'Prompt Used',
        type: 'longText',
        description: 'The exact prompt used for generation'
      },
      generationParameters: {
        name: 'Generation Parameters',
        type: 'longText',
        description: 'JSON string of parameters used for generation',
        example: '{"model":"stable-diffusion-xl-v1-0","steps":30,"cfg_scale":7.5,"width":1200,"height":400}'
      },
      
      // Timestamps
      generationDate: {
        name: 'Generation Date',
        type: 'dateTime',
        description: 'When the generation was attempted'
      },
      
      // Results
      successStatus: {
        name: 'Success Status',
        type: 'checkbox',
        description: 'Whether the generation was successful'
      },
      resultUrl: {
        name: 'Result URL',
        type: 'url',
        description: 'URL to the generated image (if successful)'
      },
      errorMessage: {
        name: 'Error Message',
        type: 'longText',
        description: 'Error message if generation failed'
      },
      processingTime: {
        name: 'Processing Time',
        type: 'number',
        description: 'Time in seconds it took to generate the image'
      }
    }
  },
  
  // Social Media Content Table
  socialMediaContent: {
    tableId: 'tbln1iT0EwPvGgUOJ',
    tableName: 'Social Media Content',
    fields: {
      // Content Information
      contentTitle: {
        name: 'Content Title',
        type: 'singleLineText',
        description: 'Title of the social media post'
      },
      platform: {
        name: 'Platform',
        type: 'multipleSelects',
        description: 'Platforms this content is for',
        options: [
          'Instagram',
          'Facebook',
          'Twitter',
          'LinkedIn',
          'TikTok',
          'Pinterest'
        ]
      },
      contentType: {
        name: 'Content Type',
        type: 'singleSelect',
        description: 'Type of social media content',
        options: [
          'Single Image',
          'Carousel',
          'Video',
          'Text Only',
          'Link Share',
          'Story'
        ]
      },
      
      // Media
      images: {
        name: 'Images',
        type: 'link',
        description: 'Link to images used in this post',
        linkedTable: 'Website Images'
      },
      
      // Content
      caption: {
        name: 'Caption',
        type: 'longText',
        description: 'Caption text for the post'
      },
      hashtags: {
        name: 'Hashtags',
        type: 'longText',
        description: 'Hashtags to use with the post'
      },
      
      // Scheduling
      scheduledDate: {
        name: 'Scheduled Date',
        type: 'dateTime',
        description: 'When this post is scheduled to be published'
      },
      publishedDate: {
        name: 'Published Date',
        type: 'dateTime',
        description: 'When this post was actually published'
      },
      status: {
        name: 'Status',
        type: 'singleSelect',
        description: 'Current status of the post',
        options: [
          'Draft',
          'In Review',
          'Approved',
          'Scheduled',
          'Published',
          'Archived'
        ]
      },
      
      // Campaign
      campaign: {
        name: 'Campaign',
        type: 'singleSelect',
        description: 'Marketing campaign this post is part of',
        options: [
          'Launch',
          'Seasonal',
          'Awareness Month',
          'Sale',
          'Product Announcement',
          'Educational'
        ]
      },
      
      // Performance
      engagement: {
        name: 'Engagement',
        type: 'number',
        description: 'Total engagement (likes, comments, shares)'
      },
      impressions: {
        name: 'Impressions',
        type: 'number',
        description: 'Number of impressions'
      },
      clicks: {
        name: 'Clicks',
        type: 'number',
        description: 'Number of clicks on links'
      }
    }
  },
  
  // Image Templates Table
  imageTemplates: {
    tableId: 'tblbh48d8zvz0TUTQ',
    tableName: 'Image Templates',
    fields: {
      // Template Information
      templateName: {
        name: 'Template Name',
        type: 'singleLineText',
        description: 'Name of the template'
      },
      templateType: {
        name: 'Template Type',
        type: 'singleSelect',
        description: 'Type of image this template is for',
        options: [
          'Hero Banner',
          'Product Image',
          'Social Media Post',
          'Email Header',
          'Blog Feature'
        ]
      },
      
      // Template Content
      basePrompt: {
        name: 'Base Prompt',
        type: 'longText',
        description: 'Base prompt template with placeholders'
      },
      defaultDimensions: {
        name: 'Default Dimensions',
        type: 'singleLineText',
        description: 'Default dimensions for this template type'
      },
      styleGuide: {
        name: 'Style Guide',
        type: 'longText',
        description: 'Style guidelines for this template'
      },
      
      // Technical Details
      defaultParameters: {
        name: 'Default Parameters',
        type: 'longText',
        description: 'Default generation parameters as JSON'
      },
      usageInstructions: {
        name: 'Usage Instructions',
        type: 'longText',
        description: 'Instructions for using this template'
      },
      
      // Examples
      exampleImages: {
        name: 'Example Images',
        type: 'link',
        description: 'Example images created with this template',
        linkedTable: 'Website Images'
      }
    }
  }
};

module.exports = AIRTABLE_SCHEMA;

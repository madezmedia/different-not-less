# Make.com Automation Workflows

This directory contains JSON exports of Make.com automation workflows for the Different Not Less Apparel project.

## Workflow Overview

### 1. AAC Designs with Fal.ai (different-not-less-make-workflow.json)
- **Purpose**: Main workflow that generates AAC/Autism acceptance t-shirt designs
- **Trigger**: New design record in Airtable
- **Process**: 
  1. Reads design requirements from Airtable
  2. Generates design prompt with GPT-4o
  3. Creates an optimized prompt with Cohere
  4. Submits to fal.ai for image generation
  5. Creates product title and description
  6. Uploads to Printify and creates product
  7. Updates Airtable with results

### 2. Queue System for Fal.ai (fal-queue-make-workflow.json)
- **Purpose**: Implements queue-based processing for Fal.ai generation
- **Advantages**: 
  - Better handling of long-running image generation
  - Improved error handling and retry logic
  - Status tracking and monitoring

### 3. Complete Blueprint (fal-printify-complete-blueprint.json)
- **Purpose**: End-to-end blueprint for design to Printify workflow
- **Features**:
  - Self-contained workflow that can run independently
  - Detailed error handling
  - Complete product creation flow

## Setup Instructions

1. **Create a Make.com account** (if you don't have one)
2. **Create a new scenario** in Make.com
3. **Import the workflow JSON** file
4. **Configure connections**:
   - Airtable: Connect to your Different Not Less base
   - OpenAI: Add your GPT-4/GPT-4o API key
   - Cohere: Add your Cohere API key
   - Fal.ai: Add your Fal.ai API key
   - Printify: Connect to your Printify store
   - Gmail: For error notifications

## Environment Variables

The workflows require the following environment variables:
- `FAL_API_KEY`: Your Fal.ai API key
- `MAKE_API_KEY`: Your Make.com API key

## Implementation Notes

- Choose the workflow that best fits your needs:
  - Standard workflow for basic implementation
  - Queue-based workflow for more reliable processing
  - Complete blueprint for end-to-end solution
- The workflows can be scheduled or triggered manually
- All workflows update Airtable with processing status

## Troubleshooting

If you encounter issues:
1. Check API keys and connections
2. Verify Airtable base structure matches expected fields
3. Ensure proper access permissions to all services
4. Check workflow logs in Make.com for error details
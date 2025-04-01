#!/bin/bash

# Different Not Less Apparel - n8n Workflow CI/CD Integration Script
# This script is designed to be run in a CI/CD pipeline to automatically update the n8n workflow

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print header
echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}  Different Not Less - n8n CI/CD Integration    ${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""

# Required environment variables
# N8N_URL - The URL of the n8n instance
# N8N_API_KEY - The API key for the n8n instance
# N8N_WORKFLOW_ID - The ID of the workflow to update
# WORKFLOW_FILE - The path to the workflow JSON file

# Check for required environment variables
if [ -z "$N8N_URL" ]; then
    echo -e "${RED}Error: N8N_URL environment variable is required${NC}"
    exit 1
fi

if [ -z "$N8N_API_KEY" ]; then
    echo -e "${RED}Error: N8N_API_KEY environment variable is required${NC}"
    exit 1
fi

if [ -z "$N8N_WORKFLOW_ID" ]; then
    echo -e "${RED}Error: N8N_WORKFLOW_ID environment variable is required${NC}"
    exit 1
fi

WORKFLOW_FILE=${WORKFLOW_FILE:-"product-creation-workflow.json"}

echo -e "${YELLOW}Deploying workflow to n8n...${NC}"
echo -e "n8n URL: ${N8N_URL}"
echo -e "Workflow ID: ${N8N_WORKFLOW_ID}"
echo -e "Workflow file: ${WORKFLOW_FILE}"
echo ""

# Check if the workflow file exists
if [ ! -f "$WORKFLOW_FILE" ]; then
    echo -e "${RED}Error: Workflow file not found: ${WORKFLOW_FILE}${NC}"
    exit 1
fi

# Use the update-workflow.js script to update the workflow
node update-workflow.js "$N8N_WORKFLOW_ID" "$WORKFLOW_FILE" "$N8N_URL" "$N8N_API_KEY"

# Check if the update was successful
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Workflow successfully deployed to n8n!${NC}"
    
    # Notify Slack if SLACK_WEBHOOK_URL is provided
    if [ ! -z "$SLACK_WEBHOOK_URL" ]; then
        echo -e "${YELLOW}Sending notification to Slack...${NC}"
        
        # Get the current git commit hash
        GIT_COMMIT=$(git rev-parse --short HEAD)
        
        # Get the current git branch
        GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
        
        # Send notification to Slack
        curl -s -X POST -H 'Content-type: application/json' --data "{
            \"text\": \"*n8n Workflow Deployed*\n• Workflow: \`${WORKFLOW_FILE}\`\n• Environment: \`${ENVIRONMENT:-production}\`\n• Branch: \`${GIT_BRANCH}\`\n• Commit: \`${GIT_COMMIT}\`\n• URL: ${N8N_URL}\"
        }" "$SLACK_WEBHOOK_URL"
        
        echo -e "${GREEN}Slack notification sent!${NC}"
    fi
    
    exit 0
else
    echo -e "${RED}Failed to deploy workflow to n8n${NC}"
    
    # Notify Slack about the failure if SLACK_WEBHOOK_URL is provided
    if [ ! -z "$SLACK_WEBHOOK_URL" ]; then
        echo -e "${YELLOW}Sending failure notification to Slack...${NC}"
        
        # Get the current git commit hash
        GIT_COMMIT=$(git rev-parse --short HEAD)
        
        # Get the current git branch
        GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
        
        # Send notification to Slack
        curl -s -X POST -H 'Content-type: application/json' --data "{
            \"text\": \"*n8n Workflow Deployment Failed*\n• Workflow: \`${WORKFLOW_FILE}\`\n• Environment: \`${ENVIRONMENT:-production}\`\n• Branch: \`${GIT_BRANCH}\`\n• Commit: \`${GIT_COMMIT}\`\n• URL: ${N8N_URL}\n\nPlease check the CI/CD logs for details.\"
        }" "$SLACK_WEBHOOK_URL"
        
        echo -e "${GREEN}Slack notification sent!${NC}"
    fi
    
    exit 1
fi

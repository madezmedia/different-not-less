#!/bin/bash

# Different Not Less Apparel - n8n Workflow Setup Script
# This script helps set up and run the n8n workflow for product creation

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print header
echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}  Different Not Less Apparel - n8n Setup Script  ${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""

# Check for required dependencies
echo -e "${YELLOW}Checking dependencies...${NC}"

# Check for Docker
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker is not installed. Please install Docker first.${NC}"
    echo "Visit https://docs.docker.com/get-docker/ for installation instructions."
    exit 1
fi
echo -e "${GREEN}✓ Docker is installed${NC}"

# Check for Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Docker Compose is not installed. Please install Docker Compose first.${NC}"
    echo "Visit https://docs.docker.com/compose/install/ for installation instructions."
    exit 1
fi
echo -e "${GREEN}✓ Docker Compose is installed${NC}"

# Check for Node.js (for the test script)
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}⚠ Node.js is not installed. The test script will not work without it.${NC}"
    echo "Visit https://nodejs.org/ to install Node.js if you want to use the test script."
else
    echo -e "${GREEN}✓ Node.js is installed${NC}"
fi

echo ""

# Check for .env file and create if it doesn't exist
if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env file from template...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✓ Created .env file${NC}"
    echo -e "${YELLOW}Please edit the .env file to add your API keys and configuration.${NC}"
    
    # Open the .env file in the default editor if possible
    if command -v nano &> /dev/null; then
        read -p "Would you like to edit the .env file now? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            nano .env
        fi
    else
        echo "Please edit the .env file with your preferred text editor before continuing."
        read -p "Press Enter when you've updated the .env file..." -r
    fi
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

echo ""

# Create n8n-data directory if it doesn't exist
if [ ! -d "n8n-data" ]; then
    echo -e "${YELLOW}Creating n8n-data directory...${NC}"
    mkdir -p n8n-data
    echo -e "${GREEN}✓ Created n8n-data directory${NC}"
else
    echo -e "${GREEN}✓ n8n-data directory already exists${NC}"
fi

echo ""

# Start n8n using Docker Compose
echo -e "${YELLOW}Starting n8n...${NC}"
docker-compose up -d
echo -e "${GREEN}✓ n8n is now running${NC}"

echo ""

# Get the host IP address for accessing n8n
HOST_IP=$(hostname -I | awk '{print $1}')
if [ -z "$HOST_IP" ]; then
    HOST_IP="localhost"
fi

echo -e "${BLUE}================================================${NC}"
echo -e "${GREEN}n8n is now running!${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""
echo -e "Access the n8n editor at: ${YELLOW}http://$HOST_IP:5678${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo -e "1. Open the n8n editor in your browser"
echo -e "2. Go to Settings > Credentials and set up your API credentials"
echo -e "3. Import the workflow from ${YELLOW}product-creation-workflow.json${NC}"
echo -e "4. Activate the workflow"
echo -e "5. Test the workflow using the test script: ${YELLOW}node test-workflow.js${NC}"
echo ""
echo -e "${BLUE}================================================${NC}"
echo -e "${YELLOW}To stop n8n, run: ${NC}docker-compose down"
echo -e "${BLUE}================================================${NC}"

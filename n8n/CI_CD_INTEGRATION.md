# n8n Workflow CI/CD Integration Guide

This guide explains how to integrate the Different Not Less Apparel n8n workflow with your CI/CD pipeline for automated deployment.

## Table of Contents

- [Overview](#overview)
- [GitHub Actions Integration](#github-actions-integration)
- [Manual Deployment](#manual-deployment)
- [Environment Variables](#environment-variables)
- [Security Considerations](#security-considerations)
- [Troubleshooting](#troubleshooting)

## Overview

The n8n workflow CI/CD integration allows you to automatically deploy your workflow to different n8n environments (development, staging, production) whenever changes are pushed to your repository. This ensures that your workflow is always up-to-date and consistent across all environments.

The integration consists of:

1. A GitHub Actions workflow file (`.github/workflows/deploy-workflow.yml`)
2. A CI/CD integration script (`ci-cd-integration.sh`)
3. A workflow update script (`update-workflow.js`)

## GitHub Actions Integration

The GitHub Actions workflow is configured to deploy the n8n workflow automatically when:

1. Changes are pushed to the `main` or `master` branch and affect the workflow JSON file
2. The workflow is manually triggered via the GitHub Actions UI

### Automatic Deployment

When changes are pushed to the `main` or `master` branch and the `product-creation-workflow.json` file is modified, the workflow will automatically deploy to the production environment.

### Manual Deployment

You can also manually trigger the workflow from the GitHub Actions UI:

1. Go to the "Actions" tab in your GitHub repository
2. Select the "Deploy n8n Workflow" workflow
3. Click "Run workflow"
4. Select the environment to deploy to (production, staging, or development)
5. Click "Run workflow"

### Setting Up GitHub Secrets

To use the GitHub Actions workflow, you need to set up the following secrets in your GitHub repository:

1. Go to your repository settings
2. Click on "Secrets and variables" > "Actions"
3. Add the following secrets:

| Secret Name | Description |
|-------------|-------------|
| `N8N_PROD_URL` | URL of the production n8n instance (e.g., `https://n8n.example.com`) |
| `N8N_PROD_API_KEY` | API key for the production n8n instance |
| `N8N_PROD_WORKFLOW_ID` | ID of the workflow in the production n8n instance |
| `N8N_STAGING_URL` | URL of the staging n8n instance |
| `N8N_STAGING_API_KEY` | API key for the staging n8n instance |
| `N8N_STAGING_WORKFLOW_ID` | ID of the workflow in the staging n8n instance |
| `N8N_DEV_URL` | URL of the development n8n instance |
| `N8N_DEV_API_KEY` | API key for the development n8n instance |
| `N8N_DEV_WORKFLOW_ID` | ID of the workflow in the development n8n instance |
| `SLACK_WEBHOOK_URL` | (Optional) Webhook URL for Slack notifications |

## Manual Deployment

You can also deploy the workflow manually using the provided scripts.

### Using the CI/CD Integration Script

```bash
cd n8n
export N8N_URL=https://n8n.example.com
export N8N_API_KEY=your-api-key
export N8N_WORKFLOW_ID=your-workflow-id
export WORKFLOW_FILE=product-creation-workflow.json
./ci-cd-integration.sh
```

### Using the Update Workflow Script Directly

```bash
cd n8n
node update-workflow.js your-workflow-id product-creation-workflow.json https://n8n.example.com your-api-key
```

## Environment Variables

The CI/CD integration script uses the following environment variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `N8N_URL` | Yes | URL of the n8n instance |
| `N8N_API_KEY` | Yes | API key for the n8n instance |
| `N8N_WORKFLOW_ID` | Yes | ID of the workflow in the n8n instance |
| `WORKFLOW_FILE` | No | Path to the workflow JSON file (default: `product-creation-workflow.json`) |
| `ENVIRONMENT` | No | Environment name for Slack notifications (default: `production`) |
| `SLACK_WEBHOOK_URL` | No | Webhook URL for Slack notifications |

## Security Considerations

### API Keys

The n8n API key provides full access to your n8n instance, so it's important to keep it secure:

1. Never commit API keys to your repository
2. Use GitHub Secrets or other secure methods to store and access API keys
3. Use different API keys for different environments
4. Regularly rotate API keys

### Access Control

Ensure that your n8n instance has appropriate access controls:

1. Enable authentication for your n8n instance
2. Use HTTPS for all n8n instances
3. Consider using IP restrictions to limit access to your n8n instance
4. Set up proper user roles and permissions in n8n

## Troubleshooting

### Common Issues

#### Workflow Not Found

If you get an error like "Workflow not found", check:

1. The workflow ID is correct
2. The n8n URL is correct
3. The API key has permission to access the workflow

#### Authentication Failed

If you get an authentication error, check:

1. The API key is correct
2. The API key has not expired
3. The n8n instance is configured to accept API key authentication

#### Deployment Failed

If the deployment fails, check:

1. The workflow JSON file is valid
2. The n8n instance is running and accessible
3. The CI/CD logs for specific error messages

### Debugging

To debug deployment issues:

1. Run the update script manually with verbose output:

```bash
NODE_DEBUG=http,https node update-workflow.js your-workflow-id product-creation-workflow.json https://n8n.example.com your-api-key
```

2. Check the n8n logs for errors:

```bash
docker logs n8n
```

3. Verify the workflow JSON file is valid:

```bash
jq . product-creation-workflow.json
```

## Additional Resources

- [n8n API Documentation](https://docs.n8n.io/api/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [n8n Workflow Deployment Best Practices](https://docs.n8n.io/hosting/deployment/)

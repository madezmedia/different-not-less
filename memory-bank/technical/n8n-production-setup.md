# n8n Production Setup for Different Not Less

## Overview

This document outlines the production setup for n8n workflow automation server used by Different Not Less Apparel. n8n is a critical component of our infrastructure, handling automated product creation, inventory management, and integration between various services.

## Server Requirements

### Hardware Recommendations
- **CPU**: 2+ cores
- **RAM**: 4GB minimum (8GB recommended)
- **Storage**: 20GB minimum (SSD preferred)
- **Network**: Reliable connection with static IP

### Software Requirements
- **OS**: Ubuntu 20.04 LTS or newer
- **Docker**: 20.10.x or newer
- **Docker Compose**: 2.x or newer
- **Node.js**: 16.x or newer (if running without Docker)

## Deployment Options

### Option 1: Docker Deployment (Recommended)
Using Docker provides isolation, easier updates, and consistent environments.

#### Setup Steps
1. Install Docker and Docker Compose on the server
2. Clone the repository or copy the Docker Compose file
3. Create the `.env` file with production credentials
4. Start the container with `docker-compose up -d`
5. Configure reverse proxy for secure access

### Option 2: PaaS Deployment
For teams without dedicated DevOps resources, a Platform as a Service solution may be preferable.

#### Recommended Providers
- **Heroku**: Easy deployment with container registry
- **Digital Ocean App Platform**: Simple scaling and management
- **Render**: Automatic TLS and easy environment configuration

#### Setup Steps
1. Create an account with the chosen provider
2. Configure the deployment using the Dockerfile
3. Set up environment variables
4. Deploy the application
5. Configure custom domain if needed

### Option 3: Bare Metal Installation
Direct installation on a server without containerization.

#### Setup Steps
1. Install Node.js and npm
2. Install n8n globally: `npm install -g n8n`
3. Configure environment variables
4. Start n8n with `n8n start`
5. Set up process manager (PM2) for reliability

## Environment Configuration

Create a `.env` file in the n8n directory with the following variables:

```
# n8n Configuration
N8N_ENCRYPTION_KEY=your-secure-encryption-key
N8N_HOST=your-n8n-hostname
N8N_PORT=5678
N8N_PROTOCOL=https
N8N_SSL_KEY=/path/to/ssl/key.pem
N8N_SSL_CERT=/path/to/ssl/cert.pem

# API Credentials
WEBHOOK_API_KEY=your-secure-webhook-key
FALAI_API_KEY=your-falai-api-key
PRINTIFY_API_KEY=your-printify-api-key
PRINTIFY_SHOP_ID=your-printify-shop-id
AIRTABLE_API_KEY=your-airtable-api-key
AIRTABLE_BASE_ID=your-airtable-base-id

# Authentication (Production)
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=secure-password
```

## Security Best Practices

### Authentication
- Enable basic authentication for the n8n interface
- Use strong, unique passwords
- Consider implementing IP restrictions for admin access

### API Security
- Generate unique API keys for each integration
- Implement rate limiting on webhook endpoints
- Validate webhook requests with signatures or tokens

### Data Protection
- Use encryption for sensitive data
- Regularly rotate encryption keys and credentials
- Implement least privilege access for all integrations

### Network Security
- Place n8n behind a reverse proxy (Nginx, Traefik)
- Enable HTTPS with valid SSL certificates
- Configure proper HTTP security headers

## Webhook Configuration

### Endpoint Structure
- **Base URL**: https://your-n8n-domain.com/
- **Webhook Path**: /webhook/product-creation
- **Authentication**: API key in header

### Example Webhook Configuration
```
URL: https://your-n8n-domain.com/webhook/product-creation
Method: POST
Headers:
  - X-API-Key: your-webhook-api-key
  - Content-Type: application/json
```

### Testing Webhooks
- Use tools like Postman or curl to test webhook endpoints
- Verify authentication is working correctly
- Check that payloads are properly processed

## Workflow Management

### Importing Workflows
1. Access the n8n web interface
2. Navigate to Workflows
3. Click "Import from File"
4. Select the workflow JSON file
5. Review and activate the workflow

### Workflow Backup
- Regularly export workflows to JSON files
- Store backups in version control
- Document any manual changes to workflows

### Workflow Versioning
- Use semantic versioning for workflows
- Document changes in workflow descriptions
- Consider using tags for production vs. development workflows

## Monitoring & Maintenance

### Health Checks
- Set up regular health checks to verify n8n is running
- Monitor webhook response times and error rates
- Configure alerts for failed executions

### Logging
- Enable detailed logging in production
- Forward logs to a centralized logging system
- Implement log rotation to manage disk space

### Backup Procedures
- Daily backup of workflow data
- Backup of environment configuration
- Regular testing of restore procedures

### Update Procedures
1. Review release notes for breaking changes
2. Test updates in staging environment
3. Backup current production setup
4. Apply updates during maintenance window
5. Verify all workflows are functioning correctly

## Disaster Recovery

### Failover Strategy
- Document manual failover procedures
- Consider setting up a standby instance
- Ensure all credentials are securely stored for quick recovery

### Recovery Steps
1. Restore from latest backup
2. Verify environment configuration
3. Test critical workflows
4. Update DNS/routing if needed
5. Verify integrations are functioning

## Troubleshooting

### Common Issues
- **Webhook Failures**: Check authentication and payload format
- **Integration Errors**: Verify API credentials and endpoints
- **Performance Issues**: Check resource utilization and scaling needs

### Diagnostic Tools
- n8n execution logs
- Docker container logs
- System resource monitoring

## Contact Information

- **Primary DevOps Contact**: [Name, Email]
- **Secondary Contact**: [Name, Email]
- **Emergency Support**: [Contact Information]

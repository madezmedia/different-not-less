# n8n Deployment Setup

## Docker Compose Configuration

Our deployment uses Docker Compose to manage all services. The configuration is as follows:

```yaml
version: '3'
services:
  # Next.js application
  nextjs:
    build:
      context: .
      dockerfile: Dockerfile.nextjs
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - SANITY_PROJECT_ID=${SANITY_PROJECT_ID}
      - SANITY_DATASET=${SANITY_DATASET}
      # Other environment variables
    volumes:
      - ./data:/app/data
    networks:
      - app-network

  # Sanity Studio
  sanity-studio:
    build:
      context: ./studio
      dockerfile: Dockerfile.sanity
    ports:
      - "3333:3333"
    environment:
      - SANITY_STUDIO_API_PROJECT_ID=${SANITY_PROJECT_ID}
      - SANITY_STUDIO_API_DATASET=${SANITY_DATASET}
    volumes:
      - ./studio:/app
    networks:
      - app-network

  # n8n workflow automation
  n8n:
    image: n8nio/n8n:latest
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_HOST=n8n
      - N8N_PORT=5678
      - N8N_PROTOCOL=http
      - N8N_ENCRYPTION_KEY=${N8N_ENCRYPTION_KEY}
      - WEBHOOK_URL=http://n8n:5678/
      # API credentials
      - FALAI_API_KEY=${FALAI_API_KEY}
      - PRINTIFY_API_KEY=${PRINTIFY_API_KEY}
      - PRINTIFY_SHOP_ID=${PRINTIFY_SHOP_ID}
      - AIRTABLE_API_KEY=${AIRTABLE_API_KEY}
      - AIRTABLE_BASE_ID=${AIRTABLE_BASE_ID}
      - SANITY_PROJECT_ID=${SANITY_PROJECT_ID}
      - SANITY_DATASET=${SANITY_DATASET}
      - SANITY_TOKEN=${SANITY_TOKEN}
    volumes:
      - ./n8n-data:/home/node/.n8n
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

## Environment Variables

The following environment variables need to be added to your `.env.local` file:

```
# n8n configuration
N8N_ENCRYPTION_KEY=your-secure-encryption-key

# API credentials
FALAI_API_KEY=your-falai-api-key
PRINTIFY_API_KEY=your-printify-api-key
PRINTIFY_SHOP_ID=your-printify-shop-id
```

## CI/CD Integration

Update to GitHub Actions workflow (`.github/workflows/cd-production.yml`):

```yaml
# Additional steps for n8n deployment
- name: Deploy n8n to production server
  run: |
    # Deploy n8n using SSH
    ssh ${{ secrets.DEPLOY_USER }}@${{ secrets.DEPLOY_HOST }} << 'ENDSSH'
      cd /path/to/different-not-less
      docker-compose pull n8n
      docker-compose up -d n8n
    ENDSSH
```

## Dockerfiles

### Next.js Dockerfile (Dockerfile.nextjs)

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
```

### Sanity Studio Dockerfile (Dockerfile.sanity)

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]
```

## Backup Procedures

1. **n8n Workflows**:
   ```bash
   # Export all workflows
   docker exec -it n8n n8n export:workflow --all --output=/home/node/.n8n/backups/workflows_$(date +%Y%m%d).json
   
   # Copy to backup location
   docker cp n8n:/home/node/.n8n/backups /path/to/backup/location
   ```

2. **n8n Credentials**:
   ```bash
   # Export all credentials (encrypted)
   docker exec -it n8n n8n export:credentials --all --output=/home/node/.n8n/backups/credentials_$(date +%Y%m%d).json
   
   # Copy to backup location
   docker cp n8n:/home/node/.n8n/backups /path/to/backup/location
   ```

## Monitoring Setup

1. **Healthcheck Endpoint**:
   - URL: http://n8n:5678/healthz
   - Expected response: HTTP 200

2. **Log Monitoring**:
   ```bash
   # View n8n logs
   docker logs -f n8n
   ```

3. **Resource Monitoring**:
   ```bash
   # Check container stats
   docker stats n8n
   ```

## Security Considerations

1. **Network Security**:
   - Use internal Docker network for service communication
   - Expose only necessary ports to the host
   - Configure firewall rules to restrict access

2. **Authentication**:
   - Set up n8n with username/password authentication
   - Use strong, unique passwords
   - Consider implementing IP-based access restrictions

3. **API Key Management**:
   - Store API keys as environment variables
   - Rotate keys regularly
   - Use least privilege principle for all API accounts

4. **Data Protection**:
   - Encrypt sensitive data at rest
   - Implement TLS for all communications
   - Regular security audits

## Installation Steps

1. **Prepare Environment**:
   ```bash
   # Install Docker and Docker Compose
   sudo apt-get update
   sudo apt-get install -y docker.io docker-compose
   
   # Create project directory
   mkdir -p /opt/different-not-less
   cd /opt/different-not-less
   ```

2. **Create Configuration Files**:
   ```bash
   # Create docker-compose.yml
   nano docker-compose.yml
   # Paste the configuration from above
   
   # Create .env file
   nano .env
   # Add environment variables
   ```

3. **Create Dockerfiles**:
   ```bash
   # Create Next.js Dockerfile
   nano Dockerfile.nextjs
   # Paste the configuration from above
   
   # Create Sanity Studio Dockerfile
   mkdir -p studio
   nano studio/Dockerfile.sanity
   # Paste the configuration from above
   ```

4. **Start Services**:
   ```bash
   # Start all services
   docker-compose up -d
   
   # Check status
   docker-compose ps
   ```

5. **Initial Configuration**:
   - Access n8n at http://your-server:5678
   - Set up admin user and password
   - Import initial workflows

## Troubleshooting

1. **Container Fails to Start**:
   ```bash
   # Check logs
   docker-compose logs n8n
   
   # Check environment variables
   docker-compose config
   ```

2. **Webhook Issues**:
   - Verify network connectivity
   - Check webhook URL configuration
   - Ensure proper port forwarding

3. **API Connection Problems**:
   - Validate API credentials
   - Check for rate limiting
   - Verify network access to external services

4. **Performance Issues**:
   - Monitor resource usage
   - Check for memory leaks
   - Consider scaling resources

## Maintenance Procedures

1. **Regular Updates**:
   ```bash
   # Update n8n image
   docker-compose pull n8n
   docker-compose up -d n8n
   ```

2. **Workflow Backups**:
   ```bash
   # Set up cron job for daily backups
   0 2 * * * /path/to/backup-script.sh
   ```

3. **Log Rotation**:
   ```bash
   # Configure Docker log rotation
   sudo nano /etc/docker/daemon.json
   # Add log configuration
   ```

4. **Health Checks**:
   - Set up monitoring for the health endpoint
   - Configure alerts for failures
   - Implement automatic recovery procedures

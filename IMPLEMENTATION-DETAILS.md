# CI/CD Implementation Details

This document provides detailed specifications for each file that will be created in the CI/CD pipeline.

## 1. Dockerfile

**Purpose**: Multi-stage build for optimized Next.js production deployment with Nginx

**Key Features**:
- Stage 1: Build Next.js app with Node.js 20
- Stage 2: Serve with Nginx alpine
- Optimized for production with standalone output
- Security: Non-root user
- Size: ~50MB final image

**Structure**:
```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
- Set working directory
- Copy package files
- Install dependencies (npm ci)
- Copy source code
- Build Next.js app (npm run build)
- Generate standalone output

# Stage 2: Production
FROM nginx:alpine
- Copy built files from builder
- Copy nginx configuration
- Expose port 80
- Start nginx
```

---

## 2. nginx.conf

**Purpose**: Configure Nginx to serve Next.js static files and handle SPA routing

**Key Features**:
- Gzip compression enabled
- Cache headers for static assets
- SPA fallback routing (all routes → index.html)
- Security headers
- Access logging

**Configuration Sections**:
- Server block listening on port 80
- Root directory: /usr/share/nginx/html
- Index file: index.html
- Location blocks for static assets
- Try_files directive for SPA routing
- Gzip settings
- Cache control headers

---

## 3. docker-compose.yml

**Purpose**: Orchestrate container deployment on VPS

**Configuration**:
```yaml
version: '3.8'
services:
  web:
    image: ${DOCKER_IMAGE_NAME}:latest
    container_name: vysio-landing
    ports:
      - "80:80"
    restart: always
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"
```

**Features**:
- Port mapping: 80:80
- Auto-restart on failure
- Log rotation (10MB, 3 files)
- Environment variable support
- Container naming for easy management

---

## 4. .dockerignore

**Purpose**: Exclude unnecessary files from Docker build context

**Excluded Items**:
- node_modules/
- .next/
- .git/
- .env*.local
- npm-debug.log*
- README.md
- .vscode/
- .DS_Store
- coverage/
- .github/

**Benefits**:
- Faster build times
- Smaller build context
- Improved security (no secrets in image)

---

## 5. .github/workflows/deploy.yml

**Purpose**: Automated CI/CD pipeline triggered on push to master

**Workflow Structure**:

```yaml
name: Deploy to VPS

on:
  push:
    branches: [master]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      1. Checkout code
      2. Setup Node.js 20
      3. Install dependencies (npm ci)
      4. Run linting (npm run lint)
      5. Build application (npm run build)
      6. Login to Docker Hub
      7. Build Docker image
      8. Push to Docker Hub
      9. Deploy to VPS via SSH
```

**Key Steps Explained**:

### Step 1-3: Setup & Dependencies
- Checkout repository
- Setup Node.js environment
- Install dependencies with clean install

### Step 4-5: Quality Checks
- Run ESLint for code quality
- Build Next.js app to verify no build errors

### Step 6-8: Docker Build & Push
- Authenticate with Docker Hub
- Build multi-stage Docker image
- Tag with commit SHA and 'latest'
- Push to Docker Hub registry

### Step 9: VPS Deployment
- SSH to VPS using private key
- Navigate to deployment directory
- Pull latest Docker image
- Deploy with docker-compose
- Verify deployment success

**Environment Variables Used**:
- `DOCKER_USERNAME`: Docker Hub username
- `DOCKER_PASSWORD`: Docker Hub password/token
- `VPS_HOST`: VPS IP or domain
- `VPS_USERNAME`: SSH username
- `VPS_SSH_KEY`: Private SSH key
- `DOCKER_IMAGE_NAME`: Full image name

---

## 6. github-secrets-template.md

**Purpose**: Guide for setting up GitHub repository secrets

**Content Structure**:

### Required Secrets
1. **DOCKER_USERNAME**
   - Description: Docker Hub username
   - How to get: Your Docker Hub account username
   - Example: `johndoe`

2. **DOCKER_PASSWORD**
   - Description: Docker Hub access token
   - How to get: Docker Hub → Account Settings → Security → New Access Token
   - Example: `dckr_pat_xxxxxxxxxxxxx`

3. **VPS_HOST**
   - Description: VPS IP address or domain
   - How to get: From your VPS provider
   - Example: `123.45.67.89` or `vysio.example.com`

4. **VPS_USERNAME**
   - Description: SSH username
   - How to get: From your VPS setup
   - Example: `root` or `ubuntu`

5. **VPS_SSH_KEY**
   - Description: Private SSH key for authentication
   - How to get: Generate with `ssh-keygen` or use existing key
   - Format: Full private key including headers

6. **DOCKER_IMAGE_NAME**
   - Description: Full Docker image name
   - Format: `username/repository-name`
   - Example: `johndoe/vysio-landing`

### Setup Instructions
- Step-by-step guide to add secrets in GitHub
- Security best practices
- Troubleshooting common issues

---

## 7. deploy.sh

**Purpose**: VPS-side deployment script for manual or automated deployment

**Script Functions**:

```bash
#!/bin/bash

1. Configuration
   - Set variables (image name, container name)
   - Color codes for output

2. Pre-deployment checks
   - Verify Docker is installed
   - Check docker-compose is available
   - Verify deployment directory exists

3. Pull latest image
   - docker-compose pull
   - Verify pull success

4. Stop old container
   - docker-compose down
   - Wait for graceful shutdown

5. Start new container
   - docker-compose up -d
   - Wait for startup

6. Health check
   - Verify container is running
   - Check port 80 is accessible
   - Test HTTP response

7. Cleanup
   - Remove old/unused images
   - docker image prune

8. Report status
   - Success/failure message
   - Container status
   - Access URL
```

**Features**:
- Error handling and rollback
- Colored output for readability
- Health checks before completion
- Automatic cleanup of old images
- Logging of deployment events

---

## 8. DEPLOYMENT.md

**Purpose**: Comprehensive deployment documentation for team members

**Sections**:

### 1. Prerequisites
- Docker & Docker Compose installation
- GitHub account with repository access
- Docker Hub account
- VPS with SSH access
- Domain name (optional)

### 2. Initial Setup
- Clone repository
- Install dependencies
- Configure environment variables
- Setup GitHub secrets

### 3. GitHub Actions Setup
- Navigate to repository settings
- Add required secrets
- Enable Actions
- Verify workflow file

### 4. VPS Setup
- SSH to VPS
- Install Docker & Docker Compose
- Create deployment directory
- Setup SSH keys
- Configure firewall

### 5. First Deployment
- Push to master branch
- Monitor GitHub Actions
- Verify deployment on VPS
- Test application access

### 6. Manual Deployment
- SSH to VPS
- Run deployment script
- Verify success

### 7. Monitoring & Maintenance
- View logs
- Check container status
- Update application
- Rollback procedures

### 8. Troubleshooting
- Common issues and solutions
- Debug commands
- Log locations
- Support contacts

### 9. Security Best Practices
- SSH key management
- Secret rotation
- Firewall configuration
- Regular updates

---

## 9. .gitignore Updates

**Purpose**: Ensure deployment-specific files are not committed

**Additions**:
```
# Deployment
deploy.sh.local
docker-compose.override.yml
.env.production
*.pem
*.key

# Docker
.dockerignore.local
```

---

## Implementation Order

1. ✅ Create CI-CD-PLAN.md (completed)
2. ✅ Create IMPLEMENTATION-DETAILS.md (this file)
3. ⏳ Create .dockerignore
4. ⏳ Create Dockerfile
5. ⏳ Create nginx.conf
6. ⏳ Create docker-compose.yml
7. ⏳ Create .github/workflows/deploy.yml
8. ⏳ Create github-secrets-template.md
9. ⏳ Create deploy.sh
10. ⏳ Create DEPLOYMENT.md
11. ⏳ Update .gitignore

---

## Testing Strategy

### Local Testing
1. Build Docker image locally
2. Run container on port 8080
3. Verify application loads
4. Test all routes

### CI/CD Testing
1. Create test branch
2. Push changes
3. Verify workflow runs
4. Check build logs

### VPS Testing
1. Deploy to staging (if available)
2. Run health checks
3. Test performance
4. Verify logs

---

## Success Criteria

- ✅ Docker image builds successfully
- ✅ GitHub Actions workflow completes without errors
- ✅ Application deploys to VPS automatically
- ✅ Application accessible on port 80
- ✅ All routes work correctly
- ✅ Logs are accessible
- ✅ Rollback procedure works
- ✅ Documentation is clear and complete

---

**Ready for Implementation**: Yes
**Estimated Time**: 2 hours
**Complexity**: Medium
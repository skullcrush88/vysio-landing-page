# CI/CD Pipeline Implementation Plan

## Overview
This document outlines the complete CI/CD pipeline for the Vysio Landing Page Next.js application using GitHub Actions, Docker, and VPS deployment.

## Architecture

```mermaid
graph LR
    A[Developer Push to Master] --> B[GitHub Actions Triggered]
    B --> C[Install Dependencies]
    C --> D[Run Linting]
    D --> E[Build Next.js App]
    E --> F[Build Docker Image]
    F --> G[Push to Docker Hub]
    G --> H[SSH to VPS]
    H --> I[Pull Docker Image]
    I --> J[Deploy with Docker Compose]
    J --> K[Nginx Serves on Port 80]
```

## Pipeline Stages

### Stage 1: GitHub Actions Workflow
**Trigger**: Push to `master` branch

**Steps**:
1. **Checkout Code**: Clone repository
2. **Setup Node.js**: Install Node.js 20.x
3. **Install Dependencies**: Run `npm ci` for clean install
4. **Run Linting**: Execute `npm run lint` for code quality
5. **Build Application**: Run `npm run build` to verify production build
6. **Build Docker Image**: Create optimized Docker image with Nginx
7. **Push to Docker Hub**: Upload image to registry
8. **Deploy to VPS**: SSH and trigger deployment

### Stage 2: Docker Build Strategy
**Multi-stage Build**:

1. **Builder Stage** (Node.js 20-alpine):
   - Install dependencies
   - Build Next.js application
   - Generate static export or standalone output

2. **Production Stage** (Nginx alpine):
   - Copy built files from builder
   - Configure Nginx to serve static files
   - Expose port 80
   - Lightweight final image (~50MB)

### Stage 3: VPS Deployment
**Deployment Process**:

1. **Pull Latest Image**: Download from Docker Hub
2. **Stop Old Container**: Gracefully stop existing container
3. **Start New Container**: Launch with docker-compose
4. **Health Check**: Verify application is running
5. **Cleanup**: Remove old images

## File Structure

```
vysio-landing-page/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions workflow
├── Dockerfile                       # Multi-stage Docker build
├── docker-compose.yml              # VPS deployment config
├── nginx.conf                      # Nginx server configuration
├── .dockerignore                   # Docker build exclusions
├── deploy.sh                       # VPS deployment script
├── github-secrets-template.md      # Secrets configuration guide
└── DEPLOYMENT.md                   # Deployment documentation
```

## Required GitHub Secrets

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `DOCKER_USERNAME` | Docker Hub username | `your-dockerhub-username` |
| `DOCKER_PASSWORD` | Docker Hub password/token | `dckr_pat_xxxxx` |
| `VPS_HOST` | VPS IP address or domain | `123.45.67.89` |
| `VPS_USERNAME` | SSH username | `root` or `ubuntu` |
| `VPS_SSH_KEY` | Private SSH key | `-----BEGIN RSA PRIVATE KEY-----...` |
| `DOCKER_IMAGE_NAME` | Docker image name | `username/vysio-landing` |

## Docker Configuration

### Dockerfile Features
- **Multi-stage build** for minimal image size
- **Next.js standalone output** for optimized production
- **Nginx** for high-performance static file serving
- **Security**: Non-root user, minimal attack surface
- **Caching**: Optimized layer caching for faster builds

### Docker Compose Features
- **Port mapping**: 80:80 for web traffic
- **Restart policy**: Always restart on failure
- **Container naming**: Consistent naming for management
- **Network**: Bridge network for isolation
- **Logging**: JSON file driver with size limits

### Nginx Configuration
- **Gzip compression** for faster load times
- **Cache headers** for static assets
- **SPA routing** support (fallback to index.html)
- **Security headers** (X-Frame-Options, etc.)
- **Access logs** for monitoring

## Deployment Workflow

### Automatic Deployment (Push to Master)
```bash
git add .
git commit -m "feat: add new feature"
git push origin master
# GitHub Actions automatically deploys
```

### Manual Deployment (VPS)
```bash
# SSH to VPS
ssh user@your-vps-ip

# Navigate to project directory
cd /opt/vysio-landing

# Pull and deploy
docker-compose pull
docker-compose up -d

# View logs
docker-compose logs -f
```

## Monitoring & Maintenance

### Health Checks
- **Application**: Check if container is running
- **Nginx**: Verify port 80 is accessible
- **Logs**: Monitor for errors

### Commands
```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs -f

# Restart application
docker-compose restart

# Stop application
docker-compose down

# Remove old images
docker image prune -a
```

## Rollback Strategy

### Quick Rollback
```bash
# On VPS
docker-compose down
docker pull username/vysio-landing:previous-tag
docker-compose up -d
```

### GitHub Actions Rollback
1. Revert commit in GitHub
2. Push to master
3. Pipeline automatically deploys previous version

## Security Considerations

1. **SSH Keys**: Use dedicated deployment keys with limited permissions
2. **Docker Hub**: Use access tokens instead of passwords
3. **Secrets**: Never commit secrets to repository
4. **VPS**: Configure firewall (UFW) to allow only ports 22, 80, 443
5. **Updates**: Regularly update base images and dependencies

## Performance Optimization

1. **Docker Layer Caching**: Optimize Dockerfile layer order
2. **Multi-stage Build**: Reduce final image size
3. **Nginx Caching**: Configure browser and proxy caching
4. **Gzip Compression**: Enable for all text-based assets
5. **CDN**: Consider CloudFlare for static assets (future)

## Troubleshooting

### Build Fails
- Check Node.js version compatibility
- Verify all dependencies are in package.json
- Review build logs in GitHub Actions

### Deployment Fails
- Verify SSH credentials are correct
- Check VPS disk space: `df -h`
- Ensure Docker is running: `systemctl status docker`

### Application Not Accessible
- Check container status: `docker-compose ps`
- Verify port 80 is not in use: `netstat -tulpn | grep :80`
- Check Nginx logs: `docker-compose logs nginx`

## Future Enhancements

1. **SSL/TLS**: Add Let's Encrypt certificates
2. **Blue-Green Deployment**: Zero-downtime deployments
3. **Monitoring**: Add Prometheus + Grafana
4. **Backup**: Automated backup strategy
5. **Staging Environment**: Separate staging deployment
6. **Testing**: Add E2E tests with Playwright
7. **CDN**: Integrate CloudFlare or AWS CloudFront

## Cost Estimation

- **GitHub Actions**: Free for public repos (2000 min/month)
- **Docker Hub**: Free tier (1 private repo)
- **VPS**: $5-20/month depending on provider
- **Domain**: $10-15/year (optional)
- **SSL**: Free with Let's Encrypt

## Timeline

| Task | Estimated Time |
|------|----------------|
| Create Docker files | 30 minutes |
| Setup GitHub Actions | 30 minutes |
| Configure VPS | 30 minutes |
| Testing & Documentation | 30 minutes |
| **Total** | **2 hours** |

## Next Steps

1. Review this plan and approve
2. Switch to Code mode to implement
3. Test deployment pipeline
4. Configure GitHub secrets
5. Deploy to production

---

**Status**: Ready for implementation
**Last Updated**: 2026-05-02
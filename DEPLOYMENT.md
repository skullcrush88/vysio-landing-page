# Deployment Guide - Vysio Landing Page

Complete guide for deploying your Next.js application using GitHub Actions, Docker, and VPS.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [Detailed Setup](#detailed-setup)
4. [SSL/HTTPS Setup](#sslhttps-setup)
5. [Monitoring & Maintenance](#monitoring--maintenance)
6. [Troubleshooting](#troubleshooting)
7. [Advanced Configuration](#advanced-configuration)

---

## Prerequisites

### Required Accounts & Services

- ✅ **GitHub Account** - For repository and CI/CD
- ✅ **Docker Hub Account** - For Docker image storage ([Sign up](https://hub.docker.com/signup))
- ✅ **VPS Server** - DigitalOcean, Linode, AWS EC2, etc.
- ✅ **Domain Name** (Optional) - For SSL/HTTPS

### Required Software on VPS

- Docker (20.10+)
- Docker Compose (2.0+)
- Git
- Curl

### Local Development

- Node.js 20+
- npm or yarn
- Git

---

## Quick Start

### 1. Setup GitHub Secrets (5 minutes)

Go to your repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add these 6 secrets:

```
DOCKER_USERNAME     = your-dockerhub-username
DOCKER_PASSWORD     = your-dockerhub-access-token
VPS_HOST           = 123.45.67.89
VPS_USERNAME       = root
VPS_SSH_KEY        = -----BEGIN RSA PRIVATE KEY-----...
DOCKER_IMAGE_NAME  = username/vysio-landing
```

📖 **Detailed guide**: See [github-secrets-template.md](github-secrets-template.md)

### 2. Prepare VPS (10 minutes)

SSH to your VPS and run:

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installations
docker --version
docker-compose --version

# Create deployment directory
sudo mkdir -p /opt/vysio-landing
sudo chown $USER:$USER /opt/vysio-landing
cd /opt/vysio-landing

# Create docker-compose.yml
cat > docker-compose.yml << 'EOF'
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
EOF

# Configure firewall
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS (for SSL later)
sudo ufw enable
```

### 3. Deploy! (2 minutes)

Push to master branch:

```bash
git add .
git commit -m "feat: setup CI/CD pipeline"
git push origin master
```

**Monitor deployment**: Go to **Actions** tab in GitHub

**Access your app**: `http://YOUR_VPS_IP`

---

## Detailed Setup

### Step 1: Docker Hub Setup

1. Go to [Docker Hub](https://hub.docker.com/)
2. Sign in or create account
3. Click **Create Repository**
4. Name: `vysio-landing`
5. Visibility: Public or Private
6. Click **Create**

### Step 2: Generate Docker Hub Access Token

1. Go to **Account Settings** → **Security**
2. Click **New Access Token**
3. Description: `GitHub Actions`
4. Permissions: **Read, Write, Delete**
5. Click **Generate**
6. **Copy the token** (you won't see it again!)

### Step 3: Setup SSH Key for VPS

#### Option A: Use Existing Key

```bash
# View your private key
cat ~/.ssh/id_rsa
```

#### Option B: Generate New Key

```bash
# Generate new SSH key
ssh-keygen -t rsa -b 4096 -C "github-actions@vysio"

# Save to: ~/.ssh/github_actions_key
# Passphrase: (leave empty)

# Copy public key to VPS
ssh-copy-id -i ~/.ssh/github_actions_key.pub user@your-vps-ip

# View private key (for GitHub secret)
cat ~/.ssh/github_actions_key
```

### Step 4: Configure GitHub Secrets

See [github-secrets-template.md](github-secrets-template.md) for detailed instructions.

### Step 5: VPS Directory Structure

```
/opt/vysio-landing/
├── docker-compose.yml       # Created manually
├── certbot/                 # Created by SSL setup
│   ├── conf/
│   └── www/
└── (other files created by deployment)
```

### Step 6: First Deployment

1. Commit all changes
2. Push to master branch
3. GitHub Actions will:
   - Install dependencies
   - Run linting
   - Build Next.js app
   - Build Docker image
   - Push to Docker Hub
   - Deploy to VPS

4. Monitor in **Actions** tab
5. Check deployment logs
6. Access your site

---

## SSL/HTTPS Setup

### Prerequisites

- ✅ Domain name registered
- ✅ DNS A record pointing to VPS IP
- ✅ Basic HTTP deployment working

### Quick SSL Setup

1. **SSH to VPS**:
   ```bash
   ssh user@your-vps-ip
   cd /opt/vysio-landing
   ```

2. **Download SSL files**:
   ```bash
   # Download nginx-ssl.conf
   curl -O https://raw.githubusercontent.com/YOUR_REPO/master/nginx-ssl.conf
   
   # Download docker-compose.ssl.yml
   curl -O https://raw.githubusercontent.com/YOUR_REPO/master/docker-compose.ssl.yml
   
   # Download setup script
   curl -O https://raw.githubusercontent.com/YOUR_REPO/master/setup-ssl.sh
   chmod +x setup-ssl.sh
   ```

3. **Run SSL setup**:
   ```bash
   ./setup-ssl.sh
   ```

4. **Follow prompts**:
   - Enter domain name
   - Enter email address
   - Confirm details

5. **Done!** Access via `https://your-domain.com`

### Manual SSL Setup

See [SSL-SETUP-GUIDE.md](SSL-SETUP-GUIDE.md) for detailed instructions.

---

## Monitoring & Maintenance

### View Logs

```bash
# All logs
docker-compose logs -f

# Last 100 lines
docker-compose logs --tail 100

# Specific service
docker-compose logs -f web
```

### Check Container Status

```bash
# List running containers
docker-compose ps

# Detailed status
docker ps -a

# Resource usage
docker stats vysio-landing
```

### Restart Application

```bash
# Restart container
docker-compose restart

# Stop and start
docker-compose down
docker-compose up -d

# Pull latest and restart
docker-compose pull
docker-compose up -d
```

### Manual Deployment

```bash
# SSH to VPS
ssh user@your-vps-ip
cd /opt/vysio-landing

# Run deployment script
./deploy.sh
```

### Health Checks

```bash
# Check if container is running
docker ps | grep vysio-landing

# Test HTTP endpoint
curl http://localhost/health

# Test HTTPS endpoint (if SSL enabled)
curl https://your-domain.com/health
```

### Disk Space Management

```bash
# Check disk usage
df -h

# Remove old Docker images
docker image prune -a

# Remove unused containers
docker container prune

# Remove everything unused
docker system prune -a
```

---

## Troubleshooting

### Deployment Fails in GitHub Actions

**Check logs**:
1. Go to **Actions** tab
2. Click failed workflow
3. Review error messages

**Common issues**:

#### Build Fails
```bash
# Locally test build
npm run build

# Check for TypeScript errors
npm run lint
```

#### Docker Push Fails
- Verify `DOCKER_USERNAME` and `DOCKER_PASSWORD`
- Check Docker Hub repository exists
- Ensure access token has write permissions

#### SSH Connection Fails
```bash
# Test SSH manually
ssh -i ~/.ssh/your_key user@vps-ip

# Check VPS firewall
sudo ufw status

# Verify SSH key in authorized_keys
cat ~/.ssh/authorized_keys
```

### Container Won't Start

```bash
# Check logs
docker logs vysio-landing

# Check if port 80 is in use
sudo netstat -tulpn | grep :80

# Kill process using port 80
sudo kill -9 $(sudo lsof -t -i:80)

# Restart Docker
sudo systemctl restart docker
```

### Application Not Accessible

```bash
# Check if container is running
docker ps

# Check Nginx logs
docker logs vysio-landing

# Test locally
curl http://localhost

# Check firewall
sudo ufw status
sudo ufw allow 80
```

### SSL Certificate Issues

```bash
# Check certificate status
docker-compose exec certbot certbot certificates

# Force renewal
docker-compose exec certbot certbot renew --force-renewal

# Check Nginx config
docker-compose exec web nginx -t

# View SSL logs
docker-compose logs certbot
```

### High Memory Usage

```bash
# Check resource usage
docker stats

# Restart container
docker-compose restart

# Limit container resources (add to docker-compose.yml)
deploy:
  resources:
    limits:
      memory: 512M
```

---

## Advanced Configuration

### Environment Variables

Create `.env` file on VPS:

```bash
# /opt/vysio-landing/.env
DOCKER_IMAGE_NAME=username/vysio-landing
NODE_ENV=production
```

### Custom Nginx Configuration

Edit `nginx.conf` for custom settings:

```nginx
# Add custom headers
add_header X-Custom-Header "value";

# Increase upload size
client_max_body_size 10M;

# Custom error pages
error_page 404 /404.html;
```

### Multiple Environments

Create separate directories:

```bash
/opt/vysio-landing-staging/
/opt/vysio-landing-production/
```

### Backup Strategy

```bash
# Backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf backup_$DATE.tar.gz \
  docker-compose.yml \
  certbot/ \
  nginx.conf

# Upload to S3 or backup server
```

### Monitoring with Uptime Robot

1. Go to [UptimeRobot](https://uptimerobot.com/)
2. Add new monitor
3. Type: HTTP(s)
4. URL: `https://your-domain.com/health`
5. Interval: 5 minutes

### Log Aggregation

Use Docker logging drivers:

```yaml
# docker-compose.yml
logging:
  driver: "json-file"
  options:
    max-size: "10m"
    max-file: "3"
    labels: "production"
```

### Auto-scaling (Advanced)

For high traffic, consider:
- Docker Swarm
- Kubernetes
- Load balancer (Nginx, HAProxy)
- CDN (CloudFlare, AWS CloudFront)

---

## Security Best Practices

### 1. SSH Security

```bash
# Disable password authentication
sudo nano /etc/ssh/sshd_config
# Set: PasswordAuthentication no

# Restart SSH
sudo systemctl restart sshd
```

### 2. Firewall Configuration

```bash
# Only allow necessary ports
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 3. Regular Updates

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Update Docker images
docker-compose pull
docker-compose up -d
```

### 4. Secret Rotation

- Rotate Docker Hub tokens every 3-6 months
- Update SSH keys periodically
- Change VPS passwords regularly

### 5. Monitoring

- Enable GitHub Actions notifications
- Set up uptime monitoring
- Monitor disk space
- Review access logs regularly

---

## Useful Commands Reference

### Docker

```bash
# Build image locally
docker build -t test-image .

# Run container locally
docker run -p 8080:80 test-image

# View images
docker images

# Remove image
docker rmi image-name

# View all containers
docker ps -a

# Remove container
docker rm container-name
```

### Docker Compose

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Pull latest images
docker-compose pull

# Build and start
docker-compose up -d --build
```

### Git

```bash
# Check status
git status

# Add all changes
git add .

# Commit
git commit -m "message"

# Push to master
git push origin master

# View commit history
git log --oneline
```

### System

```bash
# Check disk space
df -h

# Check memory
free -h

# Check CPU
top

# Check network
netstat -tulpn

# Check processes
ps aux | grep docker
```

---

## Support & Resources

### Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Docker Docs](https://docs.docker.com/)
- [Nginx Docs](https://nginx.org/en/docs/)
- [Let's Encrypt Docs](https://letsencrypt.org/docs/)

### Project Documentation

- [QUICK-START.md](QUICK-START.md) - Fast deployment guide
- [CI-CD-PLAN.md](CI-CD-PLAN.md) - Architecture overview
- [SSL-SETUP-GUIDE.md](SSL-SETUP-GUIDE.md) - SSL configuration
- [github-secrets-template.md](github-secrets-template.md) - Secrets setup

### Getting Help

1. Check GitHub Actions logs
2. Review Docker logs
3. Check VPS system logs
4. Search error messages
5. Open GitHub issue

---

## Changelog

### Version 1.0.0 (2026-05-02)

- ✅ Initial CI/CD pipeline
- ✅ Docker multi-stage build
- ✅ Nginx configuration
- ✅ GitHub Actions workflow
- ✅ SSL/HTTPS support
- ✅ Automated deployment
- ✅ Health checks
- ✅ Comprehensive documentation

---

**Last Updated**: 2026-05-02  
**Maintainer**: Your Team  
**License**: MIT
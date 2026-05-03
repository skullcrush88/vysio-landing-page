# 🚀 Quick Start Guide - CI/CD Pipeline

Get your Vysio Landing Page deployed in 3 simple steps!

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- [ ] GitHub account with repository access
- [ ] Docker Hub account ([Sign up free](https://hub.docker.com/signup))
- [ ] VPS with SSH access (DigitalOcean, Linode, AWS EC2, etc.)
- [ ] Git installed locally
- [ ] (Optional) Domain name for SSL/HTTPS

## ⚡ 3-Step Deployment

### Step 1: Setup GitHub Secrets (5 minutes)

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add these 6 secrets:

```
DOCKER_USERNAME     → Your Docker Hub username
DOCKER_PASSWORD     → Your Docker Hub access token
VPS_HOST           → Your VPS IP address (e.g., 123.45.67.89)
VPS_USERNAME       → SSH username (e.g., root or ubuntu)
VPS_SSH_KEY        → Your private SSH key (entire content)
DOCKER_IMAGE_NAME  → username/vysio-landing
```

**Need help?** See [`github-secrets-template.md`](github-secrets-template.md) for detailed instructions.

### Step 2: Prepare VPS (10 minutes)

SSH to your VPS and run:

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Create deployment directory
sudo mkdir -p /opt/vysio-landing
sudo chown $USER:$USER /opt/vysio-landing

# Configure firewall
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS (for SSL later)
sudo ufw enable
```

### Step 3: Deploy! (2 minutes)

Push to master branch:

```bash
git add .
git commit -m "feat: setup CI/CD pipeline"
git push origin master
```

**That's it!** GitHub Actions will automatically:
1. ✅ Install dependencies
2. ✅ Run linting
3. ✅ Build Next.js app
4. ✅ Create Docker image
5. ✅ Push to Docker Hub
6. ✅ Deploy to your VPS

**View progress**: Go to **Actions** tab in your GitHub repository

**Access your app**: `http://YOUR_VPS_IP`

## 🔒 Optional: Add SSL/HTTPS (15 minutes)

After basic deployment works:

1. **Point your domain to VPS**:
   - Add A record: `your-domain.com` → `YOUR_VPS_IP`
   - Wait for DNS propagation (5-10 minutes)

2. **SSH to VPS and run**:
   ```bash
   cd /opt/vysio-landing
   chmod +x setup-ssl.sh
   ./setup-ssl.sh
   ```

3. **Follow prompts**:
   - Enter your domain name
   - Enter your email address
   - Wait for certificate generation

4. **Done!** Access via `https://your-domain.com`

## 📊 Verify Deployment

### Check Container Status
```bash
ssh user@your-vps-ip
docker-compose ps
```

Expected output:
```
NAME              STATUS          PORTS
vysio-landing     Up 2 minutes    0.0.0.0:80->80/tcp
```

### Check Application
```bash
curl http://YOUR_VPS_IP
# Should return HTML content
```

### Check Logs
```bash
docker-compose logs -f
```

## 🔄 Making Updates

After initial deployment, updates are automatic:

```bash
# Make your changes
git add .
git commit -m "feat: add new feature"
git push origin master

# GitHub Actions deploys automatically!
```

## 📚 Full Documentation

| Document | Purpose |
|----------|---------|
| [`DEPLOYMENT-SUMMARY.md`](DEPLOYMENT-SUMMARY.md) | Complete overview |
| [`CI-CD-PLAN.md`](CI-CD-PLAN.md) | Architecture details |
| [`IMPLEMENTATION-DETAILS.md`](IMPLEMENTATION-DETAILS.md) | Technical specs |
| [`WORKFLOW-DIAGRAM.md`](WORKFLOW-DIAGRAM.md) | Visual diagrams |
| [`SSL-SETUP-GUIDE.md`](SSL-SETUP-GUIDE.md) | SSL/HTTPS setup |
| [`DEPLOYMENT.md`](DEPLOYMENT.md) | Detailed deployment guide |

## 🆘 Troubleshooting

### Deployment Fails

**Check GitHub Actions logs**:
1. Go to **Actions** tab
2. Click on failed workflow
3. Review error messages

**Common issues**:
- ❌ Wrong secrets → Verify in Settings → Secrets
- ❌ VPS not accessible → Check firewall and SSH key
- ❌ Docker not installed → Run Step 2 again

### Can't Access Application

```bash
# Check if container is running
docker-compose ps

# Check logs for errors
docker-compose logs

# Restart container
docker-compose restart
```

### SSL Certificate Fails

```bash
# Verify DNS
dig your-domain.com

# Check port 80 is open
sudo ufw status

# Try manual certificate request
docker run -it --rm -p 80:80 \
  -v $(pwd)/certbot/conf:/etc/letsencrypt \
  certbot/certbot certonly --standalone \
  -d your-domain.com
```

## 💡 Pro Tips

1. **Test locally first**:
   ```bash
   docker build -t test-image .
   docker run -p 8080:80 test-image
   # Visit http://localhost:8080
   ```

2. **Monitor deployments**:
   - Enable GitHub Actions notifications
   - Set up email alerts for failures

3. **Keep secrets secure**:
   - Never commit secrets to repository
   - Rotate SSH keys regularly
   - Use Docker Hub access tokens (not passwords)

4. **Backup strategy**:
   ```bash
   # Backup Docker images
   docker save username/vysio-landing:latest > backup.tar
   
   # Backup certificates (if using SSL)
   tar -czf certbot-backup.tar.gz certbot/
   ```

## 📞 Need Help?

- **GitHub Actions Issues**: Check [`CI-CD-PLAN.md`](CI-CD-PLAN.md)
- **Docker Issues**: Check [`IMPLEMENTATION-DETAILS.md`](IMPLEMENTATION-DETAILS.md)
- **SSL Issues**: Check [`SSL-SETUP-GUIDE.md`](SSL-SETUP-GUIDE.md)
- **General Deployment**: Check [`DEPLOYMENT.md`](DEPLOYMENT.md)

## ✅ Success Checklist

After following this guide, you should have:

- [x] Application deployed on VPS
- [x] Accessible via HTTP
- [x] Automatic deployments on push to master
- [x] Docker container running
- [x] (Optional) SSL/HTTPS enabled
- [x] (Optional) Auto-renewing certificates

## 🎉 What's Next?

1. **Add monitoring**: Set up uptime monitoring
2. **Configure CDN**: Use CloudFlare for better performance
3. **Add staging**: Create staging environment
4. **Set up backups**: Automated backup strategy
5. **Performance tuning**: Optimize Nginx and caching

---

**Estimated Total Time**: 
- Basic HTTP: 15-20 minutes
- With SSL: 30-35 minutes

**Difficulty**: Beginner-friendly 🟢

**Cost**: $5-20/month (VPS only)

---

Ready to deploy? Start with **Step 1** above! 🚀
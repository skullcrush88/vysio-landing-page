# GitHub Secrets Configuration Guide

This document explains how to set up the required GitHub repository secrets for the CI/CD pipeline.

## Required Secrets

You need to configure **6 secrets** in your GitHub repository:

| Secret Name | Description | Required |
|-------------|-------------|----------|
| `DOCKER_USERNAME` | Docker Hub username | ✅ Yes |
| `DOCKER_PASSWORD` | Docker Hub access token | ✅ Yes |
| `VPS_HOST` | VPS IP address or domain | ✅ Yes |
| `VPS_USERNAME` | SSH username for VPS | ✅ Yes |
| `VPS_SSH_KEY` | Private SSH key | ✅ Yes |
| `DOCKER_IMAGE_NAME` | Full Docker image name | ✅ Yes |

---

## How to Add Secrets to GitHub

### Step 1: Navigate to Repository Settings

1. Go to your GitHub repository
2. Click on **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**

---

## Secret Details

### 1. DOCKER_USERNAME

**What it is**: Your Docker Hub account username

**How to get it**:
1. Go to [Docker Hub](https://hub.docker.com/)
2. Sign in to your account
3. Your username is displayed in the top-right corner

**Example**:
```
johndoe
```

**How to add**:
- Name: `DOCKER_USERNAME`
- Secret: `your-dockerhub-username`

---

### 2. DOCKER_PASSWORD

**What it is**: Docker Hub access token (NOT your password!)

**How to get it**:
1. Go to [Docker Hub](https://hub.docker.com/)
2. Sign in to your account
3. Click your username → **Account Settings**
4. Click **Security** tab
5. Click **New Access Token**
6. Give it a description (e.g., "GitHub Actions")
7. Set permissions to **Read, Write, Delete**
8. Click **Generate**
9. **Copy the token immediately** (you won't see it again!)

**Example**:
```
dckr_pat_1234567890abcdefghijklmnopqrstuvwxyz
```

**How to add**:
- Name: `DOCKER_PASSWORD`
- Secret: `dckr_pat_xxxxxxxxxxxxx` (paste your token)

**⚠️ Important**: Use access token, NOT your Docker Hub password!

---

### 3. VPS_HOST

**What it is**: Your VPS IP address or domain name

**How to get it**:
- From your VPS provider dashboard (DigitalOcean, Linode, AWS, etc.)
- Or from your domain registrar if using a domain

**Examples**:
```
123.45.67.89
```
or
```
vysio.example.com
```

**How to add**:
- Name: `VPS_HOST`
- Secret: `123.45.67.89` or `your-domain.com`

---

### 4. VPS_USERNAME

**What it is**: SSH username for your VPS

**Common values**:
- `root` (most VPS providers)
- `ubuntu` (Ubuntu servers)
- `admin` (some providers)
- Custom username you created

**How to find it**:
- Check your VPS provider's documentation
- Or try: `ssh root@your-vps-ip` (if root works, use "root")

**Example**:
```
root
```

**How to add**:
- Name: `VPS_USERNAME`
- Secret: `root` or `ubuntu` or your custom username

---

### 5. VPS_SSH_KEY

**What it is**: Private SSH key for authentication

**How to get it**:

#### Option A: Use Existing SSH Key
```bash
# View your private key
cat ~/.ssh/id_rsa

# Or if you use a different key
cat ~/.ssh/your_key_name
```

#### Option B: Generate New SSH Key
```bash
# Generate new SSH key pair
ssh-keygen -t rsa -b 4096 -C "github-actions@vysio"

# When prompted:
# - Enter file name: /home/user/.ssh/github_actions_key
# - Enter passphrase: (leave empty for no passphrase)

# View the private key
cat ~/.ssh/github_actions_key

# Copy the public key to your VPS
ssh-copy-id -i ~/.ssh/github_actions_key.pub user@your-vps-ip
```

**Format**: The key should look like this:
```
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA1234567890abcdefghijklmnopqrstuvwxyz...
(many lines of random characters)
...xyz9876543210
-----END RSA PRIVATE KEY-----
```

**How to add**:
- Name: `VPS_SSH_KEY`
- Secret: Paste the **entire private key** including the BEGIN and END lines

**⚠️ Important**: 
- Copy the **PRIVATE** key (id_rsa), NOT the public key (id_rsa.pub)
- Include the `-----BEGIN` and `-----END` lines
- Make sure the public key is added to your VPS (`~/.ssh/authorized_keys`)

---

### 6. DOCKER_IMAGE_NAME

**What it is**: Full name of your Docker image

**Format**: `dockerhub-username/repository-name`

**Example**:
```
johndoe/vysio-landing
```

**How to create**:
1. Go to [Docker Hub](https://hub.docker.com/)
2. Click **Create Repository**
3. Enter repository name: `vysio-landing`
4. Choose visibility: Public or Private
5. Click **Create**
6. Your image name is: `your-username/vysio-landing`

**How to add**:
- Name: `DOCKER_IMAGE_NAME`
- Secret: `your-dockerhub-username/vysio-landing`

---

## Quick Setup Checklist

- [ ] Created Docker Hub account
- [ ] Generated Docker Hub access token
- [ ] Created Docker Hub repository
- [ ] Have VPS IP address
- [ ] Know VPS SSH username
- [ ] Have SSH private key
- [ ] SSH key added to VPS authorized_keys
- [ ] Added all 6 secrets to GitHub

---

## Testing Your Secrets

After adding all secrets, test them:

1. Make a small change to your code
2. Commit and push to master branch:
   ```bash
   git add .
   git commit -m "test: trigger CI/CD"
   git push origin master
   ```
3. Go to **Actions** tab in GitHub
4. Watch the workflow run
5. Check for any errors

---

## Troubleshooting

### Error: "Invalid username or password"
- **Solution**: Make sure you're using an access token, not your password
- Regenerate the token if needed

### Error: "Permission denied (publickey)"
- **Solution**: 
  - Verify the private key is correct
  - Make sure the public key is in VPS `~/.ssh/authorized_keys`
  - Test SSH manually: `ssh -i ~/.ssh/your_key user@vps-ip`

### Error: "Repository not found"
- **Solution**: 
  - Check `DOCKER_IMAGE_NAME` format: `username/repo-name`
  - Verify the repository exists in Docker Hub
  - Check repository visibility (public vs private)

### Error: "Connection refused"
- **Solution**:
  - Verify `VPS_HOST` is correct
  - Check VPS firewall allows SSH (port 22)
  - Ensure VPS is running

---

## Security Best Practices

1. **Never commit secrets to Git**
   - Secrets should only be in GitHub Settings
   - Never in code or configuration files

2. **Use access tokens, not passwords**
   - Docker Hub: Use access tokens
   - Rotate tokens regularly

3. **Limit SSH key permissions**
   - Use dedicated SSH key for CI/CD
   - Consider using a non-root user

4. **Rotate secrets regularly**
   - Change tokens every 3-6 months
   - Update SSH keys periodically

5. **Monitor access logs**
   - Check GitHub Actions logs
   - Monitor VPS access logs

---

## Example: Complete Setup

Here's what your secrets should look like (with fake values):

```
DOCKER_USERNAME = johndoe
DOCKER_PASSWORD = dckr_pat_abc123xyz789
VPS_HOST = 123.45.67.89
VPS_USERNAME = root
VPS_SSH_KEY = -----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA...
-----END RSA PRIVATE KEY-----
DOCKER_IMAGE_NAME = johndoe/vysio-landing
```

---

## Need Help?

If you encounter issues:

1. Check GitHub Actions logs for error messages
2. Verify each secret is correctly formatted
3. Test SSH connection manually
4. Ensure Docker Hub repository exists
5. Review the [DEPLOYMENT.md](DEPLOYMENT.md) guide

---

**Last Updated**: 2026-05-02
#!/bin/bash

#############################################
# SSL Setup Script for Vysio Landing Page
# Sets up Let's Encrypt SSL certificates
#############################################

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  SSL/HTTPS Setup with Let's Encrypt${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Function to print colored messages
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Check if running as root or with sudo
if [ "$EUID" -ne 0 ]; then 
    print_warning "This script may need sudo privileges for some operations"
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if docker-compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "docker-compose is not installed. Please install docker-compose first."
    exit 1
fi

# Prompt for domain name
echo -e "${BLUE}Enter your domain name:${NC}"
read -p "Domain (e.g., vysio.example.com): " DOMAIN

if [ -z "$DOMAIN" ]; then
    print_error "Domain name is required"
    exit 1
fi

# Prompt for email
echo -e "\n${BLUE}Enter your email address:${NC}"
read -p "Email (for Let's Encrypt notifications): " EMAIL

if [ -z "$EMAIL" ]; then
    print_error "Email address is required"
    exit 1
fi

# Confirm details
echo -e "\n${YELLOW}Please confirm:${NC}"
echo -e "  Domain: ${GREEN}$DOMAIN${NC}"
echo -e "  Email:  ${GREEN}$EMAIL${NC}"
read -p "Continue? (y/n): " CONFIRM

if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    print_info "Setup cancelled"
    exit 0
fi

# Create certbot directories
print_info "Creating certificate directories..."
mkdir -p certbot/conf
mkdir -p certbot/www

# Stop current container
print_info "Stopping current container..."
if docker-compose down; then
    print_success "Container stopped"
else
    print_warning "No container to stop or failed to stop"
fi

# Request certificate using standalone mode
print_info "Requesting SSL certificate from Let's Encrypt..."
print_warning "This may take a few minutes..."

docker run -it --rm \
    -p 80:80 \
    -v "$(pwd)/certbot/conf:/etc/letsencrypt" \
    -v "$(pwd)/certbot/www:/var/www/certbot" \
    certbot/certbot certonly \
    --standalone \
    --email "$EMAIL" \
    --agree-tos \
    --no-eff-email \
    --force-renewal \
    -d "$DOMAIN"

# Check if certificate was obtained
if [ ! -d "certbot/conf/live/$DOMAIN" ]; then
    print_error "Failed to obtain SSL certificate"
    print_info "Please check:"
    print_info "  1. Domain DNS is pointing to this server"
    print_info "  2. Port 80 is accessible from the internet"
    print_info "  3. No firewall blocking port 80"
    exit 1
fi

print_success "SSL certificate obtained successfully!"

# Update nginx-ssl.conf with actual domain
print_info "Updating Nginx SSL configuration..."
if [ -f "nginx-ssl.conf" ]; then
    sed -i.bak "s/your-domain.com/$DOMAIN/g" nginx-ssl.conf
    print_success "Nginx configuration updated"
else
    print_error "nginx-ssl.conf not found"
    exit 1
fi

# Update docker-compose to use SSL configuration
print_info "Switching to SSL configuration..."

# Check if DOCKER_IMAGE_NAME is set
if [ -z "$DOCKER_IMAGE_NAME" ]; then
    print_warning "DOCKER_IMAGE_NAME not set, using default"
    export DOCKER_IMAGE_NAME="your-dockerhub-username/vysio-landing"
fi

# Start with SSL configuration
if docker-compose -f docker-compose.yml -f docker-compose.ssl.yml up -d; then
    print_success "Application started with SSL"
else
    print_error "Failed to start application with SSL"
    exit 1
fi

# Wait for container to be ready
print_info "Waiting for application to be ready..."
sleep 10

# Health check
print_info "Performing health check..."
if docker ps | grep -q "vysio-landing"; then
    print_success "Container is running"
else
    print_error "Container is not running"
    docker logs vysio-landing
    exit 1
fi

# Test HTTPS
print_info "Testing HTTPS connection..."
if curl -k -s -o /dev/null -w "%{http_code}" "https://$DOMAIN/health" | grep -q "200"; then
    print_success "HTTPS is working!"
else
    print_warning "HTTPS test failed, but certificate is installed"
    print_info "You may need to wait a few minutes for DNS propagation"
fi

# Display certificate information
echo -e "\n${BLUE}Certificate Information:${NC}"
docker run --rm \
    -v "$(pwd)/certbot/conf:/etc/letsencrypt" \
    certbot/certbot certificates

# Success message
echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}  SSL Setup Complete! 🎉${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "\n${BLUE}Your site is now accessible at:${NC}"
echo -e "  ${GREEN}https://$DOMAIN${NC}"
echo -e "\n${BLUE}Certificate Details:${NC}"
echo -e "  Domain:     ${YELLOW}$DOMAIN${NC}"
echo -e "  Valid for:  ${YELLOW}90 days${NC}"
echo -e "  Auto-renew: ${YELLOW}Every 12 hours${NC}"
echo -e "\n${BLUE}Useful Commands:${NC}"
echo -e "  View logs:        ${YELLOW}docker-compose logs -f${NC}"
echo -e "  Check certs:      ${YELLOW}docker-compose exec certbot certbot certificates${NC}"
echo -e "  Force renewal:    ${YELLOW}docker-compose exec certbot certbot renew --force-renewal${NC}"
echo -e "  Restart app:      ${YELLOW}docker-compose restart${NC}"
echo -e "\n${YELLOW}Note: HTTP traffic will automatically redirect to HTTPS${NC}\n"

# Made with Bob

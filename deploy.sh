#!/bin/bash

#############################################
# VPS Deployment Script for Vysio Landing
# This script pulls and deploys the latest Docker image
#############################################

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
CONTAINER_NAME="vysio-landing"
COMPOSE_FILE="docker-compose.yml"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Vysio Landing Page Deployment${NC}"
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

# Check if docker-compose.yml exists
if [ ! -f "$COMPOSE_FILE" ]; then
    print_error "docker-compose.yml not found in current directory"
    exit 1
fi

print_info "Starting deployment process..."

# Step 1: Pull latest image
print_info "Pulling latest Docker image..."
if docker-compose pull; then
    print_success "Successfully pulled latest image"
else
    print_error "Failed to pull Docker image"
    exit 1
fi

# Step 2: Stop old container
print_info "Stopping old container..."
if docker-compose down; then
    print_success "Old container stopped"
else
    print_error "Failed to stop old container"
    exit 1
fi

# Step 3: Start new container
print_info "Starting new container..."
if docker-compose up -d; then
    print_success "New container started"
else
    print_error "Failed to start new container"
    exit 1
fi

# Step 4: Wait for container to be ready
print_info "Waiting for container to be ready..."
sleep 5

# Step 5: Health check
print_info "Performing health check..."
if docker ps | grep -q "$CONTAINER_NAME"; then
    print_success "Container is running"
    
    # Check if port 80 is accessible
    if curl -s -o /dev/null -w "%{http_code}" http://localhost/health | grep -q "200"; then
        print_success "Health check passed"
    else
        print_error "Health check failed - application not responding"
        echo -e "\n${YELLOW}Container logs:${NC}"
        docker logs --tail 50 "$CONTAINER_NAME"
        exit 1
    fi
else
    print_error "Container is not running"
    echo -e "\n${YELLOW}Container logs:${NC}"
    docker logs --tail 50 "$CONTAINER_NAME"
    exit 1
fi

# Step 6: Show container status
echo -e "\n${BLUE}Container Status:${NC}"
docker ps -f name="$CONTAINER_NAME" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Step 7: Cleanup old images
print_info "Cleaning up old Docker images..."
if docker image prune -af --filter "until=24h" > /dev/null 2>&1; then
    print_success "Cleanup completed"
else
    print_info "No old images to clean up"
fi

# Step 8: Display access information
echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}  Deployment Successful! 🎉${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "\n${BLUE}Access your application at:${NC}"
echo -e "  ${YELLOW}http://$(hostname -I | awk '{print $1}')${NC}"
echo -e "\n${BLUE}Useful commands:${NC}"
echo -e "  View logs:    ${YELLOW}docker-compose logs -f${NC}"
echo -e "  Stop app:     ${YELLOW}docker-compose down${NC}"
echo -e "  Restart app:  ${YELLOW}docker-compose restart${NC}"
echo -e "  Check status: ${YELLOW}docker-compose ps${NC}"
echo -e "\n"

# Made with Bob

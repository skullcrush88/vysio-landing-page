# CI/CD Workflow Diagrams

## Complete Pipeline Flow

```mermaid
graph TB
    A[Developer Commits Code] --> B[Push to Master Branch]
    B --> C[GitHub Actions Triggered]
    
    subgraph "GitHub Actions Pipeline"
        C --> D[Checkout Repository]
        D --> E[Setup Node.js 20]
        E --> F[Install Dependencies]
        F --> G[Run ESLint]
        G --> H{Linting Passed?}
        H -->|No| I[❌ Pipeline Failed]
        H -->|Yes| J[Build Next.js App]
        J --> K{Build Success?}
        K -->|No| I
        K -->|Yes| L[Login to Docker Hub]
        L --> M[Build Docker Image]
        M --> N[Tag Image]
        N --> O[Push to Docker Hub]
        O --> P[SSH to VPS]
    end
    
    subgraph "VPS Deployment"
        P --> Q[Navigate to Deploy Dir]
        Q --> R[Pull Latest Image]
        R --> S[Stop Old Container]
        S --> T[Start New Container]
        T --> U[Health Check]
        U --> V{Healthy?}
        V -->|No| W[❌ Deployment Failed]
        V -->|Yes| X[✅ Deployment Success]
    end
    
    X --> Y[Application Live on Port 80]
    
    style C fill:#4CAF50
    style X fill:#4CAF50
    style I fill:#f44336
    style W fill:#f44336
    style Y fill:#2196F3
```

## Docker Build Process

```mermaid
graph LR
    A[Source Code] --> B[Dockerfile]
    
    subgraph "Stage 1: Builder"
        B --> C[Node.js 20 Alpine]
        C --> D[Install Dependencies]
        D --> E[Build Next.js]
        E --> F[Generate Standalone]
    end
    
    subgraph "Stage 2: Production"
        F --> G[Nginx Alpine]
        G --> H[Copy Built Files]
        H --> I[Copy Nginx Config]
        I --> J[Final Image ~50MB]
    end
    
    J --> K[Push to Docker Hub]
    K --> L[Pull on VPS]
    L --> M[Run Container]
    
    style F fill:#4CAF50
    style J fill:#2196F3
    style M fill:#FF9800
```

## VPS Deployment Architecture

```mermaid
graph TB
    subgraph "Internet"
        A[User Browser]
    end
    
    subgraph "VPS Server"
        B[Port 80]
        
        subgraph "Docker Container"
            C[Nginx]
            D[Next.js Static Files]
            C --> D
        end
        
        B --> C
    end
    
    A -->|HTTP Request| B
    D -->|HTML/CSS/JS| C
    C -->|Response| B
    B -->|Response| A
    
    style A fill:#2196F3
    style C fill:#4CAF50
    style D fill:#FF9800
```

## File Structure Overview

```mermaid
graph TB
    A[vysio-landing-page/]
    
    A --> B[.github/workflows/]
    B --> C[deploy.yml]
    
    A --> D[Docker Files]
    D --> E[Dockerfile]
    D --> F[docker-compose.yml]
    D --> G[nginx.conf]
    D --> H[.dockerignore]
    
    A --> I[Documentation]
    I --> J[CI-CD-PLAN.md]
    I --> K[IMPLEMENTATION-DETAILS.md]
    I --> L[DEPLOYMENT.md]
    I --> M[github-secrets-template.md]
    
    A --> N[Scripts]
    N --> O[deploy.sh]
    
    A --> P[Application Code]
    P --> Q[app/]
    P --> R[components/]
    P --> S[lib/]
    P --> T[public/]
    
    style C fill:#4CAF50
    style E fill:#2196F3
    style F fill:#2196F3
    style O fill:#FF9800
```

## Deployment Sequence

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant GH as GitHub
    participant GA as GitHub Actions
    participant DH as Docker Hub
    participant VPS as VPS Server
    participant App as Application
    
    Dev->>GH: Push to master
    GH->>GA: Trigger workflow
    GA->>GA: Install dependencies
    GA->>GA: Run linting
    GA->>GA: Build Next.js
    GA->>GA: Build Docker image
    GA->>DH: Push image
    GA->>VPS: SSH connect
    VPS->>DH: Pull image
    VPS->>VPS: Stop old container
    VPS->>VPS: Start new container
    VPS->>App: Deploy
    App->>VPS: Health check OK
    VPS->>GA: Deployment success
    GA->>GH: Update status
    GH->>Dev: Notify success
```

## Rollback Process

```mermaid
graph LR
    A[Deployment Issue Detected] --> B{Rollback Method?}
    
    B -->|Quick| C[VPS Manual Rollback]
    C --> D[SSH to VPS]
    D --> E[docker-compose down]
    E --> F[Pull previous tag]
    F --> G[docker-compose up]
    
    B -->|Automated| H[Git Revert]
    H --> I[Revert commit]
    I --> J[Push to master]
    J --> K[GitHub Actions]
    K --> L[Auto deploy previous version]
    
    G --> M[✅ Rollback Complete]
    L --> M
    
    style A fill:#f44336
    style M fill:#4CAF50
```

## Security Flow

```mermaid
graph TB
    A[GitHub Repository] --> B[Secrets Storage]
    
    subgraph "GitHub Secrets"
        B --> C[DOCKER_USERNAME]
        B --> D[DOCKER_PASSWORD]
        B --> E[VPS_HOST]
        B --> F[VPS_USERNAME]
        B --> G[VPS_SSH_KEY]
        B --> H[DOCKER_IMAGE_NAME]
    end
    
    subgraph "GitHub Actions"
        C --> I[Docker Login]
        D --> I
        E --> J[SSH Connection]
        F --> J
        G --> J
        H --> K[Image Tag]
    end
    
    I --> L[Push Image]
    J --> M[Deploy to VPS]
    K --> L
    
    style B fill:#f44336
    style I fill:#4CAF50
    style J fill:#4CAF50
```

## Monitoring & Logs

```mermaid
graph TB
    A[Application Running]
    
    A --> B[Docker Logs]
    A --> C[Nginx Access Logs]
    A --> D[Nginx Error Logs]
    A --> E[GitHub Actions Logs]
    
    B --> F[Container Status]
    C --> G[Traffic Analysis]
    D --> H[Error Tracking]
    E --> I[Deployment History]
    
    F --> J[Monitoring Dashboard]
    G --> J
    H --> J
    I --> J
    
    J --> K{Issues Detected?}
    K -->|Yes| L[Alert Team]
    K -->|No| M[Continue Monitoring]
    
    style A fill:#4CAF50
    style J fill:#2196F3
    style L fill:#f44336
```

## Environment Variables Flow

```mermaid
graph LR
    A[.env.local] --> B{Environment}
    
    B -->|Development| C[Local Machine]
    C --> D[npm run dev]
    
    B -->|Production| E[GitHub Secrets]
    E --> F[GitHub Actions]
    F --> G[Docker Build Args]
    G --> H[Container Env Vars]
    H --> I[Application Runtime]
    
    style A fill:#FF9800
    style E fill:#f44336
    style I fill:#4CAF50
```

## Network Architecture

```mermaid
graph TB
    subgraph "External"
        A[Internet Users]
    end
    
    subgraph "VPS Firewall"
        B[Port 22 - SSH]
        C[Port 80 - HTTP]
        D[Port 443 - HTTPS Future]
    end
    
    subgraph "Docker Network"
        E[Bridge Network]
        F[Container: vysio-landing]
    end
    
    A -->|HTTP| C
    C --> E
    E --> F
    
    G[GitHub Actions] -->|SSH| B
    B --> H[VPS Shell]
    H --> I[Docker Commands]
    I --> E
    
    style A fill:#2196F3
    style F fill:#4CAF50
    style G fill:#FF9800
```

---

## Quick Reference Commands

### GitHub Actions
```bash
# View workflow runs
gh run list

# View specific run
gh run view <run-id>

# Re-run failed workflow
gh run rerun <run-id>
```

### VPS Management
```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs -f

# Restart container
docker-compose restart

# Stop container
docker-compose down

# Start container
docker-compose up -d
```

### Docker Hub
```bash
# List images
docker images

# Remove old images
docker image prune -a

# Pull specific tag
docker pull username/vysio-landing:tag
```

---

**Legend**:
- 🟢 Green: Success/Active state
- 🔵 Blue: Process/Action
- 🟠 Orange: Warning/Manual action
- 🔴 Red: Error/Security sensitive
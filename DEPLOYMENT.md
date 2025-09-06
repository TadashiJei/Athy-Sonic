# Deployment Guide

## Prerequisites
- Node.js v18+
- Docker & Docker Compose
- MongoDB 6.0+
- Hardhat development environment
- SSL certificates (production)

## Environment Configuration

### Development Environment
```bash
# Clone and setup
git clone https://github.com/TadashiJei/Athy-Sonic.git
cd athy
npm install

# Start services
docker-compose up -d mongodb redis

# Configure environment
cp .env.example .env.development
# Edit with your settings

# Deploy contracts
npx hardhat run scripts/deploy.js --network localhost

# Start gateway
npm run start:dev
```

#### Windows (PowerShell)
```powershell
# Clone and setup
git clone https://github.com/TadashiJei/Athy-Sonic.git
Set-Location athy
npm install
    
# Start services
docker-compose up -d mongodb redis
    
# Configure environment
Copy-Item .env.example .env.development
# Edit with your settings
    
# Deploy contracts
npx hardhat run scripts/deploy.js --network localhost
    
# Start gateway
npm run start:dev
```

### Production Deployment

#### Infrastructure Requirements
- **Compute**: 4+ CPU cores, 16GB+ RAM per gateway instance
- **Storage**: SSD storage for database, network storage for fragments
- **Network**: Load balancer, CDN, DDoS protection
- **Monitoring**: Application and infrastructure monitoring

#### Docker Production Setup
```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  gateway:
    image: athy/gateway:latest
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - BLOCKCHAIN_RPC=${BLOCKCHAIN_RPC}
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '2'
          memory: 8G
```

#### Kubernetes Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: athy-gateway
spec:
  replicas: 3
  selector:
    matchLabels:
      app: athy-gateway
  template:
    spec:
      containers:
      - name: gateway
        image: athy/gateway:latest
        resources:
          requests:
            memory: "4Gi"
            cpu: "1"
          limits:
            memory: "8Gi"
            cpu: "2"
```

## Security Hardening
- Enable HTTPS/TLS encryption
- Configure firewall rules
- Set up monitoring and alerting
- Regular security updates
- Database encryption at rest

---

# Athy: Web3-Enabled, S3-Compatible Object Storage

## Overview
Athy is a decentralized object storage solution that provides secure, S3-compatible, and permissioned file storage on the blockchain. By combining NestJS for robust backend services and Hardhat for smart contract management, Athy delivers enterprise-grade decentralized storage with familiar APIs.

## Key Features
- **S3-Compatible API**: Full compatibility with existing S3 SDKs and tools
- **Data Fragmentation & Encryption**: Files are fragmented and encrypted before distribution
- **Blockchain-Based Access Control**: Immutable, transparent permission management
- **File Versioning & Immutability**: Complete audit trail of all file modifications
- **Redundancy & Self-Healing**: Automatic recovery from node failures
- **Decentralized Storage Network**: Distributed across multiple storage providers
- **Cryptographic Verification**: Hash-based integrity checking

## Architecture Highlights
- **Hybrid Design**: Separates on-chain metadata from off-chain data storage
- **Microservices**: Scalable NestJS gateway architecture
- **Smart Contracts**: Hardhat-powered blockchain layer for trust and verification
- **Enterprise-Ready**: Built for production workloads with robust security

## Tech Stack
- **Backend Framework:** NestJS (TypeScript)
- **Blockchain Development:** Hardhat
- **Database:** MongoDB
- **Encryption:** AES-256 symmetric encryption
- **Storage Layer:** Decentralized storage providers
- **API Protocol:** S3-compatible REST API

## Quick Start

### Prerequisites
- Node.js v18+
- Docker & Docker Compose
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/TadashiJei/Athy-Sonic.git
cd athy

# Install dependencies
npm install

# Start MongoDB and storage nodes
docker-compose up -d

# Configure environment
cp .env.example .env
# Edit .env with your configuration

# Start the NestJS gateway
npm run start:dev

# Deploy smart contracts (in another terminal)
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost
```

#### Windows (PowerShell)
```powershell
# Clone the repository
git clone https://github.com/TadashiJei/Athy-Sonic.git
Set-Location athy

# Install dependencies
npm install

# Start MongoDB and storage nodes
docker-compose up -d

# Configure environment
Copy-Item .env.example .env
# Edit .env with your configuration

# Start the NestJS gateway
npm run start:dev

# Deploy smart contracts (in another terminal)
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost
```

### Basic Usage
```javascript
const AWS = require('aws-sdk');

// Configure Athy client (S3-compatible)
const athy = new AWS.S3({
  endpoint: 'http://localhost:3000',
  accessKeyId: 'your-access-key',
  secretAccessKey: 'your-secret-key',
  s3ForcePathStyle: true
});

// Upload a file
athy.putObject({
  Bucket: 'my-bucket',
  Key: 'document.pdf',
  Body: fileBuffer
}).promise();

// Download a file
const object = await athy.getObject({
  Bucket: 'my-bucket',
  Key: 'document.pdf'
}).promise();
```

## Project Structure
```
athy/
├── src/
│   ├── gateway/          # NestJS API gateway
│   ├── contracts/        # Smart contracts
│   ├── storage/          # Storage node logic
│   └── common/           # Shared utilities
├── scripts/              # Deployment scripts
├── test/                 # Test suites
├── docs/                 # Documentation
└── docker-compose.yml    # Development environment
```

## Development Roadmap

### Phase 1: Core MVP ✅
- S3-compatible API implementation
- Basic smart contract deployment
- File fragmentation and encryption

### Phase 2: Enhanced Features 
- Advanced access control (RBAC)
- File versioning system
- Redundancy and self-healing

### Phase 3: Ecosystem Integration 
- IPFS/Filecoin interoperability
- Advanced developer SDK
- Smart contract automation

## API Docs
The OpenAPI specification for Athy's S3-compatible gateway is located at `docs/openapi.yaml`.

- View online: paste or import `docs/openapi.yaml` into https://editor.swagger.io/
- VS Code: install an OpenAPI viewer extension and open `docs/openapi.yaml`
- Redocly (optional): `npm i -g @redocly/cli` then `redocly preview-docs docs/openapi.yaml`

## Contributing
We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## Security
For security concerns, please review [SECURITY.md](./SECURITY.md) and report vulnerabilities to security@athy.io.

## License
MIT License - see [LICENSE](./LICENSE) for details.

---
*Built with ❤️ for the decentralized future*

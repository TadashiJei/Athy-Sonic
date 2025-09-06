# Athy Architecture

## Problem Statement
Traditional cloud storage services are centralized and susceptible to:
- **Single Points of Failure**: Service outages affect all users
- **Censorship**: Central authorities can restrict access
- **Data Breaches**: Centralized data creates attractive targets
- **Vendor Lock-in**: Proprietary APIs limit portability
- **Trust Issues**: Users must trust central authorities with sensitive data

Athy addresses these challenges through a hybrid decentralized architecture that combines blockchain immutability with practical storage solutions.

## Hybrid Architecture Overview

Athy's architecture elegantly separates **on-chain (blockchain)** and **off-chain (backend)** responsibilities to optimize for both security and performance.

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Client App    │───▶│  NestJS Gateway  │───▶│  Storage Nodes  │
│  (S3 SDK)       │    │  (Off-chain)     │    │  (Distributed)  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
                        ┌──────────────────┐
                        │ Smart Contracts  │
                        │   (On-chain)     │
                        └──────────────────┘
```

## NestJS Gateway (Off-chain Layer)

The NestJS backend serves as the primary gateway, handling:

### API Management
- **S3-Compatible REST API**: PutObject, GetObject, DeleteObject, ListObjects
- **Authentication**: JWT-based session management
- **Rate Limiting**: Protection against abuse
- **Request Validation**: Input sanitization and validation

### Data Processing Pipeline
```
File Upload → Fragmentation → Encryption → Distribution → Blockchain Record
```

1. **File Fragmentation**: Files split into N chunks using Reed-Solomon erasure coding
2. **Encryption**: Each fragment encrypted with AES-256 using unique keys
3. **Distribution**: Fragments distributed across multiple storage providers
4. **Verification**: Cryptographic hashes calculated for integrity checking

### Database Layer (MongoDB)
- **User Profiles**: Account information and preferences
- **Session Management**: Active sessions and tokens
- **Fragment Mapping**: Locations of file fragments across nodes
- **Cache Layer**: Frequently accessed metadata

## Blockchain Layer (On-chain)

Powered by Hardhat for development and deployment:

### Smart Contract Architecture

#### FileRegistry Contract
```solidity
contract FileRegistry {
    struct FileMetadata {
        string fileName;
        uint256 fileSize;
        string mimeType;
        bytes32[] fragmentHashes;
        uint256 timestamp;
        address owner;
    }
    
    mapping(bytes32 => FileMetadata) public files;
    mapping(bytes32 => mapping(address => Permission)) public permissions;
}
```

#### AccessControl Contract
```solidity
contract AccessControl {
    enum Permission { NONE, READ, WRITE, ADMIN }
    
    function grantAccess(bytes32 fileHash, address user, Permission level) external;
    function revokeAccess(bytes32 fileHash, address user) external;
    function checkPermission(bytes32 fileHash, address user) external view returns (Permission);
}
```

### On-chain Responsibilities
- **Metadata Storage**: Immutable file information
- **Access Control**: RBAC permission management
- **Data Verification**: Hash-based integrity checking
- **Audit Trail**: Complete history of all operations

## Detailed Flow Diagrams

### PutObject Flow
```
Client                NestJS Gateway           Blockchain              Storage Nodes
  │                        │                         │                         │
  │─── PUT /bucket/key ────▶│                         │                         │
  │                        │                         │                         │
  │                        │── Fragment File ──────│                         │
  │                        │── Encrypt Fragments ──│                         │
  │                        │                         │                         │
  │                        │────── Store Fragment ─────────────────────────▶│
  │                        │◀───── Confirmation ───────────────────────────│
  │                        │                         │                         │
  │                        │── Record Metadata ───▶│                         │
  │                        │◀─── Transaction Hash ─│                         │
  │                        │                         │                         │
  │◀────── 200 OK ─────────│                         │                         │
```

### GetObject Flow
```
Client                NestJS Gateway           Blockchain              Storage Nodes
  │                        │                         │                         │
  │─── GET /bucket/key ────▶│                         │                         │
  │                        │                         │                         │
  │                        │── Check Permissions ──▶│                         │
  │                        │◀─── Permission OK ────│                         │
  │                        │                         │                         │
  │                        │── Get Fragment Hashes ▶│                         │
  │                        │◀─── Fragment Info ────│                         │
  │                        │                         │                         │
  │                        │────── Fetch Fragments ────────────────────────▶│
  │                        │◀───── Fragment Data ──────────────────────────│
  │                        │                         │                         │
  │                        │── Verify & Reconstruct │                         │
  │◀────── File Data ──────│                         │                         │
```

## Security Architecture

### Encryption Strategy
- **Per-File Keys**: Each file uses a unique AES-256 key
- **Key Derivation**: Keys derived from user credentials + file hash
- **Fragment Isolation**: No single node has complete file access

### Access Control Model
```
User Request → JWT Validation → Blockchain Permission Check → Resource Access
```

### Integrity Verification
1. **Upload**: Calculate SHA-256 hash of each encrypted fragment
2. **Storage**: Store hashes on blockchain
3. **Retrieval**: Verify fragment hashes against blockchain records
4. **Reconstruction**: Ensure file integrity after reassembly

## Redundancy & Self-Healing

### Redundancy Model
- **Erasure Coding**: Files split into N fragments, recoverable from M fragments (M < N)
- **Geographic Distribution**: Fragments stored across different regions
- **Node Diversity**: Multiple storage provider types

### Self-Healing Process
```
Node Failure Detection → Fragment Recovery → Redistribution → Blockchain Update
```

1. **Health Monitoring**: Continuous node availability checking
2. **Failure Detection**: Identify unavailable fragments
3. **Recovery**: Regenerate missing fragments from redundant data
4. **Rebalancing**: Redistribute to healthy nodes

## Scalability Considerations

### Horizontal Scaling
- **Gateway Instances**: Multiple NestJS instances behind load balancer
- **Database Sharding**: MongoDB sharding for large datasets
- **Storage Network**: Dynamic addition of storage providers

### Performance Optimizations
- **Caching Layer**: Redis for frequently accessed metadata
- **CDN Integration**: Edge caching for popular content
- **Parallel Processing**: Concurrent fragment operations

## Network Architecture

### Development Environment
```
Localhost Network
├── NestJS Gateway (Port 3000)
├── MongoDB (Port 27017)
├── Hardhat Node (Port 8545)
└── Storage Nodes (Ports 4000-4003)
```

### Production Environment
```
Cloud Infrastructure
├── Load Balancer
├── Gateway Cluster (Auto-scaling)
├── Database Cluster (Replica Set)
├── Blockchain Network (Mainnet/Testnet)
└── Distributed Storage Network
```

---
*This architecture ensures Athy provides enterprise-grade reliability while maintaining the benefits of decentralization.*

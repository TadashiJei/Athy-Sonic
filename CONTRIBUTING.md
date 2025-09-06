# Contributing to Athy

We welcome contributions from developers, security researchers, and blockchain enthusiasts! This guide will help you get started with contributing to the Athy project.

## Code of Conduct

### Our Standards
- **Respectful Communication**: Treat all contributors with respect
- **Constructive Feedback**: Provide helpful, actionable feedback
- **Inclusive Environment**: Welcome contributors from all backgrounds
- **Professional Conduct**: Maintain professionalism in all interactions

### Unacceptable Behavior
- Harassment, discrimination, or offensive language
- Personal attacks or trolling
- Spam or irrelevant contributions
- Violation of intellectual property rights

## Development Setup

### Prerequisites
- Node.js v18+ and npm
- Docker and Docker Compose
- Git
- Code editor (VS Code recommended)

### Environment Setup
```bash
# Fork and clone the repository
git clone https://github.com/your-username/athy.git
cd athy

# Install dependencies
npm install

# Install development tools
npm install -g @nestjs/cli hardhat

# Set up pre-commit hooks
npm run prepare

# Copy environment configuration
cp .env.example .env.development
# Edit .env.development with your settings

# Start development environment
docker-compose -f docker-compose.dev.yml up -d

# Run database migrations
npm run migration:run

# Start the development server
npm run start:dev
```

### Development Tools
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality checks
- **Jest**: Testing framework
- **TypeScript**: Type checking

## Project Structure

```
athy/
├── src/
│   ├── gateway/              # NestJS API gateway
│   │   ├── controllers/      # REST API controllers
│   │   ├── services/         # Business logic
│   │   ├── dto/              # Data transfer objects
│   │   └── guards/           # Authentication guards
│   ├── contracts/            # Smart contracts
│   │   ├── FileRegistry.sol  # File metadata contract
│   │   ├── AccessControl.sol # Permission management
│   │   └── test/             # Contract tests
│   ├── storage/              # Storage node implementation
│   ├── common/               # Shared utilities
│   └── config/               # Configuration files
├── scripts/                  # Deployment and utility scripts
├── test/                     # Integration tests
├── docs/                     # Documentation
└── tools/                    # Development tools
```

## Development Workflow

### Branch Strategy
- **main**: Production-ready code
- **develop**: Integration branch for features
- **feature/***: Individual feature branches
- **hotfix/***: Critical bug fixes
- **release/***: Release preparation

### Feature Development Process
1. **Create Issue**: Describe the feature or bug
2. **Create Branch**: `git checkout -b feature/your-feature-name`
3. **Develop**: Write code following our standards
4. **Test**: Ensure all tests pass
5. **Document**: Update relevant documentation
6. **Pull Request**: Submit for review

### Commit Message Format
We follow the [Conventional Commits](https://conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(gateway): add file versioning support
fix(contracts): resolve access control vulnerability
docs(readme): update installation instructions
test(storage): add redundancy mechanism tests
```

## Testing Guidelines

### Test Types
1. **Unit Tests**: Individual component testing
2. **Integration Tests**: Component interaction testing
3. **Contract Tests**: Smart contract functionality
4. **E2E Tests**: End-to-end workflow testing

### Running Tests
```bash
# Run all tests
npm test

# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run contract tests
npm run test:contracts

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- --testPathPattern=gateway
```

### Test Requirements
- **Coverage**: Minimum 80% code coverage
- **Contract Tests**: All smart contract functions must be tested
- **API Tests**: All endpoints must have integration tests
- **Error Handling**: Test error conditions and edge cases

### Writing Tests
```typescript
// Example unit test
describe('FileService', () => {
  let service: FileService;
  
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [FileService],
    }).compile();
    
    service = module.get<FileService>(FileService);
  });
  
  it('should fragment file correctly', () => {
    const file = Buffer.from('test content');
    const fragments = service.fragmentFile(file, 3);
    
    expect(fragments).toHaveLength(3);
    expect(service.reconstructFile(fragments)).toEqual(file);
  });
});
```

## Code Style Guidelines

### TypeScript Standards
- Use strict TypeScript configuration
- Prefer interfaces over types for object shapes
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### NestJS Best Practices
- Use dependency injection properly
- Implement proper error handling
- Use DTOs for request/response validation
- Follow modular architecture patterns

### Smart Contract Guidelines
- Follow Solidity style guide
- Use OpenZeppelin contracts when possible
- Implement comprehensive access controls
- Add detailed NatSpec documentation

### Code Formatting
```bash
# Format code
npm run format

# Check formatting
npm run format:check

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## Pull Request Guidelines

### PR Requirements
- **Clear Title**: Descriptive title following commit conventions
- **Description**: Detailed description of changes
- **Tests**: All tests must pass
- **Documentation**: Update relevant documentation
- **Changelog**: Add entry to CHANGELOG.md

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Contract tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Changelog updated
```

### Review Process
1. **Automated Checks**: CI/CD pipeline runs tests
2. **Code Review**: At least 2 approvals required
3. **Security Review**: For security-sensitive changes
4. **Merge**: Squash and merge to main branch

## Security Contributions

### Reporting Vulnerabilities
- **Email**: security@athy.io
- **Response Time**: 48 hours acknowledgment
- **Disclosure**: Coordinated disclosure process

### Security Testing
- Smart contract audits
- Penetration testing
- Dependency vulnerability scanning
- Code security analysis

## Documentation Contributions

### Documentation Types
- **API Documentation**: OpenAPI/Swagger specs
- **User Guides**: End-user documentation
- **Developer Guides**: Technical documentation
- **Architecture Docs**: System design documentation

### Documentation Standards
- Use clear, concise language
- Include code examples
- Keep documentation up-to-date
- Follow markdown best practices

## Community

### Communication Channels
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General discussions
- **Discord**: Real-time community chat
- **Twitter**: Project updates and announcements

### Getting Help
- Check existing issues and documentation
- Ask questions in GitHub Discussions
- Join our Discord community
- Attend community calls (monthly)

## Recognition

We recognize contributors through:
- **Contributors List**: README.md acknowledgments
- **Release Notes**: Feature contributor mentions
- **Community Spotlight**: Monthly contributor highlights
- **Swag**: Athy merchandise for significant contributions

---

Thank you for contributing to Athy! Together, we're building the future of decentralized storage.

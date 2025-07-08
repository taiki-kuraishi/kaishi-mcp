# kaishi-mcp

A TypeScript monorepo that provides a Model Context Protocol (MCP) integration system for managing and serving syllabus-related data. The project consists of two main applications and supporting packages that enable developers to build applications that can interact with educational content through the Model Context Protocol.

## Overview

**kaishi-mcp** enables interaction with educational content through both HTTP-based and real-time interfaces. The system emphasizes type safety, serverless deployment, and modular design with the following key components:

- **remote-mcp**: A Cloudflare Worker that acts as an MCP agent, providing HTTP endpoints and real-time communication capabilities through Server-Sent Events (SSE)
- **syllabus-api**: A tRPC-based API service that manages syllabus data using PostgreSQL (via Supabase) and Drizzle ORM
- **mcp-server**: Core MCP logic package that orchestrates protocol interactions
- **syllabus-api-trpc-client**: Type-safe API client for consuming the syllabus-api service

## Directory Structure

```
kaishi-mcp/
├── apps/                           # Main applications
│   ├── remote-mcp/                 # MCP agent Cloudflare Worker
│   └── syllabus-api/               # tRPC API service
├── packages/                       # Internal packages
│   ├── mcp-server/                 # Core MCP logic
│   └── syllabus-api-trpc-client/   # Type-safe API client
├── .github/workflows/              # CI/CD pipelines
├── LICENSE                         # MIT License
├── README.md                       # This file
├── biome.jsonc                     # Code formatting and linting config
├── lefthook.yml                    # Git hooks configuration
├── package.json                    # Monorepo configuration
├── taskfile.dist.yml               # Development task automation
├── tsconfig.json                   # Root TypeScript configuration
└── turbo.json                      # Build orchestration
```

## Setup Instructions

### Prerequisites

- [Bun](https://bun.sh/) - JavaScript runtime and package manager
- Node.js 20+ (for compatibility)

### Installation

1. **Install dependencies and setup environment:**
  ```bash
  task install
  ```
  
  This command will:
  - Install all dependencies with `bun install --frozen-lockfile`
  - Setup git hooks with `bun lefthook install`
  - Build all packages with `bun turbo build`

2. **Alternative manual setup:**
  ```bash
  bun install --frozen-lockfile
  bun lefthook install
  bun turbo build
  ```

### Development Commands

- **Format code:** `task format` or `bunx biome format --fix`
- **Lint and check code:** `task lint`
- **Type checking:** `bun turbo check:type`
- **Build all packages:** `bun turbo build`
- **Run tests:** `bun turbo test`
- **Check for unused code:** `bun turbo check:knip`

### Running Applications

#### Remote MCP Server
```bash
cd apps/remote-mcp
bun run dev
```

#### Syllabus API Server
```bash
cd apps/syllabus-api
task dev
```

## Development Workflow

This project uses [Turborepo](https://turbo.build/) for build orchestration and caching. The monorepo is configured with workspaces for both `apps/*` and `packages/*`.

### Build System
- **Turborepo**: Orchestrates tasks across the monorepo with caching and parallelization
- **TypeScript**: Primary language with strict type checking and project references
- **Bun**: Package manager and JavaScript runtime
- **Biome**: Code formatting and linting

### Quality Assurance
- **Lefthook**: Git hooks for pre-commit checks
- **Knip**: Dead code and unused dependency detection
- **Vitest**: Testing framework with Cloudflare Workers support

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2025 Kuraishi Taiki

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `task lint` to ensure code quality
5. Submit a pull request

# Remote MCP - Cloudflare Worker

A Cloudflare Worker application that acts as an MCP (Model Context Protocol) agent, providing HTTP endpoints and real-time communication capabilities through Server-Sent Events (SSE). This application serves as the primary interface for external clients to interact with the MCP ecosystem.

## Overview

The **remote-mcp** application provides:

- **MCP Agent Service**: Cloudflare Durable Object implementation for stateful MCP operations
- **HTTP Endpoints**: RESTful API for MCP protocol interactions
- **Server-Sent Events**: Real-time communication support via SSE
- **Health Monitoring**: Built-in health check endpoints
- **Serverless Deployment**: Optimized for Cloudflare Workers platform

## Directory Structure

```
apps/remote-mcp/
├── src/
│   └── index.ts                    # Main Durable Object export (KaishiMCP class)
├── test/                           # Test files
├── .knip/                          # Knip configuration
├── .turbo/                         # Turbo cache
├── node_modules/                   # Dependencies
├── README.md                       # This file
├── package.json                    # Package configuration
├── taskfile.dist.yml               # Task automation
├── tsconfig.json                   # TypeScript configuration
├── vitest.config.mts               # Test configuration
├── wrangler.jsonc                  # Cloudflare Workers configuration
└── worker-configuration.d.ts       # Generated Cloudflare types
```

### Key Files

- **`src/index.ts`**: Main entry point exporting the `KaishiMCP` Durable Object class
- **`wrangler.jsonc`**: Cloudflare Workers deployment configuration
- **`taskfile.dist.yml`**: Development and deployment task definitions
- **`worker-configuration.d.ts`**: Auto-generated Cloudflare Workers type definitions

## Get Started

### Prerequisites

- [Bun](https://bun.sh/) - JavaScript runtime and package manager
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) - Cloudflare Workers CLI (installed via dependencies)

### Setup

1. **Setup bun environment:**
  ```bash
  # macOS
  brew install bun
  
  # Or install directly
  curl -fsSL https://bun.sh/install | bash
  ```

2. **Install dependencies:**
  ```bash
  bun install
  ```

3. **Run MCP server locally:**
  ```bash
  bun run dev
  ```

### Development Commands

Available scripts from `package.json`:

- **`bun run dev`**: Start development server with hot reload
- **`bun run deploy`**: Deploy to Cloudflare Workers
- **`bun run test`**: Run test suite
- **`bun run check:type`**: TypeScript type checking
- **`bun run check:knip`**: Check for unused code
- **`bun run build`**: Build for production

### Task Commands

Available tasks from `taskfile.dist.yml`:

- **`task dev`**: Start development server
- **`task deploy`**: Deploy to Cloudflare Workers
- **`task test`**: Run tests with coverage

## API Endpoints

The application provides the following endpoints:

### Health Check
```
GET /
```
Returns server status and health information.

### Server-Sent Events
```
GET /sse
```
Establishes a Server-Sent Events connection for real-time communication.

### MCP Protocol
```
POST /mcp
```
Main endpoint for MCP protocol message handling.

## MCP Client Configuration

The **remote-mcp** server can be easily integrated with popular MCP clients like VS Code and Claude Desktop. Below are configuration examples for both development and production environments.

### Available MCP Tools

The server provides the following MCP tools:

- **`getAllSyllabus`**: Retrieves all syllabus entries from the connected syllabus API

### VS Code Configuration

Create a `.vscode/mcp.json` file in your project root:

#### Development Configuration (Local)
```json
{
  "servers": {
    "kaishi-mcp": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-stdio"],
      "env": {
        "MCP_SERVER_URL": "http://localhost:8788/mcp",
        "SYLLABUS_API_URL": "http://localhost:8787"
      }
    }
  }
}
```

#### Production Configuration
```json
{
  "servers": {
    "kaishi-mcp": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-stdio"],
      "env": {
        "MCP_SERVER_URL": "https://kaishi-mcp-server.your-domain.workers.dev/mcp",
        "SYLLABUS_API_URL": "https://d3b5833c-kaishi-syllabus-api-server.kuraishi-taiki0.workers.dev"
      }
    }
  }
}
```

### Claude Desktop Configuration

Create or edit your `claude_desktop_config.json` file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

#### Development Configuration (Local)
```json
{
  "mcpServers": {
    "kaishi-mcp": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-stdio"],
      "env": {
        "MCP_SERVER_URL": "http://localhost:8788/mcp",
        "SYLLABUS_API_URL": "http://localhost:8787"
      }
    }
  }
}
```

#### Production Configuration
```json
{
  "mcpServers": {
    "kaishi-mcp": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-stdio"],
      "env": {
        "MCP_SERVER_URL": "https://kaishi-mcp-server.your-domain.workers.dev/mcp",
        "SYLLABUS_API_URL": "https://d3b5833c-kaishi-syllabus-api-server.kuraishi-taiki0.workers.dev"
      }
    }
  }
}
```

### Setup Instructions

#### For Local Development

1. **Start the servers:**
  ```bash
  # Terminal 1: Start syllabus-api
  cd apps/syllabus-api
  bun run dev
  
  # Terminal 2: Start remote-mcp
  cd apps/remote-mcp
  bun run dev
  ```

2. **Configure your MCP client:**
  - Use the development configuration examples above
  - The remote-mcp server will be available at `http://localhost:8788`
  - The syllabus-api will be available at `http://localhost:8787`

3. **Restart your MCP client:**
  - **VS Code**: Reload the window or restart VS Code
  - **Claude Desktop**: Restart the Claude Desktop application

#### For Production Use

1. **Deploy the applications:**
  ```bash
  # Deploy syllabus-api
  cd apps/syllabus-api
  bun run deploy
  
  # Deploy remote-mcp
  cd apps/remote-mcp
  bun run deploy
  ```

2. **Update configuration:**
  - Use the production configuration examples above
  - Replace `your-domain` with your actual Cloudflare Workers domain
  - Ensure the `SYLLABUS_API_URL` points to your deployed syllabus-api

3. **Restart your MCP client** to load the new configuration

### Server Information

- **Server Name**: `kaishi-mcp-server`
- **Development Port**: `8788`
- **Protocol**: HTTP with MCP over JSON-RPC
- **Platform**: Cloudflare Workers with Durable Objects
- **Available Tools**: `getAllSyllabus`

### Troubleshooting

- **Connection Issues**: Ensure both servers are running and accessible
- **Tool Not Found**: Verify the server is properly deployed and the syllabus-api is accessible
- **Configuration Errors**: Check JSON syntax and file locations
- **Client Not Responding**: Restart the MCP client after configuration changes

## Architecture

### Durable Objects

The application uses Cloudflare Durable Objects for stateful operations:

```typescript
export class KaishiMCP extends McpAgent {
  // Durable Object implementation
  // Handles MCP protocol interactions
  // Manages persistent state
}
```

### Framework Integration

- **Hono**: Web framework for HTTP routing and middleware
- **MCP SDK**: Official Model Context Protocol SDK
- **Agents**: MCP agent functionality and protocol handling

## Development and Testing

### Local Development

```bash
# Start development server
bun run dev

# The server will be available at http://localhost:8787
```

### Testing

```bash
# Run all tests
bun run test

# Run tests with coverage
task test
```

### Type Checking

```bash
# Check TypeScript types
bun run check:type

# Generate Cloudflare Workers types
bun turbo cf-typegen
```

## Deployment

### Cloudflare Workers

```bash
# Deploy to production
bun run deploy

# Or use task
task deploy
```

### Configuration

Deployment configuration is managed through:

- **`wrangler.jsonc`**: Cloudflare Workers settings
- **Environment variables**: Set through Cloudflare dashboard or wrangler
- **Durable Object bindings**: Configured in wrangler.jsonc

### Environment Variables

Required environment variables:

- **`SYLLABUS_API_URL`**: URL for the syllabus API service
- Other environment variables as needed for MCP operations

## Dependencies

### Core Dependencies

- **@kaishi-mcp/server**: Core MCP server logic
- **hono**: Web framework for Cloudflare Workers
- **agents**: MCP agent functionality
- **@modelcontextprotocol/sdk**: Official MCP SDK

### Development Dependencies

- **@cloudflare/workers-types**: TypeScript types for Cloudflare Workers
- **wrangler**: Cloudflare Workers CLI
- **vitest**: Testing framework
- **typescript**: TypeScript compiler

## Integration

This application integrates with:

- **packages/mcp-server**: Core MCP logic and tool implementations
- **apps/syllabus-api**: Backend API for syllabus data
- **External MCP clients**: Applications that consume the MCP protocol

The application serves as the entry point for MCP protocol interactions and coordinates with other services in the kaishi-mcp ecosystem.

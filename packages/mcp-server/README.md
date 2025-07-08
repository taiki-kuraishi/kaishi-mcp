# @kaishi-mcp/server

Core MCP (Model Context Protocol) server package that orchestrates protocol interactions and syllabus data access. This package provides the main server implementation for handling MCP requests and managing tool execution.

## Overview

The `@kaishi-mcp/server` package contains the core logic for the MCP server implementation, including:

- **KaishiMcpServer**: Main server class that handles MCP protocol interactions
- **Tool System**: Extensible tool architecture for adding new MCP capabilities
- **Client Integration**: Built-in integration with the syllabus API through tRPC client
- **Type Safety**: Full TypeScript support with proper type definitions

## Directory Structure

```
packages/mcp-server/
├── src/
│   ├── clients/                    # API client integrations
│   │   └── syllabus-api-trpc-client.ts
│   ├── tools/                      # MCP tool implementations
│   │   ├── abstract-tool.ts        # Base class for all tools
│   │   └── get-all-syllabus-tool.ts # Tool for fetching syllabus data
│   └── index.ts                    # Main server export
├── dist/                           # Compiled TypeScript output
├── package.json                    # Package configuration
└── tsconfig.json                   # TypeScript configuration
```

### Key Files

- **`src/index.ts`**: Main entry point exporting `KaishiMcpServer` class
- **`src/tools/abstract-tool.ts`**: Base class that all MCP tools must extend
- **`src/tools/get-all-syllabus-tool.ts`**: Example tool implementation for syllabus data retrieval
- **`src/clients/syllabus-api-trpc-client.ts`**: Integration with the syllabus API service

## Usage

### Basic Usage

```typescript
import { KaishiMcpServer } from '@kaishi-mcp/server';

// Create and configure the MCP server
const server = new KaishiMcpServer();

// The server is now ready to handle MCP protocol requests
```

### Creating Custom Tools

To create a new MCP tool, extend the `AbstractTool` class:

```typescript
import { AbstractTool } from '@kaishi-mcp/server';

export class MyCustomTool extends AbstractTool {
  // Implement required methods
  async execute(params: any) {
    // Tool implementation
  }
}
```

### Integration with Syllabus API

The package includes built-in integration with the syllabus API:

```typescript
import { syllabusApiTrpcClient } from '@kaishi-mcp/server';

// Use the client to interact with syllabus data
const syllabi = await syllabusApiTrpcClient.getAllSyllabi();
```

## Development and Testing

### Development Commands

- **Type checking**: `bun run check:type`
- **Build package**: `bun run build`
- **Check for unused code**: `bun run check:knip`

### Building

```bash
# Build the package
bun run build

# This will compile TypeScript files to the dist/ directory
```

### Dependencies

- **@kaishi-mcp/syllabus-api-trpc-client**: Type-safe client for syllabus API
- **@modelcontextprotocol/sdk**: Official MCP SDK for protocol implementation

## Package Exports

The package exports the following modules:

```typescript
// Main server class
export { KaishiMcpServer } from './src/index.js';

// Tool system
export { AbstractTool } from './src/tools/abstract-tool.js';
export { GetAllSyllabusTool } from './src/tools/get-all-syllabus-tool.js';

// Client integrations
export { syllabusApiTrpcClient } from './src/clients/syllabus-api-trpc-client.js';
```

## Integration

This package is designed to be used by:

- **apps/remote-mcp**: Cloudflare Worker that hosts the MCP server
- Other applications that need MCP protocol support

The package follows the workspace pattern and can be imported using:

```json
{
  "dependencies": {
    "@kaishi-mcp/server": "workspace:*"
  }
}
```

# Syllabus API - tRPC Server

A tRPC-based API service that manages syllabus data using PostgreSQL (via Supabase) and Drizzle ORM. This application provides type-safe data access and manipulation capabilities for educational content management.

## Overview

The **syllabus-api** application provides:

- **tRPC Server**: Type-safe API endpoints with automatic type inference
- **Database Integration**: PostgreSQL database via Supabase with Drizzle ORM
- **Dependency Injection**: Service management with tsyringe container
- **Schema Migrations**: Database schema management with Drizzle Kit
- **Serverless Deployment**: Optimized for Cloudflare Workers platform

## Directory Structure

```
apps/syllabus-api/
├── src/
│   ├── routers/                    # tRPC route definitions
│   │   └── app-router.ts           # Main application router
│   ├── services/                   # Business logic services
│   ├── db/                         # Database configuration and schemas
│   └── index.ts                    # Main tRPC server entry point
├── dist/                           # Compiled TypeScript output
├── script/                         # Utility scripts
├── supabase/                       # Supabase configuration
├── test/                           # Test files
├── .knip/                          # Knip configuration
├── .turbo/                         # Turbo cache
├── node_modules/                   # Dependencies
├── README.md                       # This file
├── compose.yml                     # Docker Compose for local development
├── package.json                    # Package configuration
├── taskfile.dist.yml               # Task automation
├── tsconfig.json                   # TypeScript configuration
├── vitest.config.mts               # Test configuration
├── wrangler.jsonc                  # Cloudflare Workers configuration
└── worker-configuration.d.ts       # Generated Cloudflare types
```

### Key Files

- **`src/index.ts`**: Main tRPC server entry point
- **`src/routers/app-router.ts`**: Main application router exported to clients
- **`supabase/`**: Database configuration and migration files
- **`taskfile.dist.yml`**: Development, testing, and deployment tasks
- **`compose.yml`**: Local PostgreSQL setup for development

## Get Started

### Prerequisites

- [Bun](https://bun.sh/) - JavaScript runtime and package manager
- [Docker](https://www.docker.com/) - For local database (optional)
- [Supabase CLI](https://supabase.com/docs/guides/cli) - For database management

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

3. **Setup database (choose one):**

  **Option A: Using Supabase (recommended for production):**
  ```bash
  # Configure Supabase connection
  # Set environment variables for database connection
  ```

  **Option B: Using local PostgreSQL with Docker:**
  ```bash
  # Start local PostgreSQL
  docker-compose up -d
  ```

4. **Run API server:**
  ```bash
  # Using task (recommended)
  task dev
  
  # Or directly
  bun run dev
  ```

### Development Commands

Available scripts from `package.json`:

- **`bun run dev`**: Start development server
- **`bun run build`**: Build for production
- **`bun run test`**: Run test suite
- **`bun run check:type`**: TypeScript type checking
- **`bun run check:knip`**: Check for unused code

### Task Commands

Available tasks from `taskfile.dist.yml`:

- **`task dev`**: Start development server with database setup
- **`task test`**: Run tests with coverage
- **`task db:migrate`**: Run database migrations
- **`task db:seed`**: Seed database with sample data
- **`task deploy`**: Deploy to Cloudflare Workers

## API Endpoints

The tRPC server provides type-safe endpoints for:

### Syllabus Management
- **`getAllSyllabi`**: Retrieve all syllabus records
- **`getSyllabusById`**: Get specific syllabus by ID
- **`createSyllabus`**: Create new syllabus
- **`updateSyllabus`**: Update existing syllabus
- **`deleteSyllabus`**: Remove syllabus

### Usage Example

```typescript
import { syllabusApiClient } from '@kaishi-mcp/syllabus-api-trpc-client';

// Get all syllabi
const syllabi = await syllabusApiClient.getAllSyllabi.query();

// Create new syllabus
const newSyllabus = await syllabusApiClient.createSyllabus.mutate({
  title: 'Introduction to Computer Science',
  description: 'Fundamentals of programming and algorithms'
});
```

## Database

### Schema Management

The application uses Drizzle ORM for database operations:

- **Schema definitions**: Located in `src/db/schema/`
- **Migrations**: Managed through Drizzle Kit
- **Type safety**: Full TypeScript support for database operations

### Database Operations

```bash
# Run migrations
task db:migrate

# Generate new migration
bunx drizzle-kit generate

# View database schema
bunx drizzle-kit studio
```

### Supabase Integration

- **PostgreSQL**: Hosted database service
- **Real-time subscriptions**: Available through Supabase client
- **Authentication**: Can be integrated with Supabase Auth
- **Storage**: File storage capabilities

## Development and Testing

### Local Development

```bash
# Start development server
task dev

# The server will be available at http://localhost:8080
```

### Testing

```bash
# Run all tests
bun run test

# Run tests with coverage
task test

# Run specific test file
bun test path/to/test.test.ts
```

### Database Testing

```bash
# Start test database
docker-compose -f compose.test.yml up -d

# Run database tests
task test:db
```

## Deployment

### Cloudflare Workers

```bash
# Deploy to production
task deploy

# Or directly
bun run deploy
```

### Environment Configuration

Required environment variables:

- **`DATABASE_URL`**: PostgreSQL connection string
- **`SUPABASE_URL`**: Supabase project URL
- **`SUPABASE_ANON_KEY`**: Supabase anonymous key
- **`SUPABASE_SERVICE_ROLE_KEY`**: Supabase service role key (for server operations)

### Configuration Files

- **`wrangler.jsonc`**: Cloudflare Workers deployment settings
- **`supabase/config.toml`**: Supabase project configuration
- **`drizzle.config.ts`**: Database migration configuration

## Dependencies

### Core Dependencies

- **@trpc/server**: tRPC server implementation
- **drizzle-orm**: TypeScript ORM for PostgreSQL
- **@supabase/supabase-js**: Supabase client library
- **tsyringe**: Dependency injection container
- **superjson**: Serialization for complex data types

### Development Dependencies

- **drizzle-kit**: Database migration toolkit
- **@types/pg**: PostgreSQL type definitions
- **vitest**: Testing framework
- **typescript**: TypeScript compiler

## Integration

This application provides data services for:

- **packages/syllabus-api-trpc-client**: Type-safe client package
- **packages/mcp-server**: MCP tool implementations
- **apps/remote-mcp**: Cloudflare Worker MCP agent
- External applications requiring syllabus data

### Client Integration

```typescript
// Import the client
import { syllabusApiClient } from '@kaishi-mcp/syllabus-api-trpc-client';

// Use with full type safety
const result = await syllabusApiClient.someEndpoint.query(params);
```

The application serves as the central data layer for the kaishi-mcp ecosystem, providing reliable and type-safe access to educational content data.

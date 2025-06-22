import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * Base class for MCP tools that can be registered with a server.
 * Provides a common interface for tool registration.
 */
export abstract class AbstractTool {
  /**
   * Registers this tool with the provided MCP server instance.
   * Implementations should define the tool's name, description, schema, and handler.
   *
   * @param server - The MCP server instance to register with
   */
  abstract register(server: McpServer): void;
}

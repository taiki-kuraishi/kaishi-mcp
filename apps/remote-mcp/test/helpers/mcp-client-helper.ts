import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const prepareClient = () => {
  return new Client({
    name: "kaishi-mcp-server",
    version: "1.0.0",
  });
};

export const prepareStreamableHttpMcpClient = () => {
  return {
    client: prepareClient(),
    transport: new StreamableHTTPClientTransport(new URL("http://localhost:8787/mcp")),
  };
};

export const prepareSseMcpClient = () => {
  return {
    client: prepareClient(),
    transport: new SSEClientTransport(new URL("http://localhost:8787/sse")),
  };
};

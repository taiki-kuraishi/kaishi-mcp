import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SyllabusApiClient } from "./clients/syllabus-api-trpc-client";
import { GetAllSyllabusTool } from "./tools/get-all-syllabus-tool";

export interface KaishiMcpServerOptions {
  syllabusApiBaseUrl?: string;
}

export class KaishiMcpServer extends McpServer {
  constructor(options: KaishiMcpServerOptions) {
    super({
      name: "kaishi-mcp-server",
      version: "1.0.0",
    });

    const syllabusApiClient = new SyllabusApiClient(
      options.syllabusApiBaseUrl ??
        "https://kaishi-syllabus-api-server.kuraishi-taiki0.workers.dev",
    );

    // register tools
    new GetAllSyllabusTool(syllabusApiClient.client).register(this);
  }
}

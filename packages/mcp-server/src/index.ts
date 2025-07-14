import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SyllabusApiClient } from "./clients/syllabus-api-trpc-client";

import { GetSyllabusById } from "./tools/get-syllabus-by-id-tool";
import { SearchSyllabusIds } from "./tools/search-syllabus-Iids-tool";

export interface KaishiMcpServerOptions {
  syllabusApiBaseUrl: string;
}

export class KaishiMcpServer extends McpServer {
  constructor(options: KaishiMcpServerOptions) {
    super({
      name: "kaishi-mcp-server",
      version: "1.0.0",
    });

    const syllabusApiClient = new SyllabusApiClient(options.syllabusApiBaseUrl);

    // register tools
    new GetSyllabusById(syllabusApiClient.client).register(this);
    new SearchSyllabusIds(syllabusApiClient.client).register(this);
  }
}

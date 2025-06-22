import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { SyllabusApiClient } from "src/clients/syllabus-api-trpc-client";
import { AbstractTool } from "./abstract-tool";

export class GetAllSyllabusTool extends AbstractTool {
  constructor(private readonly syllabusApiClient: SyllabusApiClient["client"]) {
    super();
  }

  register(server: McpServer): void {
    server.tool("getAllSyllabus", "Retrieves all syllabus entries.", {}, async () => {
      const res = await this.syllabusApiClient.syllabusRouter.getAll.query();

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(res, null, 2),
          },
        ],
      };
    });
  }
}

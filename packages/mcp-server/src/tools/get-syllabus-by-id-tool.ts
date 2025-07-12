import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { SyllabusApiClient } from "src/clients/syllabus-api-trpc-client";
import { z } from "zod";
import { AbstractTool } from "./abstract-tool";

export class GetSyllabusById extends AbstractTool {
  constructor(private readonly syllabusApiClient: SyllabusApiClient["client"]) {
    super();
  }

  register(server: McpServer): void {
    server.tool(
      "GetSyllabusById",
      "get Syllabus by ID. This tool allows you to retrieve a syllabus entry by its unique identifier.",
      {
        id: z.string(),
      },
      async (input) => {
        const res = await this.syllabusApiClient.syllabusRouter.getSyllabusById.query(input.id);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(res, null, 2),
            },
          ],
        };
      },
    );
  }
}

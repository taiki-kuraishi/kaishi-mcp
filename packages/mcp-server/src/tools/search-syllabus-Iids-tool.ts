import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { SyllabusApiClient } from "src/clients/syllabus-api-trpc-client";
import { z } from "zod";
import { AbstractTool } from "./abstract-tool";

export class SearchSyllabusIds extends AbstractTool {
  constructor(private readonly syllabusApiClient: SyllabusApiClient["client"]) {
    super();
  }

  register(server: McpServer): void {
    server.tool(
      "getAllSyllabus",
      "Search Syllabus IDs by Query. This tool allows you to search for syllabus IDs based on various criteria such as name, start term, end term, category, credits, day of week, period, location, isCompulsory, description, and learning objectives. The search supports partial matches for string fields.",
      {
        name: z.string().optional(),
        startTerm: z.number().int().optional(),
        endTerm: z.number().int().optional(),
        category: z.string().optional(),
        credits: z.string().optional(),
        dayOfWeek: z.number().int().nullable().optional(),
        period: z.number().int().nullable().optional(),
        location: z.string().optional(),
        isCompulsory: z.boolean().optional(),
        description: z.string().optional(),
        learningObjectives: z.string().optional(),
      },
      async (input) => {
        const res = await this.syllabusApiClient.syllabusRouter.searchSyllabusIds.query(input);

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

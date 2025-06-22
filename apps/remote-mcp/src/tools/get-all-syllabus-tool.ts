import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { container, injectable, singleton } from "tsyringe";
import { SyllabusApiClient } from "../clients/syllabus-api-trpc-client";
import { AbstractTool } from "./abstract-tool";

@singleton()
@injectable()
export class GetAllSyllabusTool extends AbstractTool {
  private readonly syllabusApiClient = container.resolve(SyllabusApiClient).client;

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

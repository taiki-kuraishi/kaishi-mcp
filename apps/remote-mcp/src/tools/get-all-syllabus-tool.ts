import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { injectable, singleton } from "tsyringe";
import { syllabusApiTrpcClient } from "../clients/syllabus-api-trpc-client";
import { AbstractTool } from "./abstract-tool";

@singleton()
@injectable()
export class GetAllSyllabusTool extends AbstractTool {
  register(server: McpServer): void {
    server.tool("getAllSyllabus", "Retrieves all syllabus entries.", {}, async () => {
      const res = await syllabusApiTrpcClient.syllabusRouter.getAll.query();

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

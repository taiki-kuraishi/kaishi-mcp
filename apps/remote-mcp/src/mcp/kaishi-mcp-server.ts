import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { inject, injectable, singleton } from "tsyringe";
import { GetAllSyllabusTool } from "../tools/get-all-syllabus-tool";

@singleton()
@injectable()
export class KaishiMcpServer extends McpServer {
  constructor(@inject(GetAllSyllabusTool) private readonly getAllSyllabusTool: GetAllSyllabusTool) {
    super({
      name: "kaishi-mcp-server",
      version: "1.0.0",
    });

    this.getAllSyllabusTool.register(this);
  }
}

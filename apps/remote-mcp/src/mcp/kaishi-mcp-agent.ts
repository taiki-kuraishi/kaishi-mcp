import { McpAgent } from "agents/mcp";
import { container } from "tsyringe";
import { KaishiMcpServer } from "./kaishi-mcp-server";

export class KaishiMcpAgent extends McpAgent {
  public readonly server: KaishiMcpServer;

  constructor(ctx: DurableObjectState, env: Cloudflare.Env) {
    super(ctx, env);
    this.server = container.resolve(KaishiMcpServer);
  }

  async init() {}
}

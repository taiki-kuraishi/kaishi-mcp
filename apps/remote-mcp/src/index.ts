import "reflect-metadata";
import { KaishiMcpServer } from "@kaishi-mcp/server";
import { McpAgent } from "agents/mcp";
import { Hono } from "hono";
import { health } from "./routers/health";
import { mcp } from "./routers/mcp";
import { sse } from "./routers/sse";

export class KaishiMCP extends McpAgent {
  public readonly server: KaishiMcpServer;

  constructor(ctx: DurableObjectState, env: Cloudflare.Env) {
    super(ctx, env);

    this.server = new KaishiMcpServer({
      syllabusApiBaseUrl: env.SYLLABUS_API_URL,
    });
  }

  async init() {}
}

export interface ExtendsEnv {
  Bindings: Cloudflare.Env;
}

const app = new Hono<ExtendsEnv>();

// routers
app.route("/", health);
app.route("/sse", sse);
app.route("/sse/message", sse);
app.route("/mcp", mcp);

export default app;

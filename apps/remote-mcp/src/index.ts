import "reflect-metadata";
import { Hono } from "hono";
import { KaishiMcpAgent } from "./mcp/kaishi-mcp-agent";
import { dependencyInjectionMiddleware } from "./middlewares/dependency-injection-middleware";
import { health } from "./routers/health";
import { mcp } from "./routers/mcp";
import { sse } from "./routers/sse";

export const KaishiMCP = KaishiMcpAgent;

export interface ExtendsEnv {
  Bindings: Cloudflare.Env;
}

const app = new Hono<ExtendsEnv>();

// middlewares
app.use("*", dependencyInjectionMiddleware);

// routers
app.route("/", health);
app.route("/sse", sse);
app.route("/sse/message", sse);
app.route("/mcp", mcp);

export default app;

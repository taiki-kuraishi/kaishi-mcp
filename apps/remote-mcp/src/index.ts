import "reflect-metadata";
import { Hono } from "hono";
import { KaishiMcpAgent } from "./mcp/kaishi-mcp-agent";
import { health } from "./routers/health";
import { mcp } from "./routers/mcp";
import { sse } from "./routers/sse";

export const KaishiMCP = KaishiMcpAgent;

const app = new Hono();

// routers
app.route("/", health);
app.route("/sse", sse);
app.route("/sse/message", sse);
app.route("/mcp", mcp);

export default app;

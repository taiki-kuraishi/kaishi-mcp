import { Hono } from "hono";
import { KaishiMCP } from "..";

export const mcp = new Hono();

mcp.all("/", async (c) => {
  return KaishiMCP.serve("/mcp").fetch(
    c.req.raw,
    c.env,
    // biome-ignore lint/suspicious/noExplicitAny: type mismatch between hono and cloudflare execution context
    c.executionCtx as any,
  );
});

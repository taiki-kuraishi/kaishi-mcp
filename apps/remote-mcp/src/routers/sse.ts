import { Hono } from "hono";
import { KaishiMCP } from "..";

export const sse = new Hono();

sse.all("/", async (c) => {
  return KaishiMCP.serveSSE("/sse").fetch(
    c.req.raw,
    c.env,
    // biome-ignore lint/suspicious/noExplicitAny: type mismatch between hono and cloudflare execution context
    c.executionCtx as any,
  );
});

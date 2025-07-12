import "reflect-metadata";
import { createContext } from "@src/libs/trpc/context";
import { type FetchCreateContextFnOptions, fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./routers/app-router";

export default {
  async fetch(request: Request, env: Cloudflare.Env, _ctx: ExecutionContext): Promise<Response> {
    return fetchRequestHandler({
      endpoint: "/api/v1/trpc",
      req: request,
      router: appRouter,
      createContext: (_options: FetchCreateContextFnOptions) => createContext({ env }),
    });
  },
};

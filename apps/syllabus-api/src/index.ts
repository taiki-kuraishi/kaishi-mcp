import "reflect-metadata";
import { type FetchCreateContextFnOptions, fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createContext } from "./libs/trpc/context";
import { appRouter } from "./routers/app-router";

export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    return fetchRequestHandler({
      endpoint: "/api/v1/trpc",
      req: request,
      router: appRouter,
      createContext: (_options: FetchCreateContextFnOptions) => createContext({ env }),
    });
  },
};

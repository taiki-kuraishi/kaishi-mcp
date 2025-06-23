import "reflect-metadata";
import { createContext } from "@src/libs/trpc/context";
import { appRouter } from "@src/routers/app-router";
import { type FetchCreateContextFnOptions, fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { setupDiContainer } from "./libs/tsyringe/setup-di-container";

export default {
  async fetch(request: Request, env: Cloudflare.Env, _ctx: ExecutionContext): Promise<Response> {
    setupDiContainer({ env });

    return fetchRequestHandler({
      endpoint: "/api/v1/trpc",
      req: request,
      router: appRouter,
      createContext: (_options: FetchCreateContextFnOptions) => createContext({ env }),
    });
  },
};

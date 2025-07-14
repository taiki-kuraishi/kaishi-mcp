import "reflect-metadata";
import { createContext } from "@src/libs/trpc/context";
import { type FetchCreateContextFnOptions, fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { setupDependencyInjectionContainer } from "./dependency-injection/setup-conteiner";
import { appRouter } from "./routers/app-router";

export default {
  async fetch(request: Request, env: Cloudflare.Env, _ctx: ExecutionContext): Promise<Response> {
    const dependencyContainer = setupDependencyInjectionContainer();
    const context = await createContext({ env, container: dependencyContainer });
    const router = appRouter(context);

    return fetchRequestHandler({
      endpoint: "/api/v1/trpc",
      req: request,
      router: router,
      createContext: (_options: FetchCreateContextFnOptions) => context,
    });
  },
};

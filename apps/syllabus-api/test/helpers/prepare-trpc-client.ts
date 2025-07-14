import { env } from "cloudflare:test";
import { type DrizzleClient, drizzleClient } from "@src/libs/drizzle-orm/clients";
import { createContext } from "@src/libs/trpc/context";
import { createCallerFactory } from "@src/libs/trpc/trpc";
import { appRouter } from "@src/routers/app-router";
import { container } from "tsyringe";

/**
 * prepare trpc client for testing
 */
export const prepareTrpcClient = async ({
  databaseClient,
  overrideEnv,
}: {
  databaseClient?: DrizzleClient;
  overrideEnv?: Cloudflare.Env;
}) => {
  // Use the provided environment override or fallback to the default test environment
  const resolvedEnv = overrideEnv || env;

  // Create a child container to isolate test dependencies
  const childContainer = container.createChildContainer();
  childContainer.register<DrizzleClient>("DrizzleClient", {
    useValue: databaseClient || drizzleClient(env.DATABASE_URL),
  });

  // Create tRPC context with the resolved environment and isolated container
  const context = await createContext({ env: resolvedEnv, container: childContainer });

  // Initialize the app router with the test context
  const routes = appRouter(context);

  // Create a caller factory for making tRPC calls in tests
  const callerCreator = createCallerFactory(routes);
  return callerCreator(context);
};

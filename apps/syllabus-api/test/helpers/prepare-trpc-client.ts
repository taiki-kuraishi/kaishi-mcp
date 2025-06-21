import { createContext } from "@src/libs/trpc/context";
import { createCallerFactory } from "@src/libs/trpc/trpc";
import { appRouter } from "@src/routers/app-router";

export const prepareTrpcClient = async ({ env }: Parameters<typeof createContext>[0]) => {
  const callerCreator = createCallerFactory(appRouter);
  const ctx = await createContext({ env });
  return callerCreator(ctx);
};

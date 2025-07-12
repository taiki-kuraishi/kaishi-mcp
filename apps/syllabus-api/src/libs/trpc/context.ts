// https://github.com/ben-xD/orth.uk/blob/main/website/blog/2023-05-14-cloudflare-workers-bindings-in-trpc/index.mdx
import { type DrizzleClient, drizzleClient } from "../drizzle-orm/clients";

export const createContext = async ({
  env,
  dbClient,
}: {
  env: Cloudflare.Env;
  dbClient?: DrizzleClient;
}) => {
  const client = dbClient || drizzleClient(env.DATABASE_URL);

  return { env, dbClient: client };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

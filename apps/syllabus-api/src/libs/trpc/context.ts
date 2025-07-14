// https://github.com/ben-xD/orth.uk/blob/main/website/blog/2023-05-14-cloudflare-workers-bindings-in-trpc/index.mdx
import type { DependencyContainer } from "tsyringe";

export const createContext = async ({
  env,
  container,
}: {
  env: Cloudflare.Env;
  container: DependencyContainer;
}) => {
  return { env, container };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

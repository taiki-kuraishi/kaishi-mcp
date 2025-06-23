// https://github.com/ben-xD/orth.uk/blob/main/website/blog/2023-05-14-cloudflare-workers-bindings-in-trpc/index.mdx
export const createContext = async ({ env }: { env: Cloudflare.Env }) => {
  return { env };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

import type { AppRouter } from "@kaishi-mcp/syllabus-api/routers/trpc";
import { createTRPCClient, httpLink } from "@trpc/client";
import superjson from "superjson";

export interface SyllabusApiClientConfig {
  baseUrl: string;
  headers?: Record<string, string>;
}

export const createSyllabusApiTrpcClient = (config: SyllabusApiClientConfig) => {
  return createTRPCClient<AppRouter>({
    links: [
      httpLink({
        url: `${config.baseUrl}/api/v1/trpc`,
        transformer: superjson,
        headers: config.headers,
      }),
    ],
  });
};

export type SyllabusApiTrpcClient = ReturnType<typeof createSyllabusApiTrpcClient>;

import { createTRPCClient, httpLink } from "@trpc/client";
import superjson from "superjson";
import type { AppRouter } from "../types/app-router";

export const syllabusApiTrpcClient = createTRPCClient<AppRouter>({
  links: [
    httpLink({
      url: "https://d3b5833c-kaishi-syllabus-api-server.kuraishi-taiki0.workers.dev/api/v1/trpc",
      transformer: superjson,
    }),
  ],
});

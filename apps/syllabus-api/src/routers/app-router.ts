import type { Context } from "@src/libs/trpc/context";
import { procedure, router } from "src/libs/trpc/trpc";
import { syllabusRouter } from "./syllabus-router";

export const appRouter = (ctx: Context) =>
  router({
    healthCheck: procedure.query(() => {
      return { status: "ok" };
    }),
    syllabusRouter: syllabusRouter(ctx),
  });

export type AppRouter = ReturnType<typeof appRouter>;

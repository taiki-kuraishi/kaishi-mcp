import { publicProcedure, router } from "@src/libs/trpc/trpc";
import { syllabusRouter } from "./syllabus-router";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return { status: "ok" };
  }),
  syllabusRouter: syllabusRouter,
});

export type AppRouter = typeof appRouter;

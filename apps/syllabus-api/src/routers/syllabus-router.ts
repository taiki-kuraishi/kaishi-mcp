import type { DrizzleClient } from "@src/libs/drizzle-orm/clients";
import { publicProcedure, router } from "@src/libs/trpc/trpc";
import { type SelectSyllabus, Syllabus } from "@src/models/syllabus";
import { container } from "tsyringe";

export const syllabusRouter = router({
  getAll: publicProcedure.query(async (): Promise<SelectSyllabus[]> => {
    const db = container.resolve<DrizzleClient>("DrizzleClient");
    return await db.select().from(Syllabus);
  }),
});

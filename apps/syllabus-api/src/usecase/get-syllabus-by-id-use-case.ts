import type { DrizzleClient } from "@src/libs/drizzle-orm/clients";
import { type SelectSyllabus, Syllabus } from "@src/models/syllabus";
import { eq } from "drizzle-orm";

export class GetSyllabusByIdUseCase {
  public async execute({
    db,
    id,
  }: { db: DrizzleClient; id: string }): Promise<SelectSyllabus | null> {
    const result = await db.select().from(Syllabus).where(eq(Syllabus.id, id));

    if (!result[0]) {
      return null;
    }

    return result[0];
  }
}

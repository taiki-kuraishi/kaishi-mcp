import type { DrizzleClient } from "@src/libs/drizzle-orm/clients";
import { type SelectSyllabus, Syllabus } from "@src/models/syllabus";
import { eq } from "drizzle-orm";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetSyllabusByIdUseCase {
  constructor(@inject("DrizzleClient") private readonly db: DrizzleClient) {}

  public async execute({ id }: { id: string }): Promise<SelectSyllabus | null> {
    const result = await this.db.select().from(Syllabus).where(eq(Syllabus.id, id));

    if (!result[0]) {
      return null;
    }

    return result[0];
  }
}

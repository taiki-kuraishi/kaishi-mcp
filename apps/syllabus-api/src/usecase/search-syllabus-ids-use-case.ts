import { and, eq, like } from "drizzle-orm";
import type { DrizzleClient } from "src/libs/drizzle-orm/clients";
import { Syllabus } from "src/models/syllabus";
import { inject, injectable } from "tsyringe";

interface Params {
  name?: string;
  startTerm?: number;
  endTerm?: number;
  category?: string;
  credits?: string;
  dayOfWeek?: number | null;
  period?: number | null;
  location?: string;
  isCompulsory?: boolean;
  description?: string;
  learningObjectives?: string;
}

@injectable()
export class SearchSyllabusIdsUseCase {
  constructor(@inject("DrizzleClient") private readonly db: DrizzleClient) {}

  public async execute({
    params,
  }: {
    params: Params;
  }): Promise<string[]> {
    const result = await this.db
      .select({ id: Syllabus.id })
      .from(Syllabus)
      .where(
        and(
          params?.name ? like(Syllabus.name, `%${params.name}%`) : undefined,
          params?.startTerm ? eq(Syllabus.startTerm, params.startTerm) : undefined,
          params?.endTerm ? eq(Syllabus.endTerm, params.endTerm) : undefined,
          params?.category ? like(Syllabus.category, `%${params.category}%`) : undefined,
          params?.credits ? like(Syllabus.credits, `%${params.credits}%`) : undefined,
          params?.dayOfWeek ? eq(Syllabus.dayOfWeek, params.dayOfWeek) : undefined,
          params?.period ? eq(Syllabus.period, params.period) : undefined,
          params?.location ? like(Syllabus.location, `%${params.location}%`) : undefined,
          params?.isCompulsory ? eq(Syllabus.isCompulsory, params.isCompulsory) : undefined,
          params?.description ? like(Syllabus.description, `%${params.description}%`) : undefined,
          params?.learningObjectives
            ? like(Syllabus.learningObjectives, `%${params.learningObjectives}%`)
            : undefined,
        ),
      );

    return result.map((row) => row.id);
  }
}

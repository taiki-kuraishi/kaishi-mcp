import type { Procedure } from "@src/libs/trpc/trpc";
import type { SearchSyllabusIdsUseCase } from "@src/usecase/search-syllabus-ids-use-case";
import { inject, injectable } from "tsyringe";
import { z } from "zod";
import { AbstractTrpcController } from "./abstract-trpc-controller";

@injectable()
export class SearchSyllabusIdsController extends AbstractTrpcController {
  protected readonly inputSchema = z.object({
    name: z.string().optional(),
    startTerm: z.number().int().optional(),
    endTerm: z.number().int().optional(),
    category: z.string().optional(),
    credits: z.string().optional(),
    dayOfWeek: z.number().int().nullable().optional(),
    period: z.number().int().nullable().optional(),
    location: z.string().optional(),
    isCompulsory: z.boolean().optional(),
    description: z.string().optional(),
    learningObjectives: z.string().optional(),
  });

  public constructor(
    protected override readonly procedure: Procedure,
    @inject("SearchSyllabusIdsUseCase") private readonly useCase: SearchSyllabusIdsUseCase,
  ) {
    super(procedure);
  }

  public buildProcedure() {
    return this.procedure.input(this.inputSchema).query(async ({ input }): Promise<string[]> => {
      return await this.useCase.execute(input);
    });
  }
}

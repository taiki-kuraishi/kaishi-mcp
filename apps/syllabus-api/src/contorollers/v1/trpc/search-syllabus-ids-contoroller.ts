import type { Procedure } from "@src/libs/trpc/trpc";
import { SearchSyllabusIdsUseCase } from "@src/usecase/search-syllabus-ids-use-case";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { AbstractTrpcController } from "./abstract-trpc-controller";

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

  private readonly useCase = new SearchSyllabusIdsUseCase();

  public constructor(protected override readonly procedure: Procedure) {
    super(procedure);
  }

  public buildProcedure() {
    return this.procedure
      .input(this.inputSchema)
      .query(async ({ input, ctx }): Promise<string[]> => {
        try {
          return await this.useCase.execute({
            db: ctx.dbClient,
            params: input,
          });
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "INTERNAL_SERVER_ERROR",
          });
        }
      });
  }
}

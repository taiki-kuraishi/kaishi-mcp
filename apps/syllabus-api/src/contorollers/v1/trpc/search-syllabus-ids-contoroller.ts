import { PinoLogger } from "@src/libs/pino/logger";
import { TRPCError } from "@trpc/server";
import type { Logger } from "pino";
import type { Procedure } from "src/libs/trpc/trpc";
import { SearchSyllabusIdsUseCase } from "src/usecase/search-syllabus-ids-use-case";
import { inject, injectable } from "tsyringe";
import { z } from "zod";
import { AbstractTrpcController } from "./abstract-trpc-controller";

@injectable()
export class SearchSyllabusIdsController extends AbstractTrpcController {
  public static readonly inputSchema = z.object({
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
  private readonly logger: Logger;

  constructor(
    @inject(SearchSyllabusIdsUseCase) private readonly useCase: SearchSyllabusIdsUseCase,
    @inject(PinoLogger) logger: PinoLogger,
  ) {
    super();
    this.logger = logger.instance.child({ module: SearchSyllabusIdsController.name });
  }

  public buildProcedure(procedure: Procedure) {
    return procedure
      .input(SearchSyllabusIdsController.inputSchema)
      .query(async ({ input }): Promise<string[]> => {
        try {
          return await this.useCase.execute({
            params: input,
          });
        } catch (error) {
          this.logger.error("Failed to search syllabus IDs", { input: input, error: error });
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "INTERNAL_SERVER_ERROR",
          });
        }
      });
  }
}

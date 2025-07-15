import { PinoLogger } from "@src/libs/pino/logger";
import type { Procedure } from "@src/libs/trpc/trpc";
import type { SelectSyllabus } from "@src/models/syllabus";
import { GetSyllabusByIdUseCase } from "@src/usecase/get-syllabus-by-id-use-case";
import { TRPCError } from "@trpc/server";
import type { Logger } from "pino";
import { inject, injectable } from "tsyringe";
import { z } from "zod";
import { AbstractTrpcController } from "./abstract-trpc-controller";

@injectable()
export class GetSyllabusByIdController extends AbstractTrpcController {
  public static readonly inputSchema = z.string().uuid();
  private readonly logger: Logger;

  constructor(
    @inject(GetSyllabusByIdUseCase) private readonly useCase: GetSyllabusByIdUseCase,
    @inject(PinoLogger) logger: PinoLogger,
  ) {
    super();
    this.logger = logger.instance.child({ module: GetSyllabusByIdController.name });
  }

  public buildProcedure(procedure: Procedure) {
    return procedure
      .input(GetSyllabusByIdController.inputSchema)
      .query(async ({ input }): Promise<SelectSyllabus | null> => {
        try {
          return await this.useCase.execute({ id: input });
        } catch (error) {
          this.logger.error("Failed to get syllabus by id", { input: input, error: error });
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "INTERNAL_SERVER_ERROR",
          });
        }
      });
  }
}

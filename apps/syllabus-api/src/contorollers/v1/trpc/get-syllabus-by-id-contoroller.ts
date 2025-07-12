import type { Procedure } from "@src/libs/trpc/trpc";
import type { SelectSyllabus } from "@src/models/syllabus";
import { GetSyllabusByIdUseCase } from "@src/usecase/get-syllabus-by-id-use-case";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { AbstractTrpcController } from "./abstract-trpc-controller";

export class GetSyllabusByIdController extends AbstractTrpcController {
  protected readonly inputSchema = z.string().uuid();
  private readonly useCase = new GetSyllabusByIdUseCase();

  public constructor(protected override readonly procedure: Procedure) {
    super(procedure);
  }

  public buildProcedure() {
    return this.procedure
      .input(this.inputSchema)
      .query(async ({ input, ctx }): Promise<SelectSyllabus | null> => {
        try {
          return await this.useCase.execute({ db: ctx.dbClient, id: input });
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "INTERNAL_SERVER_ERROR",
          });
        }
      });
  }
}

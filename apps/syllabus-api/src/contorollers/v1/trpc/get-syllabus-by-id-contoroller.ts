import type { Procedure } from "@src/libs/trpc/trpc";
import type { SelectSyllabus } from "@src/models/syllabus";
import type { GetSyllabusByIdUseCase } from "@src/usecase/get-syllabus-by-id-use-case";
import { inject, injectable } from "tsyringe";
import { z } from "zod";
import { AbstractTrpcController } from "./abstract-trpc-controller";

@injectable()
export class GetSyllabusByIdController extends AbstractTrpcController {
  protected readonly inputSchema = z.string();

  public constructor(
    protected override readonly procedure: Procedure,
    @inject("GetSyllabusByIdUseCase") private readonly useCase: GetSyllabusByIdUseCase,
  ) {
    super(procedure);
  }

  public buildProcedure() {
    return this.procedure
      .input(this.inputSchema)
      .query(async ({ input }): Promise<SelectSyllabus | null> => {
        return await this.useCase.execute(input);
      });
  }
}

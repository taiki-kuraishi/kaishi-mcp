import type { Procedure, RouterInputValue } from "@src/libs/trpc/trpc";

export abstract class AbstractTrpcController {
  protected constructor(protected readonly procedure: Procedure) {}

  public abstract buildProcedure(): RouterInputValue;
}

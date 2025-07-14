import type { Procedure, RouterInputValue } from "@src/libs/trpc/trpc";

export abstract class AbstractTrpcController {
  public abstract buildProcedure(procedure: Procedure): RouterInputValue;
}

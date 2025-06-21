export declare const appRouter: import("@trpc/server").TRPCBuiltRouter<
  {
    ctx: {
      env: Cloudflare.Env;
    };
    meta: object;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: true;
  },
  import("@trpc/server").TRPCDecorateCreateRouterOptions<{
    healthCheck: import("@trpc/server").TRPCQueryProcedure<{
      input: undefined;
      output: {
        status: string;
      };
      meta: object;
    }>;
    syllabusRouter: import("@trpc/server").TRPCBuiltRouter<
      {
        ctx: {
          env: Cloudflare.Env;
        };
        meta: object;
        errorShape: import("@trpc/server").TRPCDefaultErrorShape;
        transformer: true;
      },
      import("@trpc/server").TRPCDecorateCreateRouterOptions<{
        getAll: import("@trpc/server").TRPCQueryProcedure<{
          input: undefined;
          output: {
            name: string;
            description: string;
            id: string;
            startTerm: number;
            endTerm: number;
            category: string;
            credits: string;
            dayOfWeek: number;
            period: number;
            location: string;
            isCompulsory: boolean;
            learningObjectives: string;
            version: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
          }[];
          meta: object;
        }>;
      }>
    >;
  }>
>;
export type AppRouter = typeof appRouter;

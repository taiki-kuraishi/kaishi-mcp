import type { MiddlewareHandler } from "hono";
import { container } from "tsyringe";
import type { ExtendsEnv } from "..";
import { SyllabusApiClient } from "../clients/syllabus-api-trpc-client";

export const dependencyInjectionMiddleware: MiddlewareHandler<ExtendsEnv> = async (c, next) => {
  container.registerInstance(SyllabusApiClient, new SyllabusApiClient(c.env.SYLLABUS_API_URL));

  return next();
};

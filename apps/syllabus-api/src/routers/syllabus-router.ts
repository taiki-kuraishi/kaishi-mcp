import type { Context } from "@src/libs/trpc/context";
import { GetSyllabusByIdController } from "src/contorollers/v1/trpc/get-syllabus-by-id-contoroller";
import { SearchSyllabusIdsController } from "src/contorollers/v1/trpc/search-syllabus-ids-contoroller";
import { procedure, router } from "src/libs/trpc/trpc";

export const syllabusRouter = (ctx: Context) =>
  router({
    searchSyllabusIds: ctx.container.resolve(SearchSyllabusIdsController).buildProcedure(procedure),
    getSyllabusById: ctx.container.resolve(GetSyllabusByIdController).buildProcedure(procedure),
  });

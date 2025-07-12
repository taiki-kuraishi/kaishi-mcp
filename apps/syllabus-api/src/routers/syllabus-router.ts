import { GetSyllabusByIdController } from "@src/contorollers/v1/trpc/get-syllabus-by-id-contoroller";
import { SearchSyllabusIdsController } from "@src/contorollers/v1/trpc/search-syllabus-ids-contoroller";
import { procedure, router } from "@src/libs/trpc/trpc";

export const syllabusRouter = router({
  searchSyllabusIds: new SearchSyllabusIdsController(procedure).buildProcedure(),
  getSyllabusById: new GetSyllabusByIdController(procedure).buildProcedure(),
});

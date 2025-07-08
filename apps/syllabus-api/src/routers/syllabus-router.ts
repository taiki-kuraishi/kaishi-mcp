import { GetSyllabusByIdController } from "@src/contorollers/v1/trpc/get-syllabus-by-id-contoroller";
import { SearchSyllabusIdsController } from "@src/contorollers/v1/trpc/search-syllabus-ids-contoroller";
import { router } from "@src/libs/trpc/trpc";
import { container } from "tsyringe";

export const syllabusRouter = router({
  searchSyllabusIds: container.resolve(SearchSyllabusIdsController).buildProcedure(),
  getSyllabusById: container.resolve(GetSyllabusByIdController).buildProcedure(),
});

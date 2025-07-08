import fs from "node:fs";
import { drizzle } from "drizzle-orm/node-postgres";
import { parse } from "papaparse";
import { z } from "zod";
import { Syllabus } from "../../src/models/syllabus";

const CSV_FILE_PATH = "../../packages/syllabus-scraper/data/syllabus_db_ready.csv";

const SyllabusInsertSchema = z.array(
  z.object({
    name: z.string(),
    startTerm: z.number(),
    endTerm: z.number(),
    category: z.string(),
    credits: z.string(),
    dayOfWeek: z.number().nullable(),
    period: z.number().nullable(),
    location: z.string(),
    isCompulsory: z.boolean(),
    description: z.string(),
    learningObjectives: z.string(),
    version: z.string(),
  }),
);

const main = async (dbUrl: string) => {
  // init db client
  const db = drizzle(dbUrl);

  // read seeder csv
  const csvFile = fs.readFileSync(CSV_FILE_PATH, "utf-8");
  const { data } = parse<{ [key: string]: string }>(csvFile, { header: true });

  // 空行（全ての値が空文字）の除外
  const filteredData = data.filter((row) =>
    Object.values(row).some((value) => typeof value === "string" && value.trim() !== ""),
  );

  const normalizedData = filteredData.map((row) => ({
    ...row,
    startTerm: row.startTerm !== undefined ? Number(row.startTerm) : undefined,
    endTerm: row.endTerm !== undefined ? Number(row.endTerm) : undefined,
    dayOfWeek: row.dayOfWeek !== "" ? Number(row.dayOfWeek) : null,
    period: row.period !== "" ? Number(row.period) : null,
    isCompulsory: row.isCompulsory === "true",
  }));

  // pease CSV data
  const safePersedData = SyllabusInsertSchema.safeParse(normalizedData);
  if (!safePersedData.success) {
    console.error("CSV data parsing failed:", safePersedData.error);
    return;
  }

  await db.delete(Syllabus);
  await db.insert(Syllabus).values(safePersedData.data);
};

/**
 * Run the seed script.
 *
 * DO NOT EXECUTE ON PRODUCTION
 *
 * @param dbUrl - The database URL.
 */
if (require.main === module) {
  const dbUrl = process.argv[2];
  main(dbUrl)
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error("Seeding failed:", error);
      process.exit(1);
    });
}

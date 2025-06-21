import { drizzle } from "drizzle-orm/node-postgres";
import { Syllabus } from "../../src/models/syllabus";
import { SyllabusSeeder } from "./seeders/syllabusSeeder";

const main = async (dbUrl: string) => {
  const db = drizzle(dbUrl);

  await db.delete(Syllabus);
  await db.insert(Syllabus).values(SyllabusSeeder);
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
      console.log("Seeding completed successfully.");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Seeding failed:", error);
      process.exit(1);
    });
}

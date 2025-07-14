import { drizzleClient } from "@src/libs/drizzle-orm/clients";
import { migrate } from "drizzle-orm/postgres-js/migrator";

const main = async (dbUrl: string, migrationsFolderPath: string): Promise<void> => {
  const db = drizzleClient(dbUrl);
  await migrate(db, { migrationsFolder: migrationsFolderPath });
};

/**
 * Run the migration script.
 *
 * DO NOT EXECUTE ON PRODUCTION
 *
 * @param dbUrl - The database URL.
 * @param migrationsFolderPath - The path to the migrations folder.
 */
if (require.main === module) {
  const dbUrl = process.argv[2];
  const migrationsFolderPath = process.argv[3];

  if (!dbUrl || !migrationsFolderPath) {
    console.error("Usage: node migrate.js <database-url> <migrations-folder-path>");
    process.exit(1);
  }

  main(dbUrl, migrationsFolderPath)
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error("Migration failed:", error);
      process.exit(1);
    });
}

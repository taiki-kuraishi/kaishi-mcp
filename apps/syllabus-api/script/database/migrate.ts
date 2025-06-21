import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzleClient } from "../../src/libs/drizzle-orm/clients";

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
  main(dbUrl, migrationsFolderPath)
    .then(() => {
      console.log("Migration completed successfully.");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Migration failed:", error);
      process.exit(1);
    });
}

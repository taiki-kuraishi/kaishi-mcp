import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// For singleton Drizzle client
let client: DrizzleClient | undefined = undefined;

export const drizzleClient = (database_url: string) => {
  if (client) {
    return client;
  }

  const db = postgres(database_url, { prepare: false, max: 1 });
  client = drizzle(db);
  return client;
};

export type DrizzleClient = ReturnType<typeof drizzle>;

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export const drizzleClient = (database_url: string) => {
  return drizzle(postgres(database_url, { prepare: false, max: 1 }));
};

export type DrizzleClient = ReturnType<typeof drizzle>;

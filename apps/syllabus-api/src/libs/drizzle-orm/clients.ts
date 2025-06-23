import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export const drizzleClient = (databaseUrl: string) => {
  return drizzle(postgres(databaseUrl, { prepare: false, max: 1 }));
};

export type DrizzleClient = ReturnType<typeof drizzle>;

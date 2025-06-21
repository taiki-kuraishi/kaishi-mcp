import { sql } from "drizzle-orm";
import type { DrizzleClient } from "../../src/libs/drizzle-orm/clients";

export class TransactionTestHelper {
  constructor(private readonly db: DrizzleClient) {}

  async begin(): Promise<void> {
    await this.db.execute(sql`BEGIN`);
  }

  async rollback(): Promise<void> {
    await this.db.execute(sql`ROLLBACK`);
  }
}

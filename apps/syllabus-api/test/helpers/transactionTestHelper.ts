import { sql } from "drizzle-orm";
import { container } from "tsyringe";
import { type DrizzleClient, drizzleClient } from "../../src/libs/drizzle-orm/clients";

export class TransactionTestHelper {
  public readonly db: DrizzleClient;

  constructor(readonly dbUro: string) {
    this.db = drizzleClient(dbUro);
    // override di container for transaction sharing
    container.registerInstance<DrizzleClient>("DrizzleClient", this.db);
  }

  async begin(): Promise<void> {
    await this.db.execute(sql`BEGIN`);
  }

  async rollback(): Promise<void> {
    await this.db.execute(sql`ROLLBACK`);
  }
}

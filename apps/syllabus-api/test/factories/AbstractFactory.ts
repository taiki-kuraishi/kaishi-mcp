import type { DrizzleClient } from "../../src/libs/drizzle-orm/clients";

export abstract class AbstractFactory<T> {
  constructor(protected readonly db: DrizzleClient) {}

  abstract make(override?: Partial<T>): T;
  abstract create(override?: Partial<T>): Promise<T>;
}

import { container } from "tsyringe";
import { type DrizzleClient, drizzleClient } from "../drizzle-orm/clients";

export const setupDiContainer = ({ env }: { env: Cloudflare.Env }): void => {
  if (!container.isRegistered("DrizzleClient")) {
    container.registerInstance<DrizzleClient>("DrizzleClient", drizzleClient(env.DATABASE_URL));
  }
};

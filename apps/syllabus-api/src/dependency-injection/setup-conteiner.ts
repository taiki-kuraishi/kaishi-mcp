import { type DrizzleClient, drizzleClient } from "@src/libs/drizzle-orm/clients";
import { type DependencyContainer, container } from "tsyringe";

export const setupDependencyInjectionContainer = (): DependencyContainer => {
  const childContainer = container.createChildContainer();

  childContainer.register<DrizzleClient>("DrizzleClient", {
    useFactory: () => {
      return drizzleClient(process.env.DATABASE_URL);
    },
  });

  return childContainer;
};

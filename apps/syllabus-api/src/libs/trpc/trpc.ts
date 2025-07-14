import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import type { Context } from "./context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const procedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;

export type Procedure = typeof procedure;
export type Router = typeof router;
export type RouterInputValue = Parameters<Router>[0][string];

import { createTRPCRouter } from "y/server/api/trpc";
import { todoRouter } from "./routers/todo";
import { categoryRouter } from "./routers/category";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  todo: todoRouter,
  category: categoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "y/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany();
  }),

  create: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.category.create({
      data: {
        title: input,
      },
    });
  }),
});

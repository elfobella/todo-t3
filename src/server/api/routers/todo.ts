import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "y/server/api/trpc";
import { api } from "y/utils/api";

export const todoRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.todo.findMany();
  }),

  create: publicProcedure
    .input(z.object({ title: z.string().min(1).max(220), isDone: z.boolean() }))
    .mutation(async ({ ctx, input: { isDone, title } }) => {
      return await ctx.prisma.todo.create({
        data: {
          title,
          isDone,
        },
      });
    }),

  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.todo.delete({
      where: {
        id: input,
      },
    });
  }),

  update: publicProcedure
    .input(z.object({ title: z.string(), id: z.string() }))
    .mutation(async ({ ctx, input: { title, id } }) => {
      return await ctx.prisma.todo.update({
        where: {
          id,
        },
        data: {
          title,
        },
      });
    }),
});

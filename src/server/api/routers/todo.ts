import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "y/server/api/trpc";

export const todoRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.todo.findMany();
  }),

  filteredTodo: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.todo.findMany({
        where: {
          category: {
            some: {
              id: input,
            },
          },
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

  check: publicProcedure
    .input(z.object({ isDone: z.boolean(), id: z.string() }))
    .mutation(async ({ ctx, input: { id, isDone } }) => {
      return await ctx.prisma.todo.update({
        where: {
          id,
        },
        data: {
          isDone,
        },
      });
    }),

  getByCategory: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.todo.findMany({
        where: {
          category: {
            some: {
              id: input,
            },
          },
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

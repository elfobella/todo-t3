import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "y/server/api/trpc";

export const todoRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.todo.findMany();
  }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1).max(220),
        isDone: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input: { isDone, title } }) => {
      return await ctx.prisma.todo.create({
        data: {
          title,
          isDone,
        },
      });
    }),

  filteredTodo: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.todo.findMany({
        where: {
          category: {
            every: {
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

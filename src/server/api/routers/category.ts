import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "y/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany();
  }),

  getOne: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.prisma.category.findFirst({
      where: {
        id: input,
      },
    });
  }),

  createCategory: publicProcedure
    .input(z.object({ title: z.string().min(1) }))
    .mutation(async ({ ctx, input: { title } }) => {
      return await ctx.prisma.category.create({
        data: {
          title,
        },
      });
    }),

  createTodo: publicProcedure
    .input(z.object({ title: z.string().min(1), categoryId: z.string() }))
    .mutation(async ({ ctx, input: { categoryId, title } }) => {
      return await ctx.prisma.todo.create({
        data: {
          title,
          category: {
            connect: {
              id: categoryId,
            },
          },
        },
      });
    }),

  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.category.delete({
      where: {
        id: input,
      },
    });
  }),

  create: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.category.create({
      data: {
        title: input,
      },
    });
  }),
});

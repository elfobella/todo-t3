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

  createTodo: publicProcedure
    .input(z.object({ title: z.string().min(1), id: z.string() }))
    .mutation(async ({ ctx, input: { id, title } }) => {
      const updatedCategory = await ctx.prisma.category.update({
        where: {
          id,
        },
        data: {
          todo: {
            create: {
              title: title,
            },
          },
        },
        include: {
          todo: true,
        },
      });
      return updatedCategory;
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

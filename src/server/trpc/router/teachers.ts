import { teacherReadOne } from '../../../types/teachers';
import { publicProcedure, router } from '../trpc';

export const teacherRouter = router({
  read: router({
    all: publicProcedure.query(({ ctx }) => {
      return ctx.prisma.teacher.findMany({
        select: {
          id: true,
          name: true,
        },
      });
    }),
    one: publicProcedure.input(teacherReadOne).query(({ ctx, input }) => {
      return ctx.prisma.teacher.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  }),
});

import { courseReadOne } from '../../../types/courses';
import { publicProcedure, router } from '../trpc';

export const courseRouter = router({
  read: router({
    all: publicProcedure.query(({ ctx }) => {
      return ctx.prisma.course.findMany();
    }),
    one: publicProcedure.input(courseReadOne).query(({ ctx, input }) => {
      return ctx.prisma.course.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  }),
});

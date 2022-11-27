import { Role, User } from '@prisma/client';

import { teacherReadOne } from '../../../types/teachers';
import { publicProcedure, router } from '../trpc';

export const userRouter = router({
  read: router({
    all: publicProcedure.query(({ ctx }) => {
      return (
        ctx.prisma.user.findMany({
          select: {
            id: true,
            name: true,
          },
        }) || []
      );
    }),
    one: publicProcedure.input(teacherReadOne).query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  }),
});

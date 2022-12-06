import { userReadOne } from '../../../types/users';
import { publicProcedure, router } from '../trpc';

export const userRouter = router({
  read: router({
    all: publicProcedure.query(({ ctx }) => {
      return ctx.prisma.user.findMany({}) || [];
    }),
    one: publicProcedure.input(userReadOne).query(({ ctx, input }) => {
      return ctx.prisma.user.findFirst({
        where: { id: { endsWith: input.id } },
      });
    }),
  }),
});

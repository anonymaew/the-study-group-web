import { z } from 'zod';

import { publicProcedure, router } from '../trpc';

export const companyRouter = router({
  read: router({
    one: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(({ ctx, input }) => {
        return ctx.prisma.mainCompany.findUnique({
          where: { id: input.id },
        });
      }),
  }),
});

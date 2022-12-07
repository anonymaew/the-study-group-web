import {
    courseCreate, courseReadOne, courseUpdateApprove, courseUpdateContent
} from '../../../types/courses';
import {
    employeeProcedure, protectedProcedure, publicProcedure, router, teacherProcedure,
    writeCourseProcedure
} from '../trpc';

export const courseRouter = router({
  create: teacherProcedure
    .input(courseCreate)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.teacherEnrollment.create({
        data: {
          course: {
            create: {
              page: {
                create: {
                  name: input.name,
                },
              },
              company: {
                connect: {
                  id: input.companyId,
                },
              },
            },
          },
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),
  read: router({
    all: publicProcedure.query(async ({ ctx }) => {
      return await ctx.prisma.course.findMany({
        include: {
          page: true,
          teacherEnrollment: { select: { user: true } },
        },
      });
    }),
    enrolled: protectedProcedure.query(async ({ ctx }) => {
      return await ctx.prisma.course.findMany({
        where: {
          OR: [
            { teacherEnrollment: { some: { userId: ctx.session.user.id } } },
            {
              studentEnrollment: { some: { userId: ctx.session.user.id } },
              published: true,
            },
          ],
        },
        include: {
          page: true,
          teacherEnrollment: { select: { user: true } },
        },
      });
    }),
    one: publicProcedure.input(courseReadOne).query(async ({ ctx, input }) => {
      return await ctx.prisma.course.findFirst({
        where: { id: { endsWith: input.id } },
        include: {
          page: true,
          teacherEnrollment: { select: { user: true } },
        },
      });
    }),
  }),
  update: router({
    content: writeCourseProcedure
      .input(courseUpdateContent)
      .mutation(async ({ ctx, input }) => {
        return await ctx.prisma.course.update({
          where: {
            id: input.id,
          },
          data: {
            page: {
              update: input.page,
            },
          },
        });
      }),
    approve: employeeProcedure
      .input(courseUpdateApprove)
      .mutation(async ({ ctx, input }) => {
        return await ctx.prisma.course.update({
          where: {
            id: input.id,
          },
          data: {
            published: input.publish,
            approver: {
              connect: {
                id: ctx.session.user.id,
              },
            },
          },
        });
      }),
  }),
});

import {
    courseCreate, courseId, courseReadOne, courseUpdateApprove, courseUpdateContent
} from '../../../types/courses';
import {
    employeeProcedure, protectedProcedure, publicProcedure, router, teacherProcedure
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
                  author: {
                    connect: {
                      id: ctx.session.user.id,
                    },
                  },
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
          TeacherEnrollment: {
            include: {
              user: true,
            },
          },
        },
      });
    }),
    one: publicProcedure.input(courseReadOne).query(async ({ ctx, input }) => {
      return await ctx.prisma.course.findUnique({
        where: {
          id: input.id,
        },
        include: {
          page: true,
          TeacherEnrollment: {
            include: {
              user: true,
            },
          },
        },
      });
    }),
  }),
  update: router({
    content: teacherProcedure
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

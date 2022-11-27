import { courseReadOne } from '../../../types/courses';
import { protectedProcedure, publicProcedure, router } from '../trpc';

export const courseRouter = router({
  read: router({
    all: publicProcedure.query(({ ctx }) => {
      return ctx.prisma.course.findMany({
        include: {
          page: true,
          TeacherEnrollment: {
            include: {
              teacher: true,
            },
          },
        },
      });
    }),
    enrolled: protectedProcedure.query(({ ctx }) => {
      return ctx.prisma.course.findMany({
        where: {
          OR: [
            {
              StudentEnrollment: {
                some: { studentId: ctx.session.user.id, status: "APPROVED" },
              },
              published: true,
            },
            {
              TeacherEnrollment: { some: { teacherId: ctx.session.user.id } },
            },
          ],
        },
      });
    }),
    one: publicProcedure.input(courseReadOne).query(({ ctx, input }) => {
      return ctx.prisma.course.findUnique({
        where: {
          id: input.id,
        },
        include: {
          page: true,
          TeacherEnrollment: {
            include: {
              teacher: true,
            },
          },
        },
      });
    }),
  }),
});

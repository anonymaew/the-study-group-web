import { courseId } from '../../../types/courses';
import { lessonCreate, lessonId, lessonUpdate } from '../../../types/lessons';
import { protectedProcedure, publicProcedure, router, teacherProcedure } from '../trpc';

export const lessonsRouter = router({
  create: teacherProcedure
    .input(lessonCreate)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.lesson.create({
        data: {
          course: {
            connect: {
              id: input.courseId,
            },
          },
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
        },
      });
    }),
  read: router({
    all: publicProcedure.input(courseId).query(({ ctx, input }) => {
      return ctx.prisma.lesson.findMany({
        where: {
          courseId: input,
        },
      });
    }),
    one: publicProcedure.input(lessonId).query(({ ctx, input }) => {
      return ctx.prisma.lesson.findUnique({
        where: {
          id: input,
        },
      });
    }),
  }),
  update: teacherProcedure
    .input(lessonUpdate)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.lesson.update({
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
});

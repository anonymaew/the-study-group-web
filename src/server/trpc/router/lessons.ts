import { z } from 'zod';

import { courseId } from '../../../types/courses';
import { lessonCreate, lessonId, lessonUpdate } from '../../../types/lessons';
import {
    protectedProcedure, publicProcedure, readCourseProcedure, router, teacherProcedure,
    writeCourseProcedure
} from '../trpc';

export const lessonsRouter = router({
  create: writeCourseProcedure
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
            },
          },
        },
      });
    }),
  read: router({
    all: readCourseProcedure
      .input(z.object({ courseId }))
      .query(({ ctx, input }) => {
        return ctx.prisma.lesson.findMany({
          where: {
            courseId: input.courseId,
          },
        });
      }),
    one: readCourseProcedure
      .input(
        z.object({
          courseId,
          lessonId,
        })
      )
      .query(({ ctx, input }) => {
        return ctx.prisma.lesson.findUnique({
          where: {
            id: input.lessonId,
          },
        });
      }),
  }),
  update: writeCourseProcedure
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

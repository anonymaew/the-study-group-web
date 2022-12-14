import superjson from 'superjson';
import { z } from 'zod';

import { initTRPC, TRPCError } from '@trpc/server';

import { courseId } from '../../types/courses';

import type { Context } from "./context";
const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure;

/**
 * Reusable middleware to ensure
 * users are logged in
 */
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

/**
 * Protected procedure
 **/
export const protectedProcedure = t.procedure.use(isAuthed);

const roles = {
  STUDENT: 1,
  TEACHER: 2,
  EMPLOYEE: 3,
  ADMIN: 4,
};

export const teacherProcedure = t.procedure
  .use(isAuthed)
  .use(async ({ ctx, next }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
    });
    if (!user || roles[user.role] < roles.TEACHER)
      throw new TRPCError({ code: "UNAUTHORIZED", cause: "Not a teacher" });
    return next();
  });

export const employeeProcedure = t.procedure
  .use(isAuthed)
  .use(async ({ ctx, next }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
    });
    if (!user || roles[user.role] < roles.EMPLOYEE)
      throw new TRPCError({ code: "UNAUTHORIZED", cause: "Not an employee" });
    return next();
  });

export const adminProcedure = t.procedure
  .use(isAuthed)
  .use(async ({ ctx, next }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
    });
    if (!user || roles[user.role] < roles.ADMIN)
      throw new TRPCError({ code: "UNAUTHORIZED", cause: "Not an admin" });
    return next();
  });

export const writeCourseProcedure = t.procedure
  .use(isAuthed)
  .input(z.object({ courseId }))
  .use(async ({ ctx, input, next }) => {
    const result = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      include: {
        teacherEnrollment: {
          where: {
            courseId: input.courseId,
          },
        },
      },
    });
    if (
      result &&
      (result.teacherEnrollment.length > 0 ||
        roles[result.role] > roles.TEACHER)
    )
      return next();
    throw new TRPCError({ code: "UNAUTHORIZED", cause: "Not your course" });
  });

export const readCourseProcedure = t.procedure
  .use(isAuthed)
  .input(z.object({ courseId }))
  .use(async ({ ctx, input, next }) => {
    const result = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      include: {
        studentEnrollment: { where: { courseId: input.courseId } },
        teacherEnrollment: { where: { courseId: input.courseId } },
      },
    });
    if (
      result &&
      (result.studentEnrollment.length > 0 ||
        result.teacherEnrollment.length > 0 ||
        roles[result.role] > roles.TEACHER)
    )
      return next();
    throw new TRPCError({ code: "UNAUTHORIZED", cause: "Not your course" });
  });

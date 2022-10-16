// src/server/trpc/router/index.ts
import { router } from '../trpc';
import { authRouter } from './auth';
import { courseRouter } from './courses';
import { teacherRouter } from './teachers';

export const appRouter = router({
  auth: authRouter,
  course: courseRouter,
  teacher: teacherRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

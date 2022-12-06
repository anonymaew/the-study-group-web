// src/server/trpc/router/index.ts
import { router } from '../trpc';
import { authRouter } from './auth';
import { companyRouter } from './companies';
import { courseRouter } from './courses';
import { lessonsRouter } from './lessons';
import { userRouter } from './users';

export const appRouter = router({
  auth: authRouter,
  company: companyRouter,
  user: userRouter,
  course: courseRouter,
  lesson: lessonsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

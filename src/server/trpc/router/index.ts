// src/server/trpc/router/index.ts
import { router } from '../trpc';
import { authRouter } from './auth';
import { courseRouter } from './courses';
import { userRouter } from './users';

export const appRouter = router({
  auth: authRouter,
  course: courseRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

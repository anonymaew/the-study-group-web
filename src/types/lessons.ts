import { z } from 'zod';

import { courseId } from './courses';
import { page } from './pages';

export const lessonId = z.string();

export const lessonCreate = z.object({
  courseId: courseId,
  name: z.string(),
});

export const lessonUpdate = z.object({
  id: lessonId,
  page: page,
});

import { z } from 'zod';

import { page } from './pages';

export const courseId = z.string();
export const courseName = z.string().min(1, { message: "Please put a name" });

export const courseCreate = z.object({
  name: courseName,
  companyId: z.string(),
});

export const courseReadOne = z.object({
  id: courseId,
});

export const courseUpdateContent = z.object({
  courseId,
  page: page,
});

export const courseUpdateApprove = z.object({
  id: courseId,
  publish: z.boolean(),
});

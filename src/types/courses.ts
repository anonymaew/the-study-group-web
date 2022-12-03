import { z } from 'zod';

import { page } from './pages';

export const courseId = z.string();

export const courseCreate = z.object({
  name: z.string(),
  companyId: z.string(),
});

export const courseReadOne = z.object({
  id: courseId,
});

export const courseUpdateContent = z.object({
  id: courseId,
  page: page,
});

export const courseUpdateApprove = z.object({
  id: courseId,
  publish: z.boolean(),
});

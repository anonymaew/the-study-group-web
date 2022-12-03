import { z } from 'zod';

export const pageId = z.string();

export const page = z.object({
  name: z.string(),
  detail: z.string(),
});

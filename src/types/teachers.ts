import { z } from 'zod';

export const teacherReadOne = z.object({
  id: z.string(),
});

import { z } from 'zod';

export const courseReadOne = z.object({
  id: z.string(),
});

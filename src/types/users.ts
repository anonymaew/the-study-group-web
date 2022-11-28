import { z } from 'zod';

export const userReadOne = z.object({
  id: z.string(),
});

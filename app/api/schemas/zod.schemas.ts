import { z } from 'zod';

export const todoSchemaPOST = z
  .object({
    description: z
      .string({
        required_error: 'Field description is a required Field',
        invalid_type_error: 'Field description must be a string',
      })
      .trim()
      .min(1),
    complete: z
      .boolean({ invalid_type_error: 'Field complete must be a boolean' })
      .optional(),
  })
  .strict();

export const todoSchemaPUT = z
  .object({
    description: z
      .string({
        invalid_type_error: 'Field description must be a string',
      })
      .trim()
      .min(1)
      .optional(),
    complete: z.boolean({
      required_error: 'Field complete is required',
      invalid_type_error: 'Field complete must be a boolean',
    }),
  })
  .strict();

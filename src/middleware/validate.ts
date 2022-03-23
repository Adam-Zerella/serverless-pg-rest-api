import { AnyObjectSchema, ValidationError } from 'yup';

import log from '@module/log';
import ApiError from '@module/error/lib';

const logger = log.getLogger('ValidateMiddleware');

/**
 * Validate a given value against an appropriate schema.
 */
export async function validateSchema<TValue>(
  schema: AnyObjectSchema,
  value: unknown,
): Promise<TValue> {
  try {
    /** If value comes in as `null`, we need to cast it to an object to keep Yup happy. */
    return await schema.validate(value ?? {}, { stripUnknown: true });
  } catch (err) {
    if (err instanceof ValidationError) {
      logger.error({ error: err.message }, 'Failed to validate schema');
      throw new ApiError(err.message, 400);
    }

    throw err;
  }
}

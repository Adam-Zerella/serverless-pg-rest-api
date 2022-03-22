import * as yup from 'yup';

import log from '@module/log';
import ApiError from '@module/error/lib';

import type { APIGatewayProxyEvent } from 'aws-lambda';

const logger = log.getLogger('ValidateMiddleware');

interface Schemas {
  query?: yup.AnySchema;
  param?: yup.AnySchema;
  body?: yup.AnySchema;
}

async function validateSchema(schema: yup.AnySchema, value: unknown) {
  try {
    if (schema) {
      /** Value will come in as `null`, we need to cast it to an object to keep Yup happy. */
      return schema.validate(value ?? {}, { stripUnknown: true });
    }

    return null;
  } catch ({ message }: unknown) {
    logger.error({ error: message }, 'Failed to validate schema');
    throw new ApiError(message, 400);
  }
}

/**
 * Validate the request paramaters, body or querystring
 */
export async function awsValidate<TParam, TBody = null, TQuery = null>(
  event: APIGatewayProxyEvent,
  schemas: Schemas,
): Promise<{ query: TQuery; body: TBody; param: TParam }> {
  const { pathParameters, body: requestBody, queryStringParameters } = event;
  const { param: paramSchema, body: bodySchema, query: querySchema } = schemas;

  try {
    const validatedQuerystring = await validateSchema(querySchema, queryStringParameters);
    const validatedBody = await validateSchema(bodySchema, requestBody);
    const validatedParams = await validateSchema(paramSchema, pathParameters);

    logger.debug({ ctx: event }, 'Validated request');

    return {
      query: validatedQuerystring,
      body: validatedBody,
      param: validatedParams,
    };
  } catch ({ message }: unknown) {
    logger.error({ error: message, ctx: event }, 'Failed to validate request');
    throw new ApiError(message, 400);
  }
}

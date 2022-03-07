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

/**
 * Validate the request paramaters, body or querystring
 */
export async function awsValidate<TParam, TBody = null, TQuery = null>(
  event: APIGatewayProxyEvent,
  schemas: Schemas,
): Promise<{ query: TQuery; body: TBody; param: TParam }> {
  const { pathParameters, body: requestBody = {}, queryStringParameters } = event;
  const { param: paramSchema = yup.object(), body: bodySchema, query: querySchema } = schemas;

  try {
    const validatedQuerystring = await querySchema.validate(queryStringParameters ?? {});
    const validatedBody = await bodySchema.validate(requestBody);
    const validatedParams = await paramSchema.validate(pathParameters);

    logger.debug({ event }, 'Validated request');

    return {
      query: validatedQuerystring,
      body: validatedBody,
      param: validatedParams,
    };
  } catch (error) {
    logger.debug({ event }, 'Failed to validate request');

    if (error instanceof yup.ValidationError) {
      throw new ApiError('BAD_DATA', error.message);
    }
  }
}

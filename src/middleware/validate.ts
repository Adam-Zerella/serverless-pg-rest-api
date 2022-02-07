import qs from 'qs';
import * as yup from 'yup';

import log from '@module/log';
import ApiError from '@module/error/lib';

import type { AppContext } from '@module/koa/types';
import type { Next } from 'koa';

const logger = log.getLogger('ValidateMiddleware');

interface Schemas {
  query?: yup.AnySchema;
  param?: yup.AnySchema;
  body?: yup.AnySchema;
}

/**
 * Validate the request paramaters, body or querystring
 */
export default function (schemas: Schemas) {
  return async function validationMiddleware(ctx: AppContext, next: Next) {
    const { request, params = {} } = ctx;
    const { querystring = '', body = null } = request;

    const {
      param: paramSchema = yup.object(),
      body: bodySchema,
      query: querySchema,
    } = schemas;

    try {
      if (bodySchema) {
        const validatedBody = await bodySchema.validate(body);

        ctx.body = validatedBody;
      }

      if (querySchema) {
        const parsedQuerystring = qs.parse(querystring);
        const validatedQuerystring = await querySchema.validate(
          parsedQuerystring,
        );

        ctx.state.query = validatedQuerystring;
      }

      const validatedParams = await paramSchema.validate(params);
      ctx.params = validatedParams;

      logger.debug({ ctx }, 'Validated request');

      await next();
    } catch (error) {
      logger.debug({ ctx }, 'Failed to validate request');

      if (error instanceof yup.ValidationError) {
        throw new ApiError('BAD_DATA', error.message);
      }
    }
  };
}

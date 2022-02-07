import { Next } from 'koa';

import log from '@module/log';
import { handleError } from '@middleware/error';

import type { AppContext } from '@module/koa/types';

interface MetaResponse {
  links: { prev: string | null; next: string | null };
  limit: number;
  count: number;
  total: number;
}

/** @TODO Meta types here */
type HandlerFn = (ctx: AppContext) => Promise<{ data: unknown; meta?: MetaResponse }>;

const logger = log.getLogger('HandlerFnMiddleware');

export default function (handlerFn: HandlerFn) {
  return async function (ctx: AppContext, next: Next) {
    await next();

    try {
      logger.debug('Running handler');

      const { data, meta = null } = await handlerFn(ctx);

      ctx.status = 200;
      ctx.body = {
        data,
        meta,
      };
    } catch (err) {
      /** We wrap and return here as, for an unknown reason in Koa,
       * throw errors here isn't bubbling up to the error middleware.
       *
       * @TODO Create a DB wrapper so that we throw seprate types of Errors for Knex.
       */
      handleError(ctx, err);
    }
  };
}

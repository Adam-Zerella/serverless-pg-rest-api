import { Context, Next } from 'koa';
import { v4 as uuidv4 } from 'uuid';

import log from '@module/log';

const logger = log.getLogger('TraceMiddleware');

/**
 * Attach a unique ID to each request that comes in, mostly for tracability.
 */
export default function rquidMiddleware() {
  return async function (ctx: Context, next: Next) {
    ctx.state.rquid = uuidv4();

    logger.debug({ ctx }, 'Attached unique ID to request state');

    await next();
  };
}

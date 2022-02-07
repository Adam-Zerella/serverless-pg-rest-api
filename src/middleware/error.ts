import { Next } from 'koa';

import log from '@module/log';
import ApiError from '@module/error/lib';

import type { AppContext } from '@module/koa/types';

export const wrapError = (ctx: AppContext, msg: string, status: number) => {
  ctx.status = status;
  ctx.body = {
    error: msg.toString(),
    success: false,
  };
};

export function handleError(ctx: AppContext, err: unknown) {
  if (err instanceof ApiError) {
    const { message, type } = err;

    ctx.type = 'json';

    switch (type) {
      case 'AUTH_INVALID': {
        wrapError(ctx, message, 403);
        break;
      }
      case 'AUTH_PERMISSION': {
        wrapError(ctx, message, 403);
        break;
      }
      case 'AUTH_MISSING_JWT': {
        wrapError(ctx, message, 403);
        break;
      }
      case 'BAD_DATA': {
        wrapError(ctx, message, 400);
        break;
      }
      case 'NO_RESOURCE': {
        wrapError(ctx, message, 404);
        break;
      }
      case 'NO_ROUTE': {
        wrapError(ctx, message, 404);
        break;
      }
      default:
        wrapError(ctx, message, 500);
    }
  } else {
    if (err instanceof Error) {
      logger.error({ ctx }, err.message);

      ctx.app.emit('error', err, ctx);

      wrapError(ctx, err.message, 500);
    }
  }
}

const logger = log.getLogger('ErrorMiddleware');

export default function errorHandlerMiddleware() {
  return async function (ctx: AppContext, next: Next) {
    try {
      await next();
    } catch (err) {
      handleError(ctx, err);
    }
  };
}

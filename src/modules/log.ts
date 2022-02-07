import { pino } from 'pino';

import env from '@module/env';

import type { AppContext } from '@module/koa/types';

const isProd = env.NODE_ENV === 'production';
const isTest = env.NODE_ENV === 'test';

function getLogger(name: string) {
  return pino({
    level: env.LOG_LEVEL,
    name,
    // nestedKey: 'state',
    base: undefined,
    enabled: !isTest,
    serializers: {
      ctx: ({ state, header }: AppContext) => {
        return {
          rquid: state.rquid,
          agent: header['user-agent'],
          // ...(state.user && {
          //   user: {
          //     ...state.user,
          //     /** Can also redact with `pinoio` */
          //     ...(state.user?.password && { password: '[REDACTED]' }),
          //     ...(state.user?.token && { token: '[REDACTED]' }),
          //     ...(state.user?.verification_token && {
          //       verification_token: '[REDACTED]',
          //     }),
          //   },
          // }),
        };
      },
    },
    ...(!isProd &&
      !isTest && {
        transport: {
          pipeline: [
            {
              target: 'pino-pretty',
            },
          ],
        },
      }),
  });
}

export default {
  getLogger,
};

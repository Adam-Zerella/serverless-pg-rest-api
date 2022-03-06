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
      event: (event) => {
        return {
          event,
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

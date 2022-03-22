import { pino } from 'pino';

import env from '@module/env';

// const isProd = env.NODE_ENV === 'production';
const isTest = env.NODE_ENV === 'test';

function getLogger(name: string) {
  return pino({
    level: env.LOG_LEVEL,
    name,
    // nestedKey: 'state',
    base: undefined,
    enabled: !isTest,
    serializers: {
      ctx: ({ headers, body, requestContext }) => ({
        ['user-agent']: headers['User-Agent'],
        rquid: requestContext.requestId,
        ...(body && { body: JSON.parse(body) }),
      }),
      error: ({ message }) => ({
        message,
      }),
    },
    // ...(!isProd &&
    //   !isTest && {
    //     transport: {
    //       pipeline: [
    //         {
    //           target: 'pino-pretty',
    //         },
    //       ],
    //     },
    //   }),
  });
}

export default {
  getLogger,
};

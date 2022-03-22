import env from '@module/env';

import type { APIGatewayProxyResultV2 } from 'aws-lambda';

export function json(data: unknown, statusCode = 200): APIGatewayProxyResultV2 {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': env.CORS_ORIGIN,
    },
    body: JSON.stringify(data),
  };
}

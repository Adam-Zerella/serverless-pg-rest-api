import env from '@module/env';

import type { APIGatewayProxyResultV2 } from 'aws-lambda';

/**
 * Format our response as JSON, the structure of this is defined by the cloud provider.
 */
export function json(data: unknown, statusCode = 200): APIGatewayProxyResultV2 {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': env.CORS_ORIGIN,
    },
    body: JSON.stringify(data),
  };
}

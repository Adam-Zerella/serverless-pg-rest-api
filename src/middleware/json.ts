import type { APIGatewayProxyResultV2 } from 'aws-lambda';

export function jsonResponse(data: unknown, statusCode = 200): APIGatewayProxyResultV2 {
  return {
    statusCode,
    body: JSON.stringify(data),
  };
}

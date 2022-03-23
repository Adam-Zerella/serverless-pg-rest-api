import { json } from './json';

import type { APIGatewayProxyResultV2 } from 'aws-lambda';

/**
 * Wraps a handler function, primary purpose is to be
 * an error middleware.
 */
export async function handler(callback: () => Promise<APIGatewayProxyResultV2>) {
  try {
    return await callback();
  } catch (err) {
    return json({ error: err.message }, err.statusCode);
  }
}

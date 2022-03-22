// import ApiError from '@module/error/lib';
import { json } from './json';

import type { APIGatewayProxyResultV2 } from 'aws-lambda';

export async function handler(callback: () => Promise<APIGatewayProxyResultV2>) {
  try {
    return await callback();
  } catch (err) {
    return json({ error: err.message }, err.statusCode);
  }
}

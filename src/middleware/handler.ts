// import ApiError from '@module/error/lib';
import { jsonResponse } from './json';

import type { APIGatewayProxyResultV2 } from 'aws-lambda';

export async function handler(callback: () => Promise<APIGatewayProxyResultV2>) {
  try {
    return await callback();
  } catch (err) {
    return jsonResponse({ error: err.message }, err.statusCode);
  }
}

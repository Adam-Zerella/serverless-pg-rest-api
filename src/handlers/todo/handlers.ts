import { isEmpty } from 'ramda';

import log from '@module/log';
import { awsValidate as validate } from '@middleware/validate';
import { jsonResponse } from '@middleware/json';
import { handler } from '@middleware/handler';

import {
  list,
  insertOneOrThrow,
  updateOneOrThrow,
  deleteOneOrThrow,
  findOneOrThrow,
} from './persistence';
import * as todoSchemas from './schemas';

import type { APIGatewayProxyEvent } from 'aws-lambda';
import type { TodoBody, TodoParam, TodoQuery } from './schemas';

const logger = log.getLogger('TodoHandler');

export async function findAll(awsEvent: APIGatewayProxyEvent) {
  return handler(async () => {
    const { query } = await validate<null, null, TodoQuery>(awsEvent, todoSchemas.findAll);

    logger.info({ ctx: awsEvent }, `Searching records`);

    const { data, meta } = await list(awsEvent, query);
    return jsonResponse({ data, meta });
  });
}

export async function findById(awsEvent: APIGatewayProxyEvent) {
  return handler(async () => {
    const { param } = await validate<TodoParam>(awsEvent, todoSchemas.findById);
    const { todoId } = param;

    logger.info({ ctx: awsEvent }, `Finding record with ID '${todoId}'`);

    const result = await findOneOrThrow(todoId);
    if (isEmpty(result)) {
      return jsonResponse({ data: null }, 404);
    }

    return jsonResponse({ data: result });
  });
}

export async function create(awsEvent: APIGatewayProxyEvent) {
  return handler(async () => {
    const { body } = await validate<null, TodoBody>(awsEvent, todoSchemas.create);

    const [result] = await insertOneOrThrow({
      ...body,
    });

    logger.info({ ctx: awsEvent }, `Created record with ID '${result.id}'`);

    return jsonResponse({ data: result });
  });
}

export async function update(awsEvent: APIGatewayProxyEvent) {
  return handler(async () => {
    const { param, body } = await validate<TodoParam, TodoBody>(awsEvent, todoSchemas.update);
    const { todoId } = param;

    const record = await findOneOrThrow(todoId);
    if (isEmpty(record)) {
      return jsonResponse({ data: null }, 404);
    }

    logger.info({ ctx: awsEvent }, `Updating record with ID '${todoId}'`);

    const [result] = await updateOneOrThrow(todoId, {
      ...body,
    });

    return jsonResponse({ data: result });
  });
}

export async function remove(awsEvent: APIGatewayProxyEvent) {
  return handler(async () => {
    const { param } = await validate<TodoParam>(awsEvent, todoSchemas.remove);
    const { todoId } = param;

    await findOneOrThrow(todoId);

    logger.info({ ctx: awsEvent }, `Deleting record with ID '${todoId}'`);

    const [result] = await deleteOneOrThrow(todoId);

    return jsonResponse({ data: result });
  });
}

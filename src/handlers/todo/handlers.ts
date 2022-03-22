import { isEmpty } from 'ramda';

import log from '@module/log';
import { awsValidate as validate } from '@middleware/validate';
import { json } from '@middleware/json';
import { handler } from '@middleware/handler';

import {
  list,
  insertOneOrThrow,
  updateOneOrThrow,
  deleteOneOrThrow,
  findOneOrThrow,
} from './persistence';
import { findAllSchema, findByIdSchema, createSchema, updateSchema, removeSchema } from './schemas';

import type { APIGatewayProxyEvent } from 'aws-lambda';
import type { TodoBody, TodoParam, TodoQuery } from './schemas';

const logger = log.getLogger('TodoHandler');

export async function findAll(awsEvent: APIGatewayProxyEvent) {
  return handler(async () => {
    const { query } = await validate<null, null, TodoQuery>(awsEvent, findAllSchema);

    logger.info({ ctx: awsEvent }, `Searching records`);

    const { data, meta } = await list(awsEvent, query);
    return json({ data, meta });
  });
}

export async function findById(awsEvent: APIGatewayProxyEvent) {
  return handler(async () => {
    const { param } = await validate<TodoParam>(awsEvent, findByIdSchema);
    const { todoId } = param;

    logger.info({ ctx: awsEvent }, `Finding record with ID '${todoId}'`);

    const result = await findOneOrThrow(todoId);
    if (isEmpty(result)) {
      return json({ data: null }, 404);
    }

    return json({ data: result });
  });
}

export async function create(awsEvent: APIGatewayProxyEvent) {
  return handler(async () => {
    const { body } = await validate<null, TodoBody>(awsEvent, createSchema);

    const [result] = await insertOneOrThrow<TodoBody>({
      ...body,
    });

    logger.info({ ctx: awsEvent }, `Created record with ID '${result.id}'`);

    return json({ data: result });
  });
}

export async function update(awsEvent: APIGatewayProxyEvent) {
  return handler(async () => {
    const { param, body } = await validate<TodoParam, TodoBody>(awsEvent, updateSchema);
    const { todoId } = param;

    const record = await findOneOrThrow(todoId);
    if (isEmpty(record)) {
      return json({ data: null }, 404);
    }

    logger.info({ ctx: awsEvent }, `Updating record with ID '${todoId}'`);

    const [result] = await updateOneOrThrow<TodoBody>(todoId, body);

    return json({ data: result });
  });
}

export async function remove(awsEvent: APIGatewayProxyEvent) {
  return handler(async () => {
    const { param } = await validate<TodoParam>(awsEvent, removeSchema);
    const { todoId } = param;

    await findOneOrThrow(todoId);

    logger.info({ ctx: awsEvent }, `Deleting record with ID '${todoId}'`);

    const [result] = await deleteOneOrThrow(todoId);

    return json({ data: result });
  });
}

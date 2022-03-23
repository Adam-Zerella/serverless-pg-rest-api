import { isEmpty } from 'ramda';

import log from '@module/log';
import { validateSchema as validate } from '@middleware/validate';
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

export async function findAll(event: APIGatewayProxyEvent) {
  return handler(async () => {
    const { queryStringParameters } = event;
    const query = await validate<TodoQuery>(findAllSchema.query, queryStringParameters);

    logger.info({ ctx: event }, `Searching records`);

    const { data, meta } = await list(query);

    return json({ data, meta });
  });
}

export async function findById(event: APIGatewayProxyEvent) {
  return handler(async () => {
    const { pathParameters } = event;
    const { todoId } = await validate<TodoParam>(findByIdSchema.param, pathParameters);

    logger.info({ ctx: event }, `Finding record with ID '${todoId}'`);

    const result = await findOneOrThrow(todoId);
    if (isEmpty(result)) {
      return json({ data: null }, 404);
    }

    return json({ data: result });
  });
}

export async function create(event: APIGatewayProxyEvent) {
  return handler(async () => {
    const { body } = event;
    const data = await validate<TodoBody>(createSchema.body, body);

    const [result] = await insertOneOrThrow<TodoBody>(data);

    logger.info({ ctx: event }, `Created record with ID '${result.id}'`);

    return json({ data: result });
  });
}

export async function update(event: APIGatewayProxyEvent) {
  return handler(async () => {
    const { body, pathParameters } = event;
    const data = await validate<TodoBody>(updateSchema.body, body);
    const { todoId } = await validate<TodoParam>(updateSchema.param, pathParameters);

    const record = await findOneOrThrow(todoId);
    if (isEmpty(record)) {
      return json({ data: null }, 404);
    }

    logger.info({ ctx: event }, `Updating record with ID '${todoId}'`);

    const [result] = await updateOneOrThrow<TodoBody>(todoId, data);

    return json({ data: result });
  });
}

export async function remove(event: APIGatewayProxyEvent) {
  return handler(async () => {
    const { pathParameters } = event;
    const { todoId } = await validate<TodoParam>(removeSchema.param, pathParameters);

    await findOneOrThrow(todoId);

    logger.info({ ctx: event }, `Deleting record with ID '${todoId}'`);

    const [result] = await deleteOneOrThrow(todoId);

    return json({ data: result });
  });
}

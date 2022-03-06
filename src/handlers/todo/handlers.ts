import log from '@module/log';

import { awsValidate as validate } from '@middleware/validate';

import { list, insertOne, updateOne, deleteOne, findOneOrThrow } from './persistence';
import * as todoSchemas from './schemas';

import type { APIGatewayProxyEvent } from 'aws-lambda';
import type { TodoBody, TodoParam, TodoQuery } from './schemas';

const logger = log.getLogger('TodoHandler');

export async function findAll(event: APIGatewayProxyEvent) {
  const { query } = await validate<null, null, TodoQuery>(event, todoSchemas.findAll);

  logger.info({ event }, `Searching records`);

  const { data, meta } = await list(event, query);

  return {
    data,
    meta,
  };
}

export async function findById(event: APIGatewayProxyEvent) {
  const { param } = await validate<TodoParam>(event, todoSchemas.findById);
  const { todoId } = param;

  logger.info({ event }, `Finding record with ID '${todoId}'`);

  const result = await findOneOrThrow(todoId);

  return {
    data: result,
  };
}

export async function create(event: APIGatewayProxyEvent) {
  const { body } = await validate<null, TodoBody>(event, todoSchemas.create);

  const [result] = await insertOne({
    ...body,
  });

  logger.info({ event }, `Created record with ID '${result.id}'`);

  return {
    data: result,
  };
}

export async function update(event: APIGatewayProxyEvent) {
  const { param, body } = await validate<TodoParam, TodoBody>(event, todoSchemas.update);
  const { todoId } = param;

  await findOneOrThrow(todoId);

  logger.info({ event }, `Updating record with ID '${todoId}'`);

  const [updated] = await updateOne(todoId, {
    ...body,
  });

  return {
    data: updated,
  };
}

export async function remove(event: APIGatewayProxyEvent) {
  const { param } = await validate<TodoParam>(event, todoSchemas.remove);
  const { todoId } = param;

  await findOneOrThrow(todoId);

  logger.info({ event }, `Deleting record with ID '${todoId}'`);

  const [deleted] = await deleteOne(todoId);

  return {
    data: deleted,
  };
}

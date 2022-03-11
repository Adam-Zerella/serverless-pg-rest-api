import log from '@module/log';

import { awsValidate as validate } from '@middleware/validate';

import { list, insertOne, updateOne, deleteOne, findOneOrThrow } from './persistence';
import * as todoSchemas from './schemas';

import type { APIGatewayProxyEvent } from 'aws-lambda';
import type { TodoBody, TodoParam, TodoQuery } from './schemas';

const logger = log.getLogger('TodoHandler');

export async function findAll(awsEvent: APIGatewayProxyEvent) {
  const { query } = await validate<null, null, TodoQuery>(awsEvent, todoSchemas.findAll);

  logger.info({ awsEvent }, `Searching records`);

  const { data, meta } = await list(awsEvent, query);

  return {
    data,
    meta,
  };
}

export async function findById(awsEvent: APIGatewayProxyEvent) {
  const { param } = await validate<TodoParam>(awsEvent, todoSchemas.findById);
  const { todoId } = param;

  logger.info({ awsEvent }, `Finding record with ID '${todoId}'`);

  const result = await findOneOrThrow(todoId);

  return {
    data: result,
  };
}

export async function create(awsEvent: APIGatewayProxyEvent) {
  const { body } = await validate<null, TodoBody>(awsEvent, todoSchemas.create);

  const [result] = await insertOne({
    ...body,
  });

  logger.info({ awsEvent }, `Created record with ID '${result.id}'`);

  return {
    data: result,
  };
}

export async function update(awsEvent: APIGatewayProxyEvent) {
  const { param, body } = await validate<TodoParam, TodoBody>(awsEvent, todoSchemas.update);
  const { todoId } = param;

  await findOneOrThrow(todoId);

  logger.info({ awsEvent }, `Updating record with ID '${todoId}'`);

  const [updated] = await updateOne(todoId, {
    ...body,
  });

  return {
    data: updated,
  };
}

export async function remove(awsEvent: APIGatewayProxyEvent) {
  const { param } = await validate<TodoParam>(awsEvent, todoSchemas.remove);
  const { todoId } = param;

  await findOneOrThrow(todoId);

  logger.info({ awsEvent }, `Deleting record with ID '${todoId}'`);

  const [deleted] = await deleteOne(todoId);

  return {
    data: deleted,
  };
}

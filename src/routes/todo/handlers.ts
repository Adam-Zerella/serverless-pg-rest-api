import log from '@module/log';

import {
  list,
  insertOne,
  updateOne,
  deleteOne,
  findOrThrow,
} from './persistence';

import type { AppContext } from '@module/koa/types';
import type { TodoBody, TodoParam, TodoQuery } from './schemas';

const logger = log.getLogger('TodoHandler');

export async function findAll(ctx: AppContext<null, null, TodoQuery>) {
  const { state } = ctx;
  const { query } = state;

  logger.info({ ctx }, `Searching records`);

  const { data, meta } = await list(ctx, query);

  return {
    data,
    meta,
  };
}

export async function findById(ctx: AppContext<TodoParam>) {
  const { params } = ctx;
  const { todoId } = params;

  logger.info({ ctx }, `Finding record with ID '${todoId}'`);

  const result = await findOrThrow(todoId);

  return {
    data: result,
  };
}

export async function create(ctx: AppContext<null, TodoBody>) {
  const { body } = ctx;

  const [result] = await insertOne({
    ...body,
  });

  logger.info({ ctx }, `Created record with ID '${result.id}'`);

  return {
    data: result,
  };
}

export async function update(ctx: AppContext<TodoBody, TodoParam>) {
  const { body, params } = ctx;
  const { todoId } = params;

  await findOrThrow(todoId);

  logger.info({ ctx }, `Updating record with ID '${todoId}'`);

  const [updated] = await updateOne(todoId, {
    ...body,
  });

  return {
    data: updated,
  };
}

export async function remove(ctx: AppContext<TodoParam>) {
  const { params } = ctx;
  const { todoId } = params;

  await findOrThrow(todoId);

  logger.info({ ctx }, `Deleting record with ID '${todoId}'`);

  const [deleted] = await deleteOne(todoId);

  return {
    data: deleted,
  };
}

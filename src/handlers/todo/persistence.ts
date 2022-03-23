import ApiError from '@module/error/lib';
import db from '@module/db/lib';
import log from '@module/log';
import { MAX_RECORD_LIMIT } from '@module/db/constants';

import type { TodoQuery } from './schemas';

const logger = log.getLogger('TodoPersistence');

export async function list(filters: TodoQuery) {
  try {
    const { page, sort } = filters;

    const { data, pagination } = await db('todo')
      .orderBy('todo.id', sort)
      .paginate({ currentPage: page, perPage: MAX_RECORD_LIMIT });

    return {
      data,
      meta: {
        ...pagination,
      },
    };
  } catch (err) {
    logger.error({ error: err }, 'Failed to query DB');
    throw new ApiError('Failed to list records', 500);
  }
}

export async function findOneOrThrow(todoId: string) {
  try {
    return await db('todo').where({ id: todoId }).first();
  } catch (err) {
    logger.error({ error: err }, 'Failed to query DB');
    throw new ApiError('Failed to find record', 500);
  }
}

export async function insertOneOrThrow<TQuery>(query: TQuery) {
  try {
    return await db('todo').insert(query).returning('*');
  } catch (err) {
    logger.error({ error: err }, 'Failed to query DB');
    throw new ApiError('Failed to insert record', 500);
  }
}

export async function updateOneOrThrow<TQuery>(todoId: string, query: TQuery) {
  try {
    return await db('todo').update(query).where({ id: todoId }).returning('*');
  } catch (err) {
    logger.error({ error: err }, 'Failed to query DB');
    throw new ApiError('Failed to update record', 500);
  }
}

export async function deleteOneOrThrow(todoId: string) {
  try {
    return await db('todo').where({ id: todoId }).delete().returning('*');
  } catch (err) {
    logger.error({ error: err }, 'Failed to query DB');
    throw new ApiError('Failed to delete record', 500);
  }
}

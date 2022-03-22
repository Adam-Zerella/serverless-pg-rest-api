import ApiError from '@module/error/lib';
import db from '@module/db/lib';
import { MAX_RECORD_LIMIT } from '@module/db/constants';
import { calculateOffset, paginateData } from '@module/rest/paginate/lib';

import type { TodoQuery } from './schemas';
import type { APIGatewayProxyEvent } from 'aws-lambda';
import log from '@module/log';

const logger = log.getLogger('TodoPersistence');

export async function list(event: APIGatewayProxyEvent, filters: TodoQuery) {
  try {
    const { page, sort } = filters;
    const { requestContext, headers } = event;
    const { resourcePath } = requestContext;
    const origin = headers['Origin'];

    const [{ count: totalRecords }] = await db('todo')
      .modify(function (queryBuilder) {
        if (sort !== null) {
          queryBuilder.orderBy('todo.id', sort);
        }
      })
      .count();

    const rangeOffset = calculateOffset(page);
    const records = await db('todo')
      .modify(function (queryBuilder) {
        if (sort !== null) {
          queryBuilder.orderBy('todo.id', sort);
        }
      })
      .limit(MAX_RECORD_LIMIT)
      .offset(rangeOffset);

    const paginatedResults = paginateData(
      records,
      Number(totalRecords),
      page,
      origin,
      resourcePath,
      filters,
    );

    return paginatedResults;
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

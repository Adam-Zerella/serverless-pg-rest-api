import { isEmpty } from 'ramda';

import ApiError from '@module/error/lib';
import db from '@module/db/lib';
import { MAX_RECORD_LIMIT } from '@module/db/constants';
import { calculateOffset, paginateData } from '@module/rest/paginate/lib';

import type { TodoQuery } from './schemas';
import type { APIGatewayProxyEvent } from 'aws-lambda';

export async function list(event: APIGatewayProxyEvent, filters: TodoQuery) {
  const { page, sort, is_enabled } = filters;
  const { headers = '', path } = event;

  const [{ count: totalRecords }] = await db('todo').count();

  const rangeOffset = calculateOffset(page);

  const records = await db('todo')
    .modify(function (queryBuilder) {
      if (sort !== null) {
        queryBuilder.orderBy('todo.id', sort);
      }
    })
    .modify(function (queryBuilder) {
      if (is_enabled !== null)
        queryBuilder.andWhere({
          'todo.is_blacklisted': is_enabled,
        });
    })
    .limit(MAX_RECORD_LIMIT)
    .offset(rangeOffset);

  const paginatedResults = paginateData(records, Number(totalRecords), page, origin, path, filters);

  return paginatedResults;
}

export async function findOneOrThrow(todoId: string) {
  const result = await db('todo').where({ id: todoId }).first();

  if (isEmpty(result)) {
    throw new ApiError('NO_RESOURCE', 'Record does not exist');
  }
  return result;
}

/** @TODO insertOneOrThrow */
export async function insertOne(query: object) {
  return await db('todo')
    .insert({ ...query })
    .returning('*');
}

/** @TODO updateOneOrThrow */
export async function updateOne(todoId: string, query: object) {
  return await db('todo')
    .update({ ...query })
    .where({ id: todoId })
    .returning('*');
}

/** @TODO deleteOneOrThrow */
export async function deleteOne(todoId: string) {
  return await db('todo').where({ id: todoId }).delete().returning('*');
}

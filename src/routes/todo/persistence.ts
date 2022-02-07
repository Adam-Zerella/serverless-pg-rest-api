import { isEmpty } from 'ramda';

import ApiError from '@module/error/lib';
import db from '@module/db/lib';
import { MAX_RECORD_LIMIT } from '@module/db/constants';
import { calculateOffset, paginateData } from '@module/paginate/lib';

import type { AppContext } from '@module/koa/types';
import type { TodoQuery } from './schemas';

export async function list(ctx: AppContext, filters: TodoQuery) {
  const { page, sort, is_enabled } = filters;
  const { origin, path, query } = ctx;

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

  const paginatedResults = paginateData(
    records,
    Number(totalRecords),
    page,
    origin,
    path,
    query,
  );

  return paginatedResults;
}

export async function findOne(query: object) {
  return await db('todo')
    .where({ ...query })
    .first();
}

export async function findOrThrow(todoId: string) {
  const result = await db('todo').where({ id: todoId }).first();

  if (isEmpty(result)) {
    throw new ApiError('NO_RESOURCE', 'Record does not exist');
  }
  return result;
}

export async function insertOne(query: object) {
  return await db('todo')
    .insert({ ...query })
    .returning('*');
}

export async function updateOne(todoId: string, query: object) {
  return await db('todo')
    .update({ ...query })
    .where({ id: todoId })
    .returning('*');
}

export async function deleteOne(todoId: string) {
  return await db('todo').where({ id: todoId }).delete().returning('*');
}

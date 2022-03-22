import { object, string, number, InferType } from 'yup';

import { SORT_DIRECTION } from '@module/db/constants';

export type TodoParam = InferType<typeof findById['param']>;
export type TodoBody = InferType<typeof create['body']>;
export type TodoQuery = InferType<typeof findAll['query']>;

export const findAll = {
  query: object({
    page: number().min(1).default(1).max(99),
    sort: string()
      .nullable()
      .default(null)
      .oneOf([...SORT_DIRECTION, null]),
  }),
};

export const findById = {
  param: object({
    todoId: string().uuid().required(),
  }),
};

export const create = {
  body: object({
    label: string().required(),
  }),
};

export const update = {
  param: object({
    todoId: string().uuid().required(),
  }),
  body: object({
    label: string(),
  }),
};

export const remove = {
  param: object({
    todoId: string().uuid().required(),
  }),
};

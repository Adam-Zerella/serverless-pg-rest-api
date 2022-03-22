import { object, string, number, InferType } from 'yup';

import { SORT_DIRECTION } from '@module/db/constants';

export type TodoParam = InferType<typeof findByIdSchema['param']>;
export type TodoBody = InferType<typeof createSchema['body']>;
export type TodoQuery = InferType<typeof findAllSchema['query']>;

export const findAllSchema = {
  query: object({
    page: number().min(1).default(1).max(99),
    sort: string()
      .nullable()
      .default(null)
      .oneOf([...SORT_DIRECTION, null]),
  }),
};

export const findByIdSchema = {
  param: object({
    todoId: string().uuid().required(),
  }),
};

export const createSchema = {
  body: object({
    label: string().required(),
  }),
};

export const updateSchema = {
  param: object({
    todoId: string().uuid().required(),
  }),
  body: object({
    label: string(),
  }),
};

export const removeSchema = {
  param: object({
    todoId: string().uuid().required(),
  }),
};

import * as yup from 'yup';

import { SORT_DIRECTION } from '@module/db/constants';

export type TodoParam = yup.InferType<typeof findById['param']>;
export type TodoBody = yup.InferType<typeof create['body']>;
export type TodoQuery = yup.InferType<typeof findAll['query']>;

export const findAll = {
  query: yup.object().shape({
    page: yup.number().min(1).default(1).max(99),
    sort: yup
      .string()
      .nullable()
      .default(null)
      .oneOf([...SORT_DIRECTION, null]),
  }),
  param: yup.object(),
};

export const findById = {
  param: yup.object().shape({
    todoId: yup.string().uuid().required(),
  }),
};

export const create = {
  param: yup.object(),
  body: yup.object().shape({
    label: yup.string().required(),
  }),
};

export const update = {
  param: yup.object().shape({
    todoId: yup.string().uuid().required(),
  }),
  body: yup.object().shape({
    label: yup.string(),
  }),
};

export const remove = {
  param: yup.object().shape({
    todoId: yup.string().uuid().required(),
  }),
};

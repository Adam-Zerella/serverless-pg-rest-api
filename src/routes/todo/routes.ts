import Router from '@koa/router';

import validate from '@middleware/validate';
import handlerFn from '@middleware/handler';

import * as todoSchemas from './schemas';
import { findAll, findById, create, update, remove } from './handlers';

const router = new Router();

router.get(
  '/',
  // authenticate,
  validate(todoSchemas['findAll']),
  handlerFn(findAll),
);

router.get(
  '/:todoId',
  // authenticate,
  validate(todoSchemas['findById']),
  handlerFn(findById),
);

router.post(
  '/',
  // authenticate,
  validate(todoSchemas['create']),
  handlerFn(create),
  // audit,
);

router.put(
  '/:todoId',
  // authenticate,
  validate(todoSchemas['update']),
  handlerFn(update),
  // audit,
);

router.delete(
  '/:todoId',
  // authenticate,
  validate(todoSchemas['remove']),
  handlerFn(remove),
  // audit,
);

export default router;

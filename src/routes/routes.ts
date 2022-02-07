import Router from '@koa/router';

import todoRouter from './todo/routes';
import utilityRouter from './utility/routes';

const router = new Router({ prefix: '/v1' });

router.use('/', utilityRouter.routes());
router.use('/todos', todoRouter.routes());

export default router;

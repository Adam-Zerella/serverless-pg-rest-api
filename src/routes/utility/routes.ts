import Router from '@koa/router';

import log from '@module/log';

const router = new Router();

const logger = log.getLogger('Healthcheck');

router.get('healthzzz', (ctx) => {
  logger.info({ ctx }, 'Probed');

  ctx.body = 'OK';
});

export default router;

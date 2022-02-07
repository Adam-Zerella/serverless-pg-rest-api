import Koa from 'koa';
import helmet from 'koa-helmet';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';

import env from '@module/env';
import log from '@module/log';
import router from '@route/routes';
import rquid from '@middleware/rquid';
import errorHandler from '@middleware/error';

const app = new Koa();
const logger = log.getLogger('Server');

/** So that we swallow thrown errors */
app.silent = true;

app.use(helmet());
app.use(rquid());
app.use(errorHandler());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
  }),
);
app.use(bodyParser());
app.use(router.routes());

app.listen(env.PORT);

logger.info(`Server started at http://0.0.0.0:${env.PORT}`);

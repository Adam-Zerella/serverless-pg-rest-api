import { knex } from 'knex';
import { attachPaginate } from 'knex-paginate';

import omit from 'ramda/src/omit';

import env from '@module/env';
import log from '@module/log';

const logger = log.getLogger('DB');

/** Attaches a `.paginate()` function to Knex' query builder */
attachPaginate();

export default knex({
  client: 'pg',
  connection: env.DB_URI,
  debug: env.NODE_ENV === 'production',

  pool: {
    max: 1,
    min: 1,
    destroyTimeoutMillis: 30000,
  },

  log: {
    debug(msg) {
      logger.debug(msg);
    },
    warn(msg) {
      logger.warn(msg);
    },
    error(msg) {
      logger.error(msg);
    },
  },

  postProcessResponse: (result) => {
    if (Array.isArray(result)) {
      const omittedResults = result.map((row) => omit(['created_at', 'updated_at'], row));
      return omittedResults;
    }

    const omittedResult = omit(['created_at', 'updated_at'], result);
    return omittedResult;
  },
});

import { Knex } from 'knex';

export default {
  client: 'pg',
  connection: process.env.DB_URI || 'postgresql://postgres:postgres@127.0.0.1:5432/todos',
  charset: 'utf8',
  seeds: {
    directory: 'migrations/seeds',
  },
  migrations: {
    tableName: 'migrations',
  },
  acquireConnectionTimeout: 10000, // 10 seconds
} as Knex.Config;

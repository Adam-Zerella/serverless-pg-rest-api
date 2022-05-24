import { Knex } from 'knex';

export default {
  client: 'pg',
  connection: process.env.DB_URI || 'postgresql://postgres:postgres@127.0.0.1:5432/todos',
  charset: 'utf8',
  /**
   * These settings were pulled blindly from to accomodate Aurora Serverless
   * @url https://medium.com/leaselock-engineering/aws-serverless-knextimeouterrors-rds-proxy-and-you-e7e0e2abd968
   */
  pool: {
    min: 0,
    max: 10,
    acquireTimeoutMillis: 30000,
    createTimeoutMillis: 1500,
    createRetryIntervalMillis: 500,
    propagateCreateError: false,
  },
  seeds: {
    directory: 'migrations/seeds',
  },
  migrations: {
    tableName: 'migrations',
  },
} as Knex.Config;

import { Knex } from 'knex';

import { TABLES } from '@modules/db/constants';

const tableNames = Object.values(TABLES).map((tableName) => `'${tableName}'`);

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`CREATE TYPE "todo_type" AS ENUM (${tableNames});`);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP TYPE IF EXISTS "todo_type"');
}

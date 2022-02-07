import { Knex } from 'knex';

import { TABLES } from '@module/db/constants';

import type { Todo } from '@route/todo/types';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLES.TODO).del();
  await knex(TABLES.TODO_HISTORY).del();

  /**
   *
   * BEGIN SEED INSERTS
   *
   */
  await knex<Todo>('todo').insert([
    {
      id: '8943662d-791a-42a0-9621-ad2dbd37865a',
      label: 'test123',
      is_enabled: false,
    },
  ]);
}

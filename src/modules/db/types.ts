import type { Todo } from 'src/handlers/todo/types';

export type TableName = 'todo';

export type TableKey = {
  [K in Uppercase<TableName>]: TableName;
};

declare module 'knex/types/tables' {
  interface Tables {
    todo: Todo;
  }
}

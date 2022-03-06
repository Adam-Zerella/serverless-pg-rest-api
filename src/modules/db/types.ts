import type { Todo, TodoHistory } from 'src/handlers/todo/types';

export type TableName = 'todo' | 'todo_history';

export type TableKey = {
  [K in Uppercase<TableName>]: TableName;
};

declare module 'knex/types/tables' {
  interface Tables {
    todo: Todo;
    todo_history: TodoHistory;
  }
}

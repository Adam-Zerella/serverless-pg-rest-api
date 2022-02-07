import type { TableKey } from './types';

export const TABLES: TableKey = {
  TODO: 'todo',
  TODO_HISTORY: 'todo_history',
};

export const MAX_RECORD_LIMIT = 50;

export type SortDirection = 'asc' | 'desc';
export const SORT_DIRECTION: SortDirection[] = ['asc', 'desc'];

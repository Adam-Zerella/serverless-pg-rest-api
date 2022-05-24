import type { TableKey } from './types';

export const TABLES: TableKey = {
  TODO: 'todo',
};

export const DATABASE_NAME = `${TABLES.TODO}s`;

export const MAX_RECORD_LIMIT = 100;

export type SortDirection = 'asc' | 'desc';
export const SORT_DIRECTION: SortDirection[] = ['asc', 'desc'];

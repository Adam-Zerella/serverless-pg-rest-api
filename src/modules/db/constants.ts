import type { TableKey } from './types';

export const TABLES: TableKey = {
  TODO: 'todo',
};

export const MAX_RECORD_LIMIT = 25;

export type SortDirection = 'asc' | 'desc';
export const SORT_DIRECTION: SortDirection[] = ['asc', 'desc'];

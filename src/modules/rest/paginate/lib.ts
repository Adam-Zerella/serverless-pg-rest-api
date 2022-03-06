import qs from 'qs';
import omit from 'ramda/src/omit';

import { MAX_RECORD_LIMIT } from '@module/db/constants';

export function calculateOffset(pageNumber: number) {
  return pageNumber * MAX_RECORD_LIMIT - MAX_RECORD_LIMIT;
}

export function calculateNextUrl(pageNumber: number, origin: string, path: string, query: object) {
  const queryParams = qs.stringify(omit(['page'], query));
  const nextPage = pageNumber + 1;

  return `${origin}${path}?${queryParams}&page=${nextPage}`;
}

export function calculatePrevUrl(pageNumber: number, origin: string, path: string, query: object) {
  const queryParams = qs.stringify(omit(['page'], query));
  const nextPage = pageNumber - 1;

  return `${origin}${path}?${queryParams}&page=${nextPage}`;
}

export function paginateData(
  records: object[],
  total: number,
  page: number,
  origin: string,
  path: string,
  query: object,
) {
  const count = records.length;
  const limit = MAX_RECORD_LIMIT;

  const nextUrl = calculateNextUrl(page, origin, path, query);
  const prevUrl = calculatePrevUrl(page, origin, path, query);

  return {
    data: records,
    meta: {
      links: {
        prev: page > 1 ? prevUrl : null,
        next: count >= limit ? nextUrl : null,
      },
      limit,
      count,
      total,
    },
  };
}

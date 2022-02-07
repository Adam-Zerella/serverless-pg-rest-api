export type ErrorType =
  | 'AUTH_INVALID'
  | 'AUTH_MISSING_JWT'
  | 'AUTH_PERMISSION'
  | 'NO_ROUTE'
  | 'NO_RESOURCE'
  | 'BAD_DATA'
  | 'NOPE';

export type ApiError = { [K in ErrorType]: ErrorType };

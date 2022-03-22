// import type { ErrorType } from './types';

export default class ApiError extends Error {
  // type: ErrorType;
  statusCode: number;

  constructor(message: string, statusCode?: number) {
    super();

    this.statusCode = statusCode || 500;
    this.message = message || 'An error occurred';
  }

  public get getMessage() {
    return this.message;
  }

  // get getType() {
  //   return this.type;
  // }

  get getStatusCode() {
    return this.statusCode;
  }
}

import type { ErrorType } from './types';

export default class ApiError extends Error {
  type: ErrorType;

  constructor(type: ErrorType, msg?: string) {
    super();

    this.type = type;
    this.message = msg || 'An error occurred';
  }

  public get getMessage() {
    return this.message;
  }

  public get getType() {
    return this.type;
  }
}

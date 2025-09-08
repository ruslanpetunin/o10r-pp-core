export enum HttpMethod {
  GET = 'get',
  DELETE = 'delete',
  POST = 'post'
}

export interface FetchOptions {
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
}

export interface FetchErrorContext {
  url: string;
  method: HttpMethod;
  requestHeaders?: Record<string, string>;
  requestData?: unknown;
  responseStatus?: number;
  responseHeaders?: Headers;
  responseData?: unknown;
}

export class FetchRequestError extends Error {
  context: FetchErrorContext;

  constructor(message: string, context: FetchErrorContext) {
    super(message);
    this.name = 'FetchRequestError';
    this.context = context;
  }
}

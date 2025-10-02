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

export interface HttpRequest {
  url: string;
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
}

export interface HttpResponse<T = unknown> {
  data: T;
  status: number;
  headers: Headers;
}

export type HttpMiddleware = <T = unknown>(
  request: HttpRequest,
  next: (req: HttpRequest) => Promise<HttpResponse<T>>
) => Promise<HttpResponse<T>>;

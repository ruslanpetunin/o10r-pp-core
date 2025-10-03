import { FetchRequestError, HttpMethod, type HttpMiddleware, type HttpRequest, type HttpResponse } from '../types/http'
import type { FetchOptions } from '../types/http';

async function coreRequest<T = unknown>(request: HttpRequest): Promise<HttpResponse<T>> {
  const { url, method, headers = {}, body } = request;

  const fetchOptions: RequestInit = {
    method,
    headers,
  };

  const isBodyShouldBeEncoded= (method === HttpMethod.POST && body);

  if (isBodyShouldBeEncoded) {
    fetchOptions.body = JSON.stringify(body);
    fetchOptions.headers = {
      'Content-Type': 'application/json',
      ...headers
    };
  }
  const response: Response = await fetch(url, fetchOptions);

  if (!response.ok) {
    throw new FetchRequestError('Fetch request failed', {
      url,
      method,
      requestHeaders: headers,
      requestData: body,
      responseStatus: response.status,
      responseHeaders: response.headers,
    });
  }

  const data = await safeJsonParse(response) as T;

  return {
    data,
    status: response.status,
    headers: response.headers,
  };
}

async function safeJsonParse(response: Response): Promise<unknown> {
  const contentType = response.headers.get('Content-Type') || '';

  try {
    if (contentType.includes('application/json')) {
      return await response.json();
    }

    return await response.text();
  } catch {
    return null;
  }
}

export default function(middleware?: HttpMiddleware) {
  const wrappedClient = (request: HttpRequest) => middleware
    ? middleware(request, coreRequest)
    : coreRequest(request);

  async function request<T = unknown>(
    url: string,
    method: HttpMethod = HttpMethod.GET,
    options: FetchOptions = {}
  ): Promise<T> {
    try {
      const response = await wrappedClient({
        url,
        method,
        headers: options.headers,
        body: options.body,
      });
      return response.data as T;
    } catch (error: unknown) {
      if (error instanceof FetchRequestError) {
        throw error;
      }
      throw new FetchRequestError('Network error occurred', {
        url,
        method,
        requestHeaders: options.headers,
        requestData: options.body,
      });
    }
  }

  return {
    request,
  };
}

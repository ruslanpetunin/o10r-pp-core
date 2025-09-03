import { FetchRequestError, HttpMethod } from '../types/http';
import type { FetchOptions } from '../types/http';

async function request<T = unknown>(
  url: string,
  method: HttpMethod = HttpMethod.GET,
  options: FetchOptions = {}
): Promise<T> {
  const { headers = {}, body } = options;

  const fetchOptions: RequestInit = { method, headers };

  if (method === HttpMethod.POST && body) {
    fetchOptions.headers['Content-Type'] = 'application/json';
    fetchOptions.body = JSON.stringify(body);
  }

  let response: Response;

  try {
    response = await fetch(url, fetchOptions);
  } catch {
    throw new FetchRequestError('Network error occurred', {
      url,
      method,
      requestHeaders: headers,
      requestData: body,
    });
  }

  const responseData = await safeJsonParse(response);

  if (!response.ok) {
    throw new FetchRequestError('Fetch request failed', {
      url,
      method,
      requestHeaders: headers,
      requestData: body,
      responseStatus: response.status,
      responseHeaders: response.headers,
      responseData,
    });
  }

  return responseData as T;
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

export default function() {
  return {
    request
  };
}

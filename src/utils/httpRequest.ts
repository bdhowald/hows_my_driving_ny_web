import { decamelizeKeys, camelizeKeys } from 'humps'

import { RequestPayloadType } from 'types/requests'

// 30 seconds
const DEFAULT_TIMEOUT_MS = 30000

const getTimeout = (method: string, apiResource: string): Promise<never> => {
  return new Promise((_, reject) =>
    setTimeout(
      () =>
        reject(
          new Error(
            `Request ${method} ${apiResource} timed out after ${DEFAULT_TIMEOUT_MS / 1000} seconds`,
          ),
        ),
      DEFAULT_TIMEOUT_MS,
    ),
  )
}

const getRequestUrl = (
  isExternalRequest: boolean,
  url: string,
  apiResource: string,
  paramString = '',
) => {
  if (isExternalRequest) {
    return `${apiResource}${paramString ? `?${paramString}` : ''}`
  }

  if (url) {
    return url
  }

  if (apiResource) {
    return `${apiResource}${paramString ? `?${paramString}` : ''}`
  }
}

async function httpRequest(
  requestData: RequestPayloadType,
  signal?: AbortSignal,
): Promise<unknown> {
  const { method, payload, apiResource, paramsObject, url, headers } =
    requestData

  if (!apiResource) {
    throw new Error('Cannot execute external fetch: apiResource is undefined.');
  }

  const requestBody = payload
    ? JSON.stringify(decamelizeKeys(payload))
    : undefined

  const isExternalRequest = Boolean(
    apiResource && apiResource.startsWith('http'),
  )

  const apiResourceForRequest = apiResource || ''

  if (isExternalRequest) {
    return Promise.race([
      fetch(apiResource),
      getTimeout(method, apiResourceForRequest),
    ]).then((response) => response.json())
  }

  const requestHeaders: Headers = new Headers({
    'Content-Type': 'application/json',
    ...headers,
  })

  const paramString =
    paramsObject && new URLSearchParams(paramsObject).toString()

  const requestUrl = getRequestUrl(
    isExternalRequest,
    url || '',
    apiResourceForRequest,
    paramString,
  )

  if (!requestUrl) {
    throw new Error('Cannot fetch: requestUrl is undefined.')
  }

  const requestObject: RequestInit = {
    cache: 'default',
    headers: requestHeaders,
    method,
    mode: 'cors' as RequestMode,
    signal: signal ?? undefined,
    body: requestBody ? requestBody : undefined,
  }
  return Promise.race([
    fetch(requestUrl, requestObject),
    getTimeout(method, apiResourceForRequest),
  ]).then(async (response: Response) => {
    const body = await response.json()
    const formattedBody = camelizeKeys(body)
    const { statusText, status, ok, url } = response
    const formattedResponse = {
      body: formattedBody,
      ok,
      status,
      statusText,
      url,
    }
    if (!ok) {
      throw formattedResponse
    }
    return formattedBody
  })
}

// Middleware allows us to wrap all httpRequest promises with a function that post-processes the
// result. For example, this can be used to watch for failed requests, and then call another function
// based on the HTTP status code. By default, promises are passed through as-is. Using applyMiddleware,
// different applications that import this httpRequest interface can override its behavior without
// changing the underlying library

const requestFactory = (
  requestData: RequestPayloadType,
  signal?: AbortSignal,
) => {
  const controller = new AbortController()
  return httpRequest(requestData, signal || controller.signal)
}

export default requestFactory

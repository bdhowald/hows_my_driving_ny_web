// @ts-ignore
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'
import { decamelizeKeys, camelizeKeys } from 'humps'
import { CANCEL } from 'redux-saga'
import { RequestPayloadType } from 'utils/entities'
// @ts-ignore
import { fetch } from 'whatwg-fetch'

import queryString from 'query-string'

const convertObjectToSearchParamsString = (paramsObject: Record<string, any>): string =>
  queryString.stringify(paramsObject)

// 30 seconds
const DEFAULT_TIMEOUT_MS = 30000

const getTimeout = (method: string, apiResource: string) => {
  return new Promise((_, reject) =>
    setTimeout(
      () =>
        reject(
          new Error(
            `Request ${method} ${apiResource} timed out after ${DEFAULT_TIMEOUT_MS / 1000} seconds`
          )
        ),
      DEFAULT_TIMEOUT_MS
    )
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
  signal?: EventTarget | void,
): Promise<any> {
  const { method, payload, apiResource, paramsObject, url, headers } = requestData

  // use native browser implementation if it supports aborting
  const abortableFetch = ('signal' in new Request('')) ? window.fetch : fetch

  const requestBody = payload ? { body: JSON.stringify(decamelizeKeys(payload)) } : {}
  const isExternalRequest = Boolean(apiResource && apiResource.startsWith('http'))

  const apiResourceForRequest = apiResource || ''

  if (isExternalRequest) {
    return Promise.race([
      abortableFetch(apiResource),
      getTimeout(method, apiResourceForRequest),
    ]).then(response => response.json())
  }

  const requestHeaders: Headers = new Headers({
    'Content-Type': 'application/json',
    ...headers,
  })

  const paramString = paramsObject && convertObjectToSearchParamsString(paramsObject)

  const requestUrl = getRequestUrl(isExternalRequest, url || '', apiResourceForRequest, paramString)
  const requestObject = Object.assign(
    {},
    {
      cache: 'default',
      headers: requestHeaders,
      method,
      mode: 'cors',
      signal,
    },
    requestBody || {},
  )
  return Promise.race([
    fetch(requestUrl, requestObject),
    getTimeout(method, apiResourceForRequest),
  ]).then(async response => {
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

let requestMiddleware = (v: any) => v

const requestFactory = (requestData: RequestPayloadType, signal?: EventTarget | void) => {
  // HACK Jest won't cooperate with AbortController polyfill unless it's applied like this
  const controller = (() => {
    try {
      return new AbortController()
    } catch (e) {
      return new AbortController()
    }
  })()
  const promise = httpRequest(requestData, signal || controller.signal)
  // @ts-ignore
  promise[CANCEL] = () => controller.abort()
  return requestMiddleware(promise)
}
requestFactory.applyMiddleware = (middleware: any) => {
  requestMiddleware = middleware
}

export default requestFactory
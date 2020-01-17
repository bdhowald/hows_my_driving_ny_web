import HTTP_METHODS from 'constants/httpMethods'

export type HttpMethod = keyof (typeof HTTP_METHODS)

export interface RequestPayloadType {
  readonly apiResource?: string
  headers?: object | void
  readonly method: HttpMethod
  paramsObject?: object | undefined
  payload?: any
  readonly url?: string
}
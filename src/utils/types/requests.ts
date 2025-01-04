import HttpMethod from 'constants/httpMethods'

export interface RequestPayloadType {
  readonly apiResource?: string
  headers?: object | void
  readonly method: HttpMethod
  paramsObject?: Record<string, string> | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
  readonly url?: string
}

export type VehicleQueryRequest = {
  fingerprintId?: string
  lookupSource: string
  mixpanelId?: string
  plate: string
}

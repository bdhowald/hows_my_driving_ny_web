import { decamelizeKeys } from 'humps'
import {
    HOWS_MY_DRIVING_NY_NEW_LOOKUP_ENDPOINT,
    HOWS_MY_DRIVING_NY_PREVIOUS_LOOKUP_ENDPOINT
} from 'constants/endpoints'
import request from 'utils/httpRequest'
import { VehicleQueryRequest } from 'utils/types/requests'
import { VehicleQueryResponse } from 'utils/types/responses'

export const getPreviousLookup = (previousLookupIdentifier: string): Promise<VehicleQueryResponse> => {
  return request({
    method: 'GET',
    url: `${HOWS_MY_DRIVING_NY_PREVIOUS_LOOKUP_ENDPOINT}${previousLookupIdentifier}`
  })
}

export const performNewLookup = (payload: VehicleQueryRequest): Promise<VehicleQueryResponse> => {
  const queryString = new URLSearchParams(decamelizeKeys(payload) as { [key: string]: string}).toString()
  return request({
    method: 'GET',
    url: `${HOWS_MY_DRIVING_NY_NEW_LOOKUP_ENDPOINT}?${queryString}`
  })
}

import { HOWS_MY_DRIVING_NY_ENDPOINT } from 'constants/endpoints'
import request from 'utils/httpRequest'
import { VehicleQueryRequest } from 'utils/types/requests'
import { VehicleQueryResponse } from 'utils/types/responses'

export const lookUpVehicle = (payload: VehicleQueryRequest): Promise<VehicleQueryResponse> => {
  const queryString = new URLSearchParams(payload as { [key: string]: string}).toString()
  return request({
    method: 'GET',
    url: `${HOWS_MY_DRIVING_NY_ENDPOINT}?${queryString}`
  })
}

import { performNewLookup } from 'boundaries/http'
import plateTypes, { PlateType } from 'constants/plateTypes'
import { VehicleQueryRequest } from 'utils/types/requests'
import { VehicleQueryResponse } from 'utils/types/responses'

const performLookup = async (
  plate: string,
  plateType: PlateType | undefined,
  state: string,
  fingerprintId?: string,
  mixpanelId?: string,
) => {
  const plateString =
    plateType && plateTypes[plateType]?.codes
      ? `${plate}:${state}:${plateTypes[plateType].codes}`
      : `${plate}:${state}`

  const requestParams: VehicleQueryRequest = {
    lookupSource: 'web_client',
    plate: plateString,
  }

  if (fingerprintId) {
    requestParams.fingerprintId = fingerprintId
  }
  if (mixpanelId) {
    requestParams.mixpanelId = mixpanelId
  }

  // Perform the search
  const response: VehicleQueryResponse = await performNewLookup(requestParams)

  return response
}

export default performLookup

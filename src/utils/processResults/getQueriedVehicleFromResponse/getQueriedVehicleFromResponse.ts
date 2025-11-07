import Vehicle from 'models/Vehicle/Vehicle'
import { VehicleQueryResponse } from 'types/responses'

const getQueriedVehicleFromResponse = (
  response: VehicleQueryResponse,
): Vehicle | undefined => {
  const { data } = response

  if (!data?.[0]) {
    return
  }

  const firstLookup = data[0]

  if (!firstLookup.successfulLookup) {
    return
  }

  return firstLookup.vehicle
}

export default getQueriedVehicleFromResponse

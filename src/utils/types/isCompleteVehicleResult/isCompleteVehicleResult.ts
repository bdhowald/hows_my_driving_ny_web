import Vehicle from 'models/Vehicle/Vehicle'
import { FailedQueryVehiclePlaceholder } from 'types/vehicleDisplayResult'

const isCompleteVehicleResult = (
  potentialVehicle: FailedQueryVehiclePlaceholder | Vehicle,
): potentialVehicle is Vehicle => {
  if ('lookupDate' in potentialVehicle) {
    return true
  }
  return false
}

export default isCompleteVehicleResult

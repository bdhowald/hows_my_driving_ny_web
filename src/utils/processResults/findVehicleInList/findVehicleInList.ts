import { VehicleDisplayResult } from 'types/vehicleDisplayResult'
import isCompleteVehicleResult from 'utils/types/isCompleteVehicleResult/isCompleteVehicleResult'

const findVehicleInList = (
  vehicleDisplayResultList: VehicleDisplayResult[],
  queriedVehicleDisplayResult: VehicleDisplayResult,
): VehicleDisplayResult | undefined => {
  // There are five different scenarios:
  //
  // 1. a queried vehicle with a complete lookup replacing another queried
  //    vehicle with a complete lookup for the same vehicle, determined by
  //    matching plate, state, and plate types
  // 2. a queried vehicle with a failed lookup replacing another queried
  //    vehicle with a failed lookup, determined by the unique identifier
  // 3. a queried vehicle with a complete lookup replacing another queried
  //    vehicle with a failed lookup, determined by the unique identifier
  // 4. a queried vehicle with a failed lookup replacing another queried
  //    vehicle with a complete lookup, determined by the unique identifier
  // 5. non-matching vehicles

  const queriedPotentialVehicle = queriedVehicleDisplayResult.vehicle

  if (isCompleteVehicleResult(queriedPotentialVehicle)) {
    return vehicleDisplayResultList.find(
      (vehicleDisplayResult: VehicleDisplayResult) => {
        if (!isCompleteVehicleResult(vehicleDisplayResult.vehicle)) {
          if (
            vehicleDisplayResult.vehicle.uniqueIdentifier ===
            queriedPotentialVehicle.uniqueIdentifier
          ) {
            // Scenario 3
            return true
          }
          return false
        }
        if (
          vehicleDisplayResult.vehicle.plate !== queriedPotentialVehicle.plate
        ) {
          return false
        }
        if (
          vehicleDisplayResult.vehicle.state !== queriedPotentialVehicle.state
        ) {
          return false
        }
        if (
          vehicleDisplayResult.vehicle.plateTypes?.toString() !==
          queriedPotentialVehicle.plateTypes?.toString()
        ) {
          return false
        }

        // Scenario 1
        return true
      },
    )
  }

  return vehicleDisplayResultList.find(
    (vehicleDisplayResult: VehicleDisplayResult) => {
      if (
        vehicleDisplayResult.vehicle.uniqueIdentifier ===
        queriedPotentialVehicle.uniqueIdentifier
      ) {
        // Scenarios 2 & 4
        return true
      }

      return false
    },
  )
}

export default findVehicleInList

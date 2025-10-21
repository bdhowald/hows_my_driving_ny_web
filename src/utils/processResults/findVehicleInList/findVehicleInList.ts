import VehicleDisplayResult from 'types/vehicleDisplayResult'

const findVehicleInList = (
  vehicleDisplayResultList: VehicleDisplayResult[],
  queriedVehicleDisplayResult: VehicleDisplayResult,
): VehicleDisplayResult | undefined =>
  vehicleDisplayResultList.find(
    (vehicleDisplayResult: VehicleDisplayResult) => {
      if (
        vehicleDisplayResult.vehicle.plate !==
        queriedVehicleDisplayResult.vehicle.plate
      ) {
        return false
      }
      if (
        vehicleDisplayResult.vehicle.state !==
        queriedVehicleDisplayResult.vehicle.state
      ) {
        return false
      }
      if (
        vehicleDisplayResult.vehicle.plateTypes?.toString() !==
        queriedVehicleDisplayResult.vehicle.plateTypes?.toString()
      ) {
        return false
      }

      return true
    },
  )

export default findVehicleInList

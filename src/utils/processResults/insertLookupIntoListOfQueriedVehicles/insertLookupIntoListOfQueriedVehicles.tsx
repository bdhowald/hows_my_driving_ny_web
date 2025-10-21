import VehicleDisplayResult from 'types/vehicleDisplayResult'

const insertLookupIntoListOfQueriedVehicles = (
  previousDisplayResultOfQueriedVehicle: VehicleDisplayResult | undefined,
  previouslyQueriedVehicleDisplayResults: VehicleDisplayResult[],
  queriedVehicleDisplayResult: VehicleDisplayResult,
): VehicleDisplayResult[] => {
  if (previousDisplayResultOfQueriedVehicle) {
    const index = previouslyQueriedVehicleDisplayResults.indexOf(
      previousDisplayResultOfQueriedVehicle,
    )

    return [
      queriedVehicleDisplayResult,
      ...previouslyQueriedVehicleDisplayResults.slice(0, index),
      ...previouslyQueriedVehicleDisplayResults.slice(index + 1),
    ]
  } else {
    return [
      queriedVehicleDisplayResult,
      ...previouslyQueriedVehicleDisplayResults,
    ]
  }
}

export default insertLookupIntoListOfQueriedVehicles

import { VehicleDisplayResult } from 'types/vehicleDisplayResult'
import getPlateTypesName from 'utils/search/getPlateType/getPlateTypeName/getPlateTypeName'
import isCompleteVehicleResult from 'utils/types/isCompleteVehicleResult/isCompleteVehicleResult'
import { ResultsFilterSet } from 'types/resultsFilters'

const filterResultsWithUserFilters = (
  vehicleDisplayResults: VehicleDisplayResult[],
  resultsFilters: ResultsFilterSet,
) => {
  const {
    numberOfViolations: numberOfViolationsFilter,
    plateText: plateTextFilter,
    plateType: plateTypeFilter,
    queryDateRange: queryDateRangeFilter,
    state: stateTextFilter,
  } = resultsFilters

  return vehicleDisplayResults.filter((vehicleDisplayResult) => {
    const vehicle = vehicleDisplayResult.vehicle
    if (!isCompleteVehicleResult(vehicle)) {
      return false
    }

    if (plateTextFilter && !vehicle.plate.includes(plateTextFilter)) {
      return false
    }

    if (stateTextFilter && vehicle.state !== stateTextFilter) {
      return false
    }

    if (queryDateRangeFilter) {
      const { endDate, startDate } = queryDateRangeFilter

      if (endDate && new Date(vehicle.lookupDateEastern) > endDate) {
        return false
      }

      if (startDate && new Date(vehicle.lookupDateEastern) < startDate) {
        return false
      }
    }

    if (plateTypeFilter) {
      const vehicleClassName = getPlateTypesName(vehicle.plateTypes)
      if (vehicleClassName !== plateTypeFilter) {
        return false
      }
    }

    if (
      numberOfViolationsFilter &&
      vehicle.violationsCount < numberOfViolationsFilter
    ) {
      return false
    }

    return true
  })
}

export default filterResultsWithUserFilters

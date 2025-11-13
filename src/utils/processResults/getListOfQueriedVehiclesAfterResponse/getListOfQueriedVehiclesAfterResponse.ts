import findVehicleInList from 'utils/processResults/findVehicleInList/findVehicleInList'
import insertLookupIntoListOfQueriedVehicles from 'utils/processResults/insertLookupIntoListOfQueriedVehicles/insertLookupIntoListOfQueriedVehicles'
import {
  FailedQueryVehiclePlaceholder,
  VehicleDisplayResult,
} from 'types/vehicleDisplayResult'
import { VehicleLookupResult } from 'types/responses'
import AnalyticsTracker from 'utils/analytics/tracking'
import isCompleteVehicleResult from 'utils/types/isCompleteVehicleResult/isCompleteVehicleResult'

const getListOfQueriedVehiclesAfterResponse = ({
  expandResults = true,
  fromPreviousLookupUniqueIdentifier = false,
  previouslyQueriedVehicles,
  queriedVehicle,
  retainLookupForRequeriedVehicle = false,
  tracker,
  useNewStyleDisplay,
  useSearchFilters,
}: {
  expandResults?: boolean
  fromPreviousLookupUniqueIdentifier?: boolean
  previouslyQueriedVehicles: VehicleDisplayResult[]
  queriedVehicle: VehicleLookupResult['vehicle'] | FailedQueryVehiclePlaceholder
  retainLookupForRequeriedVehicle?: boolean
  tracker?: AnalyticsTracker | undefined
  useNewStyleDisplay: boolean
  useSearchFilters: boolean
}): VehicleDisplayResult[] => {
  /**
   * This function does a lot...
   *
   * If the lookup is successful and returns a vehicle record with data...
   *
   * 1. Tag the vehicle's `expandResult` field (replace with state)
   * 2. Tag the vehicle's `fromPreviousLookupUniqueIdentifier` field (replace with state)
   * 3. Try to find the recently-queried vehicle in the list of queried vehicles, passed in as a prop
   *
   * If the recently queried vehicle is in the list of queried vehicles...
   *   ... and the lookup identifiers (`uniqueIdentifier`) don't match...
   *   then we have performed a new query for a vehicle already in our list
   *
   * 4a. constructs a new list (depending on `retainLookupForRequeriedVehicle`):
   *   - when `retainLookupForRequeriedVehicle` is false
   *     - splice out the previous lookup of the recently-queried vehicle
   *   - when `retainLookupForRequeriedVehicle` is true
   *     - take no action
   *
   *   - finally, add the new lookup to the front of the list (array)
   *
   * 5a. return the new list
   *
   * Else if the recently queried vehicle is not in the list of queried vehicles...
   *
   * 4b. constructs a new list by adding the new lookup to the front of the list (array)
   * 5b. return the new list
   */
  let queriedVehicleDisplayResult: VehicleDisplayResult

  if (isCompleteVehicleResult(queriedVehicle)) {
    queriedVehicleDisplayResult = {
      expandResults,
      fromPreviousLookupUniqueIdentifier,
      isSuccessfulLookup: true,
      vehicle: queriedVehicle,
    }
  } else {
    queriedVehicleDisplayResult = {
      expandResults,
      fromPreviousLookupUniqueIdentifier,
      isSuccessfulLookup: false,
      vehicle: queriedVehicle,
    }
  }

  const existingVehicleDisplayResultFromList = retainLookupForRequeriedVehicle
    ? undefined
    : findVehicleInList(previouslyQueriedVehicles, queriedVehicleDisplayResult)

  // This can happen if a user queries a plate while an
  // older request for that same plate is outstanding.
  // When the older request succeeds, it can come in after
  // the newer request, and would otherwise displace it.
  const newResultStale =
    queriedVehicleDisplayResult.isSuccessfulLookup &&
    existingVehicleDisplayResultFromList?.isSuccessfulLookup &&
    queriedVehicleDisplayResult.vehicle.lookupDate <
      existingVehicleDisplayResultFromList.vehicle.lookupDate

  // This should only ever happen in development due to
  // strict-mode calling useEffect blocks twice
  const existingResultSuccessfulAndNewResultUnsuccessful =
    !queriedVehicleDisplayResult.isSuccessfulLookup &&
    !!existingVehicleDisplayResultFromList?.isSuccessfulLookup

  const resultToInsertIntoList =
    existingResultSuccessfulAndNewResultUnsuccessful || newResultStale
      ? existingVehicleDisplayResultFromList
      : queriedVehicleDisplayResult

  // vehicle display result not already in list
  const newList: VehicleDisplayResult[] = insertLookupIntoListOfQueriedVehicles(
    existingVehicleDisplayResultFromList,
    previouslyQueriedVehicles,
    resultToInsertIntoList,
  )

  if (existingVehicleDisplayResultFromList) {
    // vehicle display result already in list
    if (isCompleteVehicleResult(queriedVehicle)) {
      tracker?.trackEvent('plate_lookup_for_vehicle_already_in_results', {
        plate: queriedVehicle.plate,
        plate_type: queriedVehicle.plateTypes,
        state: queriedVehicle.state,
        useNewStyleDisplay,
        useSearchFilters,
      })
    }
  }

  return newList
}

export default getListOfQueriedVehiclesAfterResponse

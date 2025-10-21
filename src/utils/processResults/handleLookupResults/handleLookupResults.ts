import findVehicleInList from 'utils/processResults/findVehicleInList/findVehicleInList'
import insertLookupIntoListOfQueriedVehicles from 'utils/processResults/insertLookupIntoListOfQueriedVehicles/insertLookupIntoListOfQueriedVehicles'
import VehicleDisplayResult from 'types/vehicleDisplayResult'
import { VehicleQueryResponse } from 'types/responses'

const handleLookupResults = ({
  response,
  fromPreviousLookupUniqueIdentifier = false,
  expandResults = true,
  setQueriedVehiclesFunction,
}: {
  response: VehicleQueryResponse
  fromPreviousLookupUniqueIdentifier?: boolean
  expandResults?: boolean
  setQueriedVehiclesFunction: React.Dispatch<
    React.SetStateAction<VehicleDisplayResult[]>
  >
}): void => {
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
   * 4a. use the passed in (as a prop) function to set the list of queried vehicles, which...
   * 5a. constructs a new list by splicing out the previous lookup of the recently-queried vehicle and
   *     adding the new lookup to the front of the list (array)
   * 6a. joins the mapped list of unique identifiers and replaces the existing cookie value with the new value
   *
   * Else if the recently queried vehicle is not in the list of queried vehicles...
   *
   * 4b. use the passed in (as a prop) function to set the list of queried vehicles, which...
   * 5b. constructs a new list by adding the new lookup to the front of the list (array)
   * 6b. joins the mapped list of unique identifiers and replaces the existing cookie value with the new value
   */

  const { data } = response

  if (!data?.[0]) {
    // There is no data object or the results array is empty.
    // TODO: do something useful here
    return
  }

  const firstLookup = data[0]

  if (!firstLookup.successfulLookup) {
    // The lookup was not successful.
    // TODO: do something useful here
    return
  }

  setQueriedVehiclesFunction((previouslyQueriedVehicleDisplayResults) => {
    const queriedVehicleDisplayResult: VehicleDisplayResult = {
      expandResults,
      fromPreviousLookupUniqueIdentifier,
      vehicle: firstLookup.vehicle,
    }

    const existingVehicleDisplayResultFromList = findVehicleInList(
      previouslyQueriedVehicleDisplayResults,
      queriedVehicleDisplayResult,
    )

    if (!existingVehicleDisplayResultFromList) {
      // vehicle display result not already in list
      const newList: VehicleDisplayResult[] =
        insertLookupIntoListOfQueriedVehicles(
          existingVehicleDisplayResultFromList,
          previouslyQueriedVehicleDisplayResults,
          queriedVehicleDisplayResult,
        )

      return newList
    }

    // vehicle display result already in list
    if (
      existingVehicleDisplayResultFromList.vehicle.uniqueIdentifier !==
      queriedVehicleDisplayResult.vehicle.uniqueIdentifier
    ) {
      // Do not update state if we just have the same data

      // new list with stale display result removed and fresh display result added
      const newList: VehicleDisplayResult[] =
        insertLookupIntoListOfQueriedVehicles(
          existingVehicleDisplayResultFromList,
          previouslyQueriedVehicleDisplayResults,
          queriedVehicleDisplayResult,
        )

      return newList
    }

    return previouslyQueriedVehicleDisplayResults
  })
}

export default handleLookupResults

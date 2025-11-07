import { VehicleFactory } from '__fixtures__/models/Vehicle'
import { VehicleDisplayResult } from 'types/vehicleDisplayResult'

import insertLookupIntoListOfQueriedVehicles from './insertLookupIntoListOfQueriedVehicles'

describe('insertLookupIntoListOfQueriedVehicles', () => {
  it('inserts a successful lookup into a list of queried vehicles where it already exists', () => {
    const plate = 'ABC1234'
    const plateTypes = undefined
    const state = 'NY'

    const oldUniqueIdentifer = '01dqu3ry'
    const newUniqueIdentifer = 'n3wqu3ry'

    const oldLookup = VehicleFactory.build({
      plate,
      plateTypes,
      state,
      uniqueIdentifier: oldUniqueIdentifer,
    })

    const newLookup = VehicleFactory.build({
      plate,
      plateTypes,
      state,
      uniqueIdentifier: newUniqueIdentifer,
    })

    const oldVehicleDisplayResult = {
      expandResults: false,
      fromPreviousLookupUniqueIdentifier: false,
      isSuccessfulLookup: true,
      vehicle: oldLookup,
    }

    const newVehicleDisplayResult = {
      expandResults: false,
      fromPreviousLookupUniqueIdentifier: false,
      isSuccessfulLookup: true,
      vehicle: newLookup,
    }

    const previousDisplayResultOfQueriedVehicle = oldVehicleDisplayResult
    const previouslyQueriedVehicleDisplayResults: VehicleDisplayResult[] = [
      oldVehicleDisplayResult,
    ]
    const queriedVehicleDisplayResult = newVehicleDisplayResult

    const newList = insertLookupIntoListOfQueriedVehicles(
      previousDisplayResultOfQueriedVehicle,
      previouslyQueriedVehicleDisplayResults,
      queriedVehicleDisplayResult,
    )

    expect(newList).toEqual([newVehicleDisplayResult])
  })

  it('inserts an unsuccessful existing lookup into a list of queried vehicles', () => {
    const plate = 'ABC1234'
    const plateTypes = undefined
    const state = 'NY'

    const anotherLookup = VehicleFactory.build({
      plate,
      plateTypes,
      state,
      uniqueIdentifier: '03wqu3ry',
    })

    const anotherVehicleDisplayResult = {
      expandResults: false,
      fromPreviousLookupUniqueIdentifier: false,
      isSuccessfulLookup: true,
      vehicle: anotherLookup,
    }

    const failedVehicleDisplayResult = {
      expandResults: false,
      fromPreviousLookupUniqueIdentifier: false,
      isSuccessfulLookup: false as false,
      vehicle: {
        uniqueIdentifier: 'n1dqu3ry',
      },
    }

    const previousDisplayResultOfQueriedVehicle = undefined
    const previouslyQueriedVehicleDisplayResults: VehicleDisplayResult[] = [
      anotherVehicleDisplayResult,
    ]
    const queriedVehicleDisplayResult = failedVehicleDisplayResult

    const newList = insertLookupIntoListOfQueriedVehicles(
      previousDisplayResultOfQueriedVehicle,
      previouslyQueriedVehicleDisplayResults,
      queriedVehicleDisplayResult,
    )

    expect(newList).toEqual([
      failedVehicleDisplayResult,
      anotherVehicleDisplayResult,
    ])
  })

  it('inserts a lookup into a list of queried vehicles where it does not exist', () => {
    const plate = 'ABC1234'
    const plateTypes = undefined
    const state = 'NY'

    const vehicleDisplayResult = {
      expandResults: false,
      fromPreviousLookupUniqueIdentifier: false,
      isSuccessfulLookup: true,
      vehicle: VehicleFactory.build({ plate, plateTypes, state }),
    }

    const previousDisplayResultOfQueriedVehicle = undefined
    const previouslyQueriedVehicleDisplayResults: VehicleDisplayResult[] = []
    const queriedVehicleDisplayResult = vehicleDisplayResult

    const newList = insertLookupIntoListOfQueriedVehicles(
      previousDisplayResultOfQueriedVehicle,
      previouslyQueriedVehicleDisplayResults,
      queriedVehicleDisplayResult,
    )

    expect(newList).toEqual([vehicleDisplayResult])
  })
})

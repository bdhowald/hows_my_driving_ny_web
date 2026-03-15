import { VehicleFactory } from '__fixtures__/models/Vehicle'
import {
  VehicleDisplayErrorResult,
  VehicleDisplaySuccessResult,
} from 'types/vehicleDisplayResult'

import getListOfQueriedVehiclesAfterResponse from './getListOfQueriedVehiclesAfterResponse'

describe('getListOfQueriedVehiclesAfterResponse', () => {
  it('returns list with newly queried vehicle when the response contains a response with a successful lookup', () => {
    const vehicle = VehicleFactory.build()

    const results = getListOfQueriedVehiclesAfterResponse({
      previouslyQueriedVehicles: [],
      queriedVehicle: vehicle,
      useNewStyleDisplay: false,
      useSearchFilters: false,
    })

    const expected = {
      expandResults: true,
      fromPreviousLookupUniqueIdentifier: false,
      isSuccessfulLookup: true,
      vehicle,
    }

    expect(results).toEqual([expected])
  })

  it('returns list with failed vehicle query when the response contains a response with an unsuccessful lookup', () => {
    const vehiclePlaceholder: VehicleDisplayErrorResult['vehicle'] = {
      uniqueIdentifier: 'abc1234,',
    }

    const results = getListOfQueriedVehiclesAfterResponse({
      previouslyQueriedVehicles: [],
      queriedVehicle: vehiclePlaceholder,
      useNewStyleDisplay: false,
      useSearchFilters: false,
    })

    const expected = {
      expandResults: true,
      fromPreviousLookupUniqueIdentifier: false,
      isSuccessfulLookup: false,
      vehicle: vehiclePlaceholder,
    }

    expect(results).toEqual([expected])
  })

  it('inserts a lookup into a list of queried vehicles where it does not already exist', async () => {
    const vehicle = VehicleFactory.build()

    const previouslyQueriedVehicleDisplayResults: VehicleDisplaySuccessResult[] =
      []

    const results = getListOfQueriedVehiclesAfterResponse({
      previouslyQueriedVehicles: previouslyQueriedVehicleDisplayResults,
      queriedVehicle: vehicle,
      useNewStyleDisplay: false,
      useSearchFilters: false,
    })

    const expected = {
      expandResults: true,
      fromPreviousLookupUniqueIdentifier: false,
      isSuccessfulLookup: true,
      vehicle,
    }

    expect(results).toEqual([expected])
  })

  it('inserts a lookup into a list of queried vehicles where it already exists', async () => {
    const oldVehicle = VehicleFactory.build({ uniqueIdentifier: 'abcd1234' })
    const newVehicle = VehicleFactory.build({ uniqueIdentifier: 'efgh5678' })

    const existingVehicleDisplayResultFromList = {
      expandResults: true,
      fromPreviousLookupUniqueIdentifier: false,
      isSuccessfulLookup: true as const,
      vehicle: oldVehicle,
    }
    const previouslyQueriedVehicleDisplayResults: VehicleDisplaySuccessResult[] =
      [existingVehicleDisplayResultFromList]

    const results = getListOfQueriedVehiclesAfterResponse({
      previouslyQueriedVehicles: previouslyQueriedVehicleDisplayResults,
      queriedVehicle: newVehicle,
      useNewStyleDisplay: false,
      useSearchFilters: false,
    })

    const expected = {
      expandResults: true,
      fromPreviousLookupUniqueIdentifier: false,
      isSuccessfulLookup: true as const,
      vehicle: newVehicle,
    }

    expect(results).toEqual([expected])
  })

  it('does not insert a lookup into a list of queried vehicles where it already exists when that lookup failed', async () => {
    const uniqueIdentifier = 'abcd1234'
    const existingVehicle = VehicleFactory.build({ uniqueIdentifier })

    const existingVehicleDisplayResultFromList = {
      expandResults: true,
      fromPreviousLookupUniqueIdentifier: false,
      isSuccessfulLookup: true as const,
      vehicle: existingVehicle,
    }
    const previouslyQueriedVehicleDisplayResults: VehicleDisplaySuccessResult[] =
      [existingVehicleDisplayResultFromList]
    const failedQueriedVehicleResult = { uniqueIdentifier }

    const results = getListOfQueriedVehiclesAfterResponse({
      previouslyQueriedVehicles: previouslyQueriedVehicleDisplayResults,
      queriedVehicle: failedQueriedVehicleResult,
      useNewStyleDisplay: false,
      useSearchFilters: false,
    })

    const expected = {
      expandResults: true,
      fromPreviousLookupUniqueIdentifier: false,
      isSuccessfulLookup: true as const,
      vehicle: existingVehicle,
    }

    expect(results).toEqual([expected])
  })

  it('does not insert a lookup into a list of queried vehicles where the existing result is more recent', async () => {
    const recentLookupDate = '2025-09-01T22:52:02.183Z'
    const stalerLookupDate = '2025-09-01T22:52:02.000Z'

    const recentVehicle = VehicleFactory.build({
      lookupDate: recentLookupDate,
      uniqueIdentifier: 'efgh5678',
    })
    const stalerVehicle = VehicleFactory.build({
      lookupDate: stalerLookupDate,
      uniqueIdentifier: 'abcd1234',
    })

    const existingVehicleDisplayResultFromList = {
      expandResults: true,
      fromPreviousLookupUniqueIdentifier: false,
      isSuccessfulLookup: true as const,
      vehicle: recentVehicle,
    }
    const previouslyQueriedVehicleDisplayResults: VehicleDisplaySuccessResult[] =
      [existingVehicleDisplayResultFromList]

    const results = getListOfQueriedVehiclesAfterResponse({
      previouslyQueriedVehicles: previouslyQueriedVehicleDisplayResults,
      queriedVehicle: stalerVehicle,
      useNewStyleDisplay: false,
      useSearchFilters: false,
    })

    const expected = {
      expandResults: true,
      fromPreviousLookupUniqueIdentifier: false,
      isSuccessfulLookup: true as const,
      vehicle: recentVehicle,
    }

    expect(results).toEqual([expected])
  })
})

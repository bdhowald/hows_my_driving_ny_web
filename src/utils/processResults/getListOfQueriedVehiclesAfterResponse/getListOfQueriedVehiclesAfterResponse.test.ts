import { VehicleFactory } from '__fixtures__/models/Vehicle'
import VehicleDisplayResult from 'types/vehicleDisplayResult'

import handleLookupResults from './getListOfQueriedVehiclesAfterResponse'

// const mockedinsertLookupIntoListOfQueriedVehicles = jest.fn()

// jest.mock(
//   'utils/processResults/insertLookupIntoListOfQueriedVehicles/insertLookupIntoListOfQueriedVehicles',
//   () => ({
//     ...jest.requireActual(
//       'utils/processResults/insertLookupIntoListOfQueriedVehicles/insertLookupIntoListOfQueriedVehicles',
//     ),
//     __esModule: true,
//     default: (
//       a: VehicleDisplayResult | undefined,
//       b: VehicleDisplayResult[],
//       c: VehicleDisplayResult,
//     ) => mockedinsertLookupIntoListOfQueriedVehicles(a, b, c),
//   }),
// )

describe('handleLookupResults', () => {

  it('returns a blank list when the response contains a response with no data and the existing list is blank', () => {
    const response = { data: [] }

    const results = handleLookupResults({
      previouslyQueriedVehicles: [],
      response,
      useNewStyleDisplay: false,
    })

    expect(results).toEqual([])
  })

  it('returns list with newly queried vehicle when the response contains a response with a successful lookup', () => {
    const vehicle = VehicleFactory.build()
    
    const response = {
      data: [
        {
          statusCode: 200,
          successfulLookup: true,
          vehicle,
        },
      ],
    }

    const results = handleLookupResults({
      previouslyQueriedVehicles: [],
      response,
      useNewStyleDisplay: false,
    })

    const expected = {
      expandResults: true,
      fromPreviousLookupUniqueIdentifier: false,
      vehicle,
    }

    expect(results).toEqual([expected])
  })

  it('inserts a lookup into a list of queried vehicles where it does not already exist', async () => {
    const vehicle = VehicleFactory.build()

    const previouslyQueriedVehicleDisplayResults: VehicleDisplayResult[] = []

    const response = {
      data: [
        {
          statusCode: 201,
          successfulLookup: true,
          vehicle,
        },
      ],
    }

    const results = handleLookupResults({
      previouslyQueriedVehicles: previouslyQueriedVehicleDisplayResults,
      response,
      useNewStyleDisplay: false,
    })

    const expected = {
      expandResults: true,
      fromPreviousLookupUniqueIdentifier: false,
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
      vehicle: oldVehicle,
    }
    const previouslyQueriedVehicleDisplayResults: VehicleDisplayResult[] = [
      existingVehicleDisplayResultFromList,
    ]

    const queriedVehicleDisplayResult: VehicleDisplayResult = {
      expandResults: true,
      fromPreviousLookupUniqueIdentifier: false,
      vehicle: newVehicle,
    }

    const response = {
      data: [
        {
          statusCode: 201,
          successfulLookup: true,
          vehicle: newVehicle,
        },
      ],
    }

    const results = handleLookupResults({
      previouslyQueriedVehicles: previouslyQueriedVehicleDisplayResults,
      response,
      useNewStyleDisplay: false,
    })

    const expected = {
      expandResults: true,
      fromPreviousLookupUniqueIdentifier: false,
      vehicle: newVehicle,
    }

    expect(results).toEqual([expected])
  })

  it('takes no action if the lookup is identical (has the same unique identifier) as one in the list', async () => {
    const oldVehicle = VehicleFactory.build({ uniqueIdentifier: 'abcd1234' })
    const newVehicle = VehicleFactory.build({ uniqueIdentifier: 'abcd1234' })

    const existingVehicleDisplayResultFromList = {
      expandResults: true,
      fromPreviousLookupUniqueIdentifier: false,
      vehicle: oldVehicle,
    }
    const previouslyQueriedVehicleDisplayResults: VehicleDisplayResult[] = [
      existingVehicleDisplayResultFromList,
    ]

    const response = {
      data: [
        {
          statusCode: 201,
          successfulLookup: true,
          vehicle: newVehicle,
        },
      ],
    }

    const results = handleLookupResults({
      previouslyQueriedVehicles: previouslyQueriedVehicleDisplayResults,
      response,
      useNewStyleDisplay: false,
    })

    expect(results).toEqual([existingVehicleDisplayResultFromList])
  })
})

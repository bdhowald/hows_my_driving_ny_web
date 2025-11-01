import { VehicleFactory } from '__fixtures__/models/Vehicle'
import VehicleDisplayResult from 'types/vehicleDisplayResult'

import handleLookupResults from './handleLookupResults'

const mockedinsertLookupIntoListOfQueriedVehicles = jest.fn()

jest.mock(
  'utils/processResults/insertLookupIntoListOfQueriedVehicles/insertLookupIntoListOfQueriedVehicles',
  () => ({
    ...jest.requireActual(
      'utils/processResults/insertLookupIntoListOfQueriedVehicles/insertLookupIntoListOfQueriedVehicles',
    ),
    __esModule: true,
    default: (
      a: VehicleDisplayResult | undefined,
      b: VehicleDisplayResult[],
      c: VehicleDisplayResult,
    ) => mockedinsertLookupIntoListOfQueriedVehicles(a, b, c),
  }),
)

describe('handleLookupResults', () => {
  const setQueriedVehiclesFunction = jest.fn()

  it('does not set queried vehicles when the response contains a response with no data', () => {
    const response = { data: [] }

    handleLookupResults({
      response,
      setQueriedVehiclesFunction,
      useNewStyleDisplay: false,
    })

    expect(setQueriedVehiclesFunction).not.toHaveBeenCalled()
  })

  it('sets queried vehicles when the response contains a response with an successful lookup', () => {
    const response = {
      data: [
        {
          statusCode: 200,
          successfulLookup: true,
          vehicle: VehicleFactory.build(),
        },
      ],
    }

    handleLookupResults({
      response,
      setQueriedVehiclesFunction,
      useNewStyleDisplay: false,
    })

    expect(setQueriedVehiclesFunction).toHaveBeenCalled()
  })

  it('inserts a lookup into a list of queried vehicles where it does not already exist', async () => {
    const vehicle = VehicleFactory.build()

    const existingVehicleDisplayResultFromList = undefined
    const previouslyQueriedVehicleDisplayResults: VehicleDisplayResult[] = []
    const queriedVehicleDisplayResult: VehicleDisplayResult = {
      expandResults: true,
      fromPreviousLookupUniqueIdentifier: false,
      vehicle,
    }

    const response = {
      data: [
        {
          statusCode: 201,
          successfulLookup: true,
          vehicle,
        },
      ],
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setQueriedVehicles = (callback: any) =>
      callback(previouslyQueriedVehicleDisplayResults)

    handleLookupResults({
      response,
      setQueriedVehiclesFunction: setQueriedVehicles,
      useNewStyleDisplay: false,
    })

    expect(mockedinsertLookupIntoListOfQueriedVehicles).toHaveBeenCalledWith(
      existingVehicleDisplayResultFromList,
      previouslyQueriedVehicleDisplayResults,
      queriedVehicleDisplayResult,
    )
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setQueriedVehicles = (callback: any) =>
      callback(previouslyQueriedVehicleDisplayResults)

    handleLookupResults({
      response,
      setQueriedVehiclesFunction: setQueriedVehicles,
      useNewStyleDisplay: false,
    })

    expect(mockedinsertLookupIntoListOfQueriedVehicles).toHaveBeenCalledWith(
      existingVehicleDisplayResultFromList,
      previouslyQueriedVehicleDisplayResults,
      queriedVehicleDisplayResult,
    )
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setQueriedVehicles = (callback: any) =>
      callback(previouslyQueriedVehicleDisplayResults)

    handleLookupResults({
      response,
      setQueriedVehiclesFunction: setQueriedVehicles,
      useNewStyleDisplay: false,
    })

    expect(
      mockedinsertLookupIntoListOfQueriedVehicles,
    ).not.toHaveBeenCalledWith()
  })
})

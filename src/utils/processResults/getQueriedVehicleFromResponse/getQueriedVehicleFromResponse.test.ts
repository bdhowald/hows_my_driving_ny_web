import { VehicleFactory } from '__fixtures__/models/Vehicle'

import getQueriedVehicleFromResponse from './getQueriedVehicleFromResponse'

describe('getQueriedVehicleFromResponse', () => {
  it('returns undefined when the response contains a response with no data', () => {
    const response = { data: [] }

    const results = getQueriedVehicleFromResponse(response)

    expect(results).toBeUndefined()
  })

  it('returns the newly queried vehicle when the response contains a response with a successful lookup', () => {
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

    const results = getQueriedVehicleFromResponse(response)

    expect(results).toEqual(vehicle)
  })
})

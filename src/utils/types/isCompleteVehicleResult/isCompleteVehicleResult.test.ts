import { VehicleFactory } from '__fixtures__/models/Vehicle'
import { FailedQueryVehiclePlaceholder } from 'types/vehicleDisplayResult'

import isCompleteVehicleResult from './isCompleteVehicleResult'

describe('isApiErrorObject', () => {
  it('should return true when the potential vehicle is, in fact, a vehicle', () => {
    const potentialVehicle = VehicleFactory.build()

    expect(isCompleteVehicleResult(potentialVehicle)).toBe(true)
  })

  it('should return false if the potential vehicle is a vehicle placeholder', () => {
    const potentialVehicle: FailedQueryVehiclePlaceholder = {
      uniqueIdentifier: 'abc1234',
    }

    expect(isCompleteVehicleResult(potentialVehicle)).toBe(false)
  })
})

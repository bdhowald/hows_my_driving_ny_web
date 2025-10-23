import { Factory } from 'fishery'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import { VehicleLookupResult, VehicleQueryResponse } from 'types/responses'

export const VehicleLookupResultFactory = Factory.define<VehicleLookupResult>(
  () => ({
    statusCode: 200,
    successfulLookup: true,
    vehicle: VehicleFactory.build(),
  }),
)

export const ApiLookupResultFactory = Factory.define<VehicleQueryResponse>(
  () => ({
    data: [VehicleLookupResultFactory.build()],
  }),
)

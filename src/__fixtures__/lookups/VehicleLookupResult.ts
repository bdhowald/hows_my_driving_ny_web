import { Factory } from 'fishery'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import {
  VehicleLookupResult,
  VehicleQueryResponse,
} from 'utils/types/responses'

export const VehicleLookupResultFactory = Factory.define<VehicleLookupResult>(
  () => ({
    successfulLookup: true,
    vehicle: VehicleFactory.build(),
  }),
)

export const ApiLookupResultFactory = Factory.define<VehicleQueryResponse>(
  () => ({
    data: [VehicleLookupResultFactory.build()],
  }),
)

export const UnsuccessfulVehicleLookupResultFactory =
  VehicleLookupResultFactory.build({
    successfulLookup: false,
  })

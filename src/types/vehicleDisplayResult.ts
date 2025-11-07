import Vehicle from 'models/Vehicle/Vehicle'

export type FailedQueryVehiclePlaceholder = {
  uniqueIdentifier: string
}

export type VehicleDisplaySuccessResult = {
  expandResults: boolean
  fromPreviousLookupUniqueIdentifier: boolean
  isSuccessfulLookup: true
  vehicle: Vehicle
}

export type VehicleDisplayErrorResult = {
  expandResults: boolean
  fromPreviousLookupUniqueIdentifier: boolean
  isSuccessfulLookup: false
  vehicle: FailedQueryVehiclePlaceholder
}

export type VehicleDisplayResult =
  | VehicleDisplaySuccessResult
  | VehicleDisplayErrorResult

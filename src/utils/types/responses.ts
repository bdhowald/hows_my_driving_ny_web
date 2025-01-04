import Vehicle from 'models/Vehicle/Vehicle'

export type VehicleLookupResult = {
  vehicle: Vehicle
  successfulLookup: boolean
}

export type VehicleQueryResponse = {
  data: VehicleLookupResult[]
}

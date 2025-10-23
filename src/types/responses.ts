import Vehicle from 'models/Vehicle/Vehicle'

export type ErrorQueryResponse = {
  data: {
    error: string
    statusCode: number
    successfulLookup: boolean
  }[]
}

export type VehicleLookupResult = {
  statusCode: number
  successfulLookup: boolean
  vehicle: Vehicle
}

export type VehicleQueryResponse = {
  data: VehicleLookupResult[]
}

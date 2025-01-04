import Vehicle from 'models/Vehicle/Vehicle'

type VehicleDisplayResult = {
  expandResults: boolean
  fromPreviousLookupUniqueIdentifier: boolean
  vehicle: Vehicle
}

export default VehicleDisplayResult

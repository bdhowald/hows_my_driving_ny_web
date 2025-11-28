import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'

import Vehicle from 'models/Vehicle/Vehicle'
import { VehicleDisplaySuccessResult } from 'types/vehicleDisplayResult'

import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/VehicleResult.css'

import Body from './Body/Body'
import Header from './Header/Header'

type RefreshLookupFunctionType = (vehicle: Vehicle) => Promise<void>
type RemoveLookupFunctionType = (arg0: number) => void

const VehicleResult = ({
  index,
  refreshLookupFunction,
  removeLookupFunction,
  showViolationsList,
  vehicleDisplayResult,
}: {
  index: number
  refreshLookupFunction: RefreshLookupFunctionType
  removeLookupFunction: RemoveLookupFunctionType
  showViolationsList: boolean
  vehicleDisplayResult: VehicleDisplaySuccessResult
}) => {
  const [showVehicleResult, setShowVehicleResult] = useState(true)

  if (!showVehicleResult) {
    return null
  }

  const { vehicle } = vehicleDisplayResult

  return (
    <Card
      className="vehicle"
      data-testid={`lookup-${vehicle.uniqueIdentifier}`}
    >
      <Header
        fromPreviousLookupUniqueIdentifier={
          vehicleDisplayResult.fromPreviousLookupUniqueIdentifier
        }
        refreshLookupFunction={async () => {
          setShowVehicleResult(false)
          await refreshLookupFunction(vehicle)
          setShowVehicleResult(true)
        }}
        removeLookupFunction={() => removeLookupFunction(index)}
        vehicle={vehicle}
      />
      <Body showViolationsList={showViolationsList} vehicle={vehicle} />
    </Card>
  )
}

export default VehicleResult

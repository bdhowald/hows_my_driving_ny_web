import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'

import Vehicle from 'models/Vehicle/Vehicle'
import Body from './Body/Body'
import Header from './Header/Header'

type RefreshLookupFunctionType = (vehicle: Vehicle) => Promise<void>
type RemoveLookupFunctionType = (arg0: number) => void


const VehicleResult = ({
  index,
  refreshLookupFunction,
  removeLookupFunction,
  showViolationsList,
  vehicle,
}: {
  index: number
  refreshLookupFunction: RefreshLookupFunctionType
  removeLookupFunction: RemoveLookupFunctionType
  showViolationsList: boolean
  vehicle: Vehicle
}) => {
  const [showVehicleResult, setShowVehicleResult] = useState(true)

  if (!showVehicleResult) {
    return null
  }

  return (
    <Card
      className="vehicle"
      data-testid={`lookup-${vehicle.uniqueIdentifier}`}
    >
      <Header
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

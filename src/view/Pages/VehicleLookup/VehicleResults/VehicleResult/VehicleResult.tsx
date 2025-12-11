import React, { useRef, useState } from 'react'
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
  const [lookupMarkedForRemoval, setLookupMarkedForRemoval] = useState(false)

  const bodyRef = useRef<HTMLUListElement>(null)

  if (!showVehicleResult) {
    return null
  }

  const { vehicle } = vehicleDisplayResult

  const lookupMarkedForRemovalClass = lookupMarkedForRemoval
    ? 'removing-lookup'
    : ''

  return (
    <Card
      className={`vehicle ${lookupMarkedForRemovalClass}`}
      data-testid={`lookup-${vehicle.uniqueIdentifier}`}
      id={`lookup-${vehicle.uniqueIdentifier}`}
    >
      <Header
        bodyRef={bodyRef}
        fromPreviousLookupUniqueIdentifier={
          vehicleDisplayResult.fromPreviousLookupUniqueIdentifier
        }
        refreshLookupFunction={async () => {
          setShowVehicleResult(false)
          await refreshLookupFunction(vehicle)
          setShowVehicleResult(true)
        }}
        removeLookupFunction={async () => {
          setLookupMarkedForRemoval(true)
          await new Promise((resolve) => setTimeout(resolve, 250))
          removeLookupFunction(index)
        }}
        vehicle={vehicle}
      />
      <Body
        ref={bodyRef}
        showViolationsList={showViolationsList}
        vehicle={vehicle}
      />
    </Card>
  )
}

export default VehicleResult

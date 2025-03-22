import React, { useState } from 'react'

import Card from 'react-bootstrap/Card'

import Vehicle from 'models/Vehicle/Vehicle'
import VehicleDisplayResult from 'utils/types/vehicleDisplayResult'

import Body from './Body/Body'
import Header from './Header/Header'

const getKey = (vehicle: Vehicle) =>
  `${vehicle.state}:${vehicle.plate}:${vehicle.plateTypes}`

type RefreshLookupFunctionType = (vehicle: Vehicle) => Promise<void>
type RemoveLookupFunctionType = (arg0: number) => void

type CombinedVehicleResultsProps = {
  vehicleDisplayResults: VehicleDisplayResult[]
  refreshLookupFunction: RefreshLookupFunctionType
  removeLookupFunction: RemoveLookupFunctionType
}

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

const CombinedVehicleResults = ({
  refreshLookupFunction,
  removeLookupFunction,
  vehicleDisplayResults,
}: CombinedVehicleResultsProps) => {
  vehicleDisplayResults.sort(
    (a: VehicleDisplayResult, b: VehicleDisplayResult) => {
      const aHasPriority =
        a.expandResults || a.fromPreviousLookupUniqueIdentifier
      const bHasPriority =
        b.expandResults || b.fromPreviousLookupUniqueIdentifier

      if (aHasPriority && !bHasPriority) {
        return -1
      }
      return 0
    },
  )

  return (
    <>
      {vehicleDisplayResults.map(
        (vehicleDisplayResult: VehicleDisplayResult, index: number) => {
          const showViolationsList = vehicleDisplayResult.expandResults

          return (
            <VehicleResult
              key={getKey(vehicleDisplayResult.vehicle)}
              index={index}
              refreshLookupFunction={refreshLookupFunction}
              removeLookupFunction={removeLookupFunction}
              showViolationsList={showViolationsList}
              vehicle={vehicleDisplayResult.vehicle}
            />
          )
        },
      )}
    </>
  )
}

const vehicleResultsAreEqual = (
  prevProps: CombinedVehicleResultsProps,
  nextProps: CombinedVehicleResultsProps,
) => {
  const prevUniqueIdentifiers = prevProps.vehicleDisplayResults
    .map(
      (vehicleDisplayResult) => vehicleDisplayResult.vehicle.uniqueIdentifier,
    )
    .join()

  const nextUniqueIdentifiers = nextProps.vehicleDisplayResults
    .map(
      (vehicleDisplayResult) => vehicleDisplayResult.vehicle.uniqueIdentifier,
    )
    .join()

  return prevUniqueIdentifiers === nextUniqueIdentifiers
}

const MemoizedCombinedVehicleResults = React.memo(
  CombinedVehicleResults,
  vehicleResultsAreEqual,
)

const ShimmerLoader = () => {
  const ShimmerColumn = ({
    textAlignDirection,
    position,
  }: {
    textAlignDirection: 'left' | 'right'
    position: 'left' | 'right'
  }) => {
    const positionLeftColumnWidths = [10, 8, 9, 10, 9]
    const positionRightColumnWidths = [9, 8, 6, 10, 8]
    const listToUse =
      position === 'left' ? positionLeftColumnWidths : positionRightColumnWidths

    const classNameString = `summary-box shimmer align-${textAlignDirection} position-${position} lookup-info`

    return (
      <div className={classNameString}>
        {listToUse.map((columnWidth: number, i: number) => {
          return <span key={i} className={`placeholder col-${columnWidth}`} />
        })}
      </div>
    )
  }

  return (
    <div className="vehicle card" aria-hidden="true">
      <div className="card-header shimmer" />
      <ul className="list-group-flush list-group">
        <li className="no-padding list-group-item card-title placeholder-glow">
          <div className="row">
            <div className="summary-section col-xs-12 col-sm-6">
              <ShimmerColumn textAlignDirection="left" position="left" />
              <ShimmerColumn textAlignDirection="right" position="left" />
            </div>
            <div className="summary-section col-xs-12 col-sm-6">
              <ShimmerColumn textAlignDirection="left" position="right" />
              <ShimmerColumn textAlignDirection="right" position="right" />
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="violations-table-wrapper">
            <div className="violations-table-header">
              <div className="row">
                <div className="col-12">
                  <a
                    className="btn btn-primary disabled placeholder col-12"
                    aria-disabled="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}

const VehicleResults = ({
  lookupInFlight,
  refreshLookupFunction,
  removeLookupFunction,
  scrollRef,
  vehicleDisplayResults,
}: {
  lookupInFlight: boolean
  refreshLookupFunction: RefreshLookupFunctionType
  removeLookupFunction: RemoveLookupFunctionType
  scrollRef: React.Ref<HTMLDivElement>
  vehicleDisplayResults: VehicleDisplayResult[]
}) => (
  <div className="vehicles" ref={lookupInFlight ? null : scrollRef}>
    {lookupInFlight && <ShimmerLoader />}
    <MemoizedCombinedVehicleResults
      refreshLookupFunction={refreshLookupFunction}
      removeLookupFunction={removeLookupFunction}
      vehicleDisplayResults={vehicleDisplayResults}
    />
  </div>
)

VehicleResults.displayname = 'VehicleResults'

export default React.memo(VehicleResults)

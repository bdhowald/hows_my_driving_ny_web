import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import { useCookies } from 'react-cookie'

import { USE_NEW_STYLE_DISPLAY_COOKIE } from 'constants/cookies'
import Vehicle from 'models/Vehicle/Vehicle'
import {
  VehicleDisplayResult,
  VehicleDisplaySuccessResult,
} from 'types/vehicleDisplayResult'
import isCompleteVehicleResult from 'utils/types/isCompleteVehicleResult/isCompleteVehicleResult'

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

  const displayableVehicleDisplayResults = vehicleDisplayResults.filter(
    (r) => r.isSuccessfulLookup && isCompleteVehicleResult(r.vehicle),
  ) as VehicleDisplaySuccessResult[]

  return (
    <>
      {displayableVehicleDisplayResults.map(
        (vehicleDisplayResult: VehicleDisplaySuccessResult, index: number) => {
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

const ShimmerLoader = ({
  useNewStyleDisplay,
}: {
  useNewStyleDisplay: boolean
}) => {
  const newStyleDisplayClassName = useNewStyleDisplay ? 'new-style' : ''

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

    const classNameString = `summary-box shimmer align-${textAlignDirection} position-${position} lookup-info ${newStyleDisplayClassName}`

    return (
      <div className={classNameString}>
        {listToUse.map((columnWidth: number, i: number) => {
          return <span key={i} className={`placeholder col-${columnWidth}`} />
        })}
      </div>
    )
  }

  return (
    <div
      className="vehicle card"
      aria-hidden="true"
      data-testid="shimmer-loader"
    >
      <div className="card-header shimmer" />
      <ul className="list-group-flush list-group">
        <li className="no-padding list-group-item card-title placeholder-glow">
          <div className={`row ${newStyleDisplayClassName}`}>
            <div
              className={`summary-section col-xs-12 col-sm-6 ${newStyleDisplayClassName}`}
            >
              <ShimmerColumn textAlignDirection="left" position="left" />
              <ShimmerColumn textAlignDirection="right" position="left" />
            </div>
            <div
              className={`summary-section col-xs-12 col-sm-6 ${newStyleDisplayClassName}`}
            >
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
  existingQueriesInFlight,
  lookupInFlight,
  refreshLookupFunction,
  removeLookupFunction,
  scrollRef,
  vehicleDisplayResults,
}: {
  existingQueriesInFlight: boolean
  lookupInFlight: boolean
  refreshLookupFunction: RefreshLookupFunctionType
  removeLookupFunction: RemoveLookupFunctionType
  scrollRef: React.Ref<HTMLDivElement>
  vehicleDisplayResults: VehicleDisplayResult[]
}) => {
  const [cookies, _, __] = useCookies([USE_NEW_STYLE_DISPLAY_COOKIE])

  const useNewStyleDisplay = cookies[USE_NEW_STYLE_DISPLAY_COOKIE] === true
  const newStyleDisplayClassName = useNewStyleDisplay ? 'new-style' : ''

  const showQueriesInFlight = existingQueriesInFlight || lookupInFlight

  return (
    <div
      className={`vehicles ${newStyleDisplayClassName}`}
      ref={lookupInFlight ? null : scrollRef}
    >
      {lookupInFlight && (
        // Display loader above results when a current lookup is in flight,
        // regardless of whether existing results are still being queried.
        <ShimmerLoader useNewStyleDisplay={useNewStyleDisplay} />
      )}
      <MemoizedCombinedVehicleResults
        refreshLookupFunction={refreshLookupFunction}
        removeLookupFunction={removeLookupFunction}
        vehicleDisplayResults={vehicleDisplayResults}
      />
      {existingQueriesInFlight && !lookupInFlight && (
        // Display loader below results when a current lookup is not in flight,
        // but existing queries in flight are (show below any new lookup we have).
        <ShimmerLoader useNewStyleDisplay={useNewStyleDisplay} />
      )}
    </div>
  )
}

VehicleResults.displayName = 'VehicleResults'

export default React.memo(VehicleResults)

import React from 'react'

import Card from 'react-bootstrap/Card'
import SyncLoader from "react-spinners/SyncLoader"

import { Vehicle } from 'utils/types/responses'

import Body from './Body'
import Header from './Header'

const COLOR_WHITE = '#ffffff'

const getKey = (vehicle: Vehicle) => `${vehicle.state}:${vehicle.plate}:${vehicle.plateTypes}`

type removeLookupFnType = (arg0: number) => void
type CombinedVehicleResultsProps = { vehicles: Vehicle[], removeLookupFn: removeLookupFnType }

const VehicleResult = (
  { vehicle, index, removeLookupFn }: { vehicle: Vehicle, index: number, removeLookupFn: removeLookupFnType }
) => (
  <Card className='vehicle'>
    <Header
      removeLookupFn={() => removeLookupFn(index)}
      vehicle={vehicle}
    />
    <Body vehicle={vehicle} />
  </Card>
)

const CombinedVehicleResults = (
  { vehicles, removeLookupFn }: CombinedVehicleResultsProps
) => {
  vehicles.sort((a: Vehicle, b: Vehicle) => {
    const aHasPriority = a.expandResults || a.fromPreviousLookupUniqueIdentifier
    const bHasPriority = b.expandResults || b.fromPreviousLookupUniqueIdentifier

    if (aHasPriority && !bHasPriority) {
      return -1
    }
    return 0
  })

  return (
    <>
      {vehicles.map((vehicle: Vehicle, index: number) => (
        <VehicleResult
          key={getKey(vehicle)}
          index={index}
          removeLookupFn={removeLookupFn}
          vehicle={vehicle}
        />
      ))}
    </>
  )
}

const vehicleResultsAreEqual = (
  prevProps: CombinedVehicleResultsProps,
  nextProps: CombinedVehicleResultsProps
) => {
  const prevUniqueIdentifiers = prevProps.vehicles.map((vehicle) => vehicle.uniqueIdentifier).join()
  const nextUniqueIdentifiers = nextProps.vehicles.map((vehicle) => vehicle.uniqueIdentifier).join()

  return prevUniqueIdentifiers === nextUniqueIdentifiers
}

const MemoizedCombinedVehicleResults = React.memo(CombinedVehicleResults, vehicleResultsAreEqual)

const Loader = () => (
  <div className='loader-wrapper'>
    <SyncLoader
      color={COLOR_WHITE}
      size={15}
      aria-label='Loading Spinner'
      data-testid='loader'
    />
  </div>
)

const VehicleResults = ({ lookupInFlight, removeLookupFn, scrollRef, vehicles }: {
  lookupInFlight: boolean
  removeLookupFn: removeLookupFnType
  scrollRef: React.Ref<HTMLDivElement>
  vehicles: Vehicle[]
}) => (
  <div className='vehicles' ref={lookupInFlight ? null: scrollRef}>
    {lookupInFlight ? <Loader /> : null}
    <MemoizedCombinedVehicleResults removeLookupFn={removeLookupFn} vehicles={vehicles}/>
  </div>
)

VehicleResults.displayname = 'VehicleResults'

export default React.memo(VehicleResults)
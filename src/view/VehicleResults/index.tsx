import React from 'react'

import Card from 'react-bootstrap/Card'
import SyncLoader from "react-spinners/SyncLoader"

import { Vehicle } from 'utils/types/responses'

import Body from './Body'
import Header from './Header'

const COLOR_WHITE = '#ffffff'

export default ({ lookupInFlight, removeLookupFn, scrollRef, vehicles }: {
  lookupInFlight: boolean
  removeLookupFn: (arg0: number) => void
  scrollRef: React.Ref<HTMLDivElement>
  vehicles: Vehicle[]
}) => {

  const getKey = (vehicle: Vehicle) => `${vehicle.state}:${vehicle.plate}:${vehicle.plateTypes}`

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

  return (
    <div className='vehicles' ref={lookupInFlight ? null: scrollRef}>
      {lookupInFlight && <Loader />}
      {vehicles.map((vehicle: Vehicle, index: number) => (
        <Card key={getKey(vehicle)} className='vehicle'>
          <Header
            removeLookupFn={() => removeLookupFn(index)}
            vehicle={vehicle}
          />
          <Body vehicle={vehicle} />
        </Card>
      ))}
    </div>
  )
}
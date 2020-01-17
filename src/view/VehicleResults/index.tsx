import React from 'react'

import Card from 'react-bootstrap/Card'

import { Vehicle } from 'utils/types/responses'

import Body from './Body'
import Header from './Header'

export default ({ vehicles }: {vehicles: Vehicle[] }) => {

  const getKey = (vehicle: Vehicle) => `${vehicle.state}:${vehicle.plate}:${vehicle.plateTypes}`

  return (
    <div className='vehicles'>
      {vehicles.map((vehicle: Vehicle) => (
        <Card key={getKey(vehicle)} className='vehicle'>
          <Header vehicle={vehicle} />
          <Body vehicle={vehicle} />
        </Card>
      ))}
    </div>
  )
}
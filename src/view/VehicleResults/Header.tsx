import React from 'react'

import Card from 'react-bootstrap/Card'

import TwitterShare from 'components/TwitterShare'
import plateTypes from 'constants/plateTypes'
import { Vehicle } from 'utils/types/responses'

export default ({vehicle}: {vehicle: Vehicle}) => {

  const getCardHeader = (vehicle: Vehicle) => {
    let plateCategory: string | undefined = undefined
    Object.entries(plateTypes).forEach(([_, type]) => {
      if (vehicle.plateTypes?.sort().toString() === type.codes?.sort().toString()) {
        plateCategory = type.displayName
      }
    })
    const plateTypesString: string | undefined = vehicle.plateTypes ? `(${plateCategory})` : ''
    return `${vehicle.state}:${vehicle.plate} ${plateTypesString}`
  }

  return (
    <Card.Header>
      {getCardHeader(vehicle)}
      <TwitterShare vehicle={vehicle}/>
    </Card.Header>
  )
}

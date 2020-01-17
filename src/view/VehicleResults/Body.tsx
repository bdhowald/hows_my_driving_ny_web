import * as React from 'react'

import { ListGroup } from 'reactstrap'

import { Vehicle } from 'utils/types/responses'

import LookupInfo from './LookupInfo'
import RecklessDriverAccountabilityAct from './RecklessDriverAccountabilityAct'
import ViolationsList from './ViolationsList'

export default ({ vehicle }: { vehicle: Vehicle }) => {

  return (
    <ListGroup className='list-group-flush'>
      <LookupInfo vehicle={vehicle}/>
      {vehicle.cameraStreakData?.maxStreak >= 5 &&
        <RecklessDriverAccountabilityAct vehicle={vehicle} />
      }
      <ViolationsList vehicle={vehicle} />
    </ListGroup>
  )
}
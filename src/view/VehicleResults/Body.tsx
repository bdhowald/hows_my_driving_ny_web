import * as React from 'react'

import { ListGroup } from 'reactstrap'

import { Vehicle } from 'utils/types/responses'

import LookupInfo from './LookupInfo'
import RecklessDriverAccountabilityAct from './RecklessDriverAccountabilityAct'
import ViolationsList from './ViolationsList'

export default ({ vehicle }: { vehicle: Vehicle }) => {

  const cameraStreakData = vehicle.cameraStreakData

  return (
    <ListGroup className='list-group-flush'>
      <LookupInfo vehicle={vehicle}/>
      {(cameraStreakData?.redLightCameraViolations?.maxStreak >= 5 ||
        cameraStreakData?.schoolZoneSpeedCameraViolations?.maxStreak >= 15) &&
        <RecklessDriverAccountabilityAct vehicle={vehicle} />
      }
      <ViolationsList vehicle={vehicle} />
    </ListGroup>
  )
}
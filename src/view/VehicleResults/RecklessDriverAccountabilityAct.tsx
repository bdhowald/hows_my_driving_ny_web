import React from 'react'

import { ListGroupItem } from 'reactstrap'
import { Vehicle } from 'utils/types/responses'

export default ({ vehicle }: {vehicle: Vehicle }) => {

  const bradLanderTwitterHandle = '@bradlander'
  const bradLanderTwitterURL = 'https://twitter.com/bradlander'

  const recklessDriverAccountabilityActURL = `http://legistar.council.nyc.gov/LegislationDetail.aspx
    ?ID=3521908&GUID=A4FD4CFC-8AD8-4130-AA92-11BC56936F6D&Options=ID|Text|&Search=lander`

  const Link = ({ linkTarget, linkText }: { linkTarget: string, linkText: string }) => (
    <a target='_blank' rel='noopener noreferrer' href={linkTarget}>{linkText}</a>
  )

  const dateFormat = {year: 'numeric', month: '2-digit', day: '2-digit'}

  const streakMinDate = new Date(vehicle.cameraStreakData.streakStart)
    .toLocaleDateString('en-US', dateFormat)

  const streakMaxDate = new Date(vehicle.cameraStreakData.streakEnd)
    .toLocaleDateString('en-US', dateFormat)

  return (
    <ListGroupItem className='list-group-item-warning'>
      <p>
        Under
        <Link linkTarget={bradLanderTwitterURL} linkText={bradLanderTwitterHandle} />
        's
        <Link linkTarget={recklessDriverAccountabilityActURL} linkText={'proposed legislation'} />
        {' '}
        this vehicle could have been booted or impounded due to its {vehicle.cameraStreakData.maxStreak}
        {' '}
        camera violations (>= 5/year) from {streakMinDate} to {streakMaxDate}.
      </p>
    </ListGroupItem>
  )
}
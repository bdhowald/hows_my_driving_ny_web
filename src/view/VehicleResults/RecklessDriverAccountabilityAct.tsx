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

  const maxRedLightViolationStreak = vehicle.cameraStreakData.redLightCameraViolations.maxStreak
  const maxSpeedCameraViolationsStreak = vehicle.cameraStreakData.schoolZoneSpeedCameraViolations.maxStreak

  const redLightCameraViolationsMinDate = new Date(vehicle.cameraStreakData.redLightCameraViolations.streakStart)
    .toLocaleDateString('en-US', dateFormat)
  const redLightCameraViolationsMaxDate = new Date(vehicle.cameraStreakData.redLightCameraViolations.streakEnd)
    .toLocaleDateString('en-US', dateFormat)

  const speedCameraViolationsMinDate = new Date(vehicle.cameraStreakData.schoolZoneSpeedCameraViolations.streakStart)
    .toLocaleDateString('en-US', dateFormat)
  const speedCameraViolationsMaxDate = new Date(vehicle.cameraStreakData.schoolZoneSpeedCameraViolations.streakEnd)
    .toLocaleDateString('en-US', dateFormat)

  const eligibleByRedLightViolations = maxRedLightViolationStreak >= 5
  const eligibleBySpeedCameraViolations = maxSpeedCameraViolationsStreak >= 15

  const getBootingEligibilityString = (): string => {
    const redLightCameraEligibilityString =
      `${maxRedLightViolationStreak} red light camera violations (>= 5/year) from 
      ${redLightCameraViolationsMinDate} to ${redLightCameraViolationsMaxDate}`

    const speedCameraEligibilityString = 
      `${maxSpeedCameraViolationsStreak} school zone speed camera violations (>= 15/year) from 
      ${speedCameraViolationsMinDate} to ${speedCameraViolationsMaxDate}`

    if (eligibleByRedLightViolations && eligibleBySpeedCameraViolations) {
      return `${redLightCameraEligibilityString} and ${speedCameraEligibilityString}.`
    } else if (eligibleByRedLightViolations) {
      return `${redLightCameraEligibilityString}.`
    } else {
      return `${speedCameraEligibilityString}.`
    }
  }

  return (
    <ListGroupItem className={`list-group-item-warning`}>
      <p>
        Under
        <Link linkTarget={bradLanderTwitterURL} linkText={bradLanderTwitterHandle} />
        's
        <Link linkTarget={recklessDriverAccountabilityActURL} linkText={'bill'} />
        {', '}
        this vehicle could be booted or impounded due to its {getBootingEligibilityString()}
      </p>
    </ListGroupItem>
  )
}
import React from 'react'

import { ListGroupItem } from 'reactstrap'

import L10N from 'constants/display'
import { Vehicle } from 'utils/types/responses'

const RecklessDriverAccountabilityAct = ({ vehicle }: {vehicle: Vehicle }) => {

  const Link = ({ linkTarget, linkText }: { linkTarget: string, linkText: string }) => (
    <a target='_blank' rel='noopener noreferrer' href={linkTarget}>{linkText}</a>
  )

  const maxRedLightViolationStreak = vehicle.cameraStreakData.redLightCameraViolations.maxStreak
  const maxSpeedCameraViolationsStreak = vehicle.cameraStreakData.schoolZoneSpeedCameraViolations.maxStreak

  const redLightCameraViolationsMinDate = new Date(vehicle.cameraStreakData.redLightCameraViolations.streakStart)
    .toLocaleDateString('en-US', L10N.sitewide.dateFormat)
  const redLightCameraViolationsMaxDate = new Date(vehicle.cameraStreakData.redLightCameraViolations.streakEnd)
    .toLocaleDateString('en-US', L10N.sitewide.dateFormat)

  const speedCameraViolationsMinDate = new Date(vehicle.cameraStreakData.schoolZoneSpeedCameraViolations.streakStart)
    .toLocaleDateString('en-US', L10N.sitewide.dateFormat)
  const speedCameraViolationsMaxDate = new Date(vehicle.cameraStreakData.schoolZoneSpeedCameraViolations.streakEnd)
    .toLocaleDateString('en-US', L10N.sitewide.dateFormat)

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
        Under the
        <Link linkTarget={L10N.recklessDriverAccountabilityAct.legislationUrl} linkText={
          L10N.recklessDriverAccountabilityAct.legislationName
        } />
        &nbsp;this vehicle could be booted or impounded due to its {getBootingEligibilityString()}
      </p>
    </ListGroupItem>
  )
}

RecklessDriverAccountabilityAct.displayName = 'VehicleResults.RecklessDriverAccountabilityAct'

export default RecklessDriverAccountabilityAct
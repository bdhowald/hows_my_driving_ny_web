import React from 'react'

import L10N from 'constants/display'
import Vehicle from 'models/Vehicle/Vehicle'

const RED_LIGHT_CAMERA_COUNT_THRESHOLD = 5
const SPEED_CAMERA_COUNT_THRESHOLD = 15

const DangerousVehicleAbatementAct = ({ vehicle }: { vehicle: Vehicle }) => {
  const Link = ({
    linkTarget,
    linkText,
  }: {
    linkTarget: string
    linkText: string
  }) => (
    <a target="_blank" rel="noopener noreferrer" href={linkTarget}>
      {linkText}
    </a>
  )

  const getStreakStringElement = ({
    minDate,
    maxDate,
    streak,
    threshold,
    type,
  }: {
    minDate: Date
    maxDate: Date
    streak: number
    threshold: number
    type: string
  }): JSX.Element => {
    const minDateLocaleString = minDate.toLocaleDateString(
      'en-US',
      L10N.sitewide.dateFormat,
    )
    const maxDateLocateString = maxDate.toLocaleDateString(
      'en-US',
      L10N.sitewide.dateFormat,
    )

    const streakAmountAndTypeString = ` ${type} violations`
    const streakRangeString = `(>= ${threshold}/year) from ${minDateLocaleString} to ${maxDateLocateString}`

    return (
      <li>
        <span className="text-bg-warning">
          <span className="dvaa-violations-count">{streak}</span>
          {streakAmountAndTypeString}
        </span>
        <span>&nbsp;{streakRangeString}</span>
      </li>
    )
  }

  const getRedLightCameraBootingEligibilityText = ():
    | JSX.Element
    | undefined => {
    const maxRedLightCameraViolationsStreak =
      vehicle.cameraStreakData.redLightCameraViolations.maxStreak

    const eligibleByRedLightViolations =
      maxRedLightCameraViolationsStreak >= RED_LIGHT_CAMERA_COUNT_THRESHOLD

    const redLightCameraStreakStart =
      vehicle.cameraStreakData.redLightCameraViolations.streakStart
    const redLightCameraStreakEnd =
      vehicle.cameraStreakData.redLightCameraViolations.streakEnd

    if (
      eligibleByRedLightViolations &&
      redLightCameraStreakStart &&
      redLightCameraStreakEnd
    ) {
      return getStreakStringElement({
        minDate: new Date(redLightCameraStreakStart),
        maxDate: new Date(redLightCameraStreakEnd),
        streak: maxRedLightCameraViolationsStreak,
        threshold: RED_LIGHT_CAMERA_COUNT_THRESHOLD,
        type: 'red light camera',
      })
    }

    return undefined
  }

  const getSpeedCameraBootingEligibilityText = (): JSX.Element | undefined => {
    const maxSpeedCameraViolationsStreak =
      vehicle.cameraStreakData.schoolZoneSpeedCameraViolations.maxStreak

    const eligibleBySpeedCameraViolations =
      maxSpeedCameraViolationsStreak >= SPEED_CAMERA_COUNT_THRESHOLD

    const speedCameraLightCameraStreakStart =
      vehicle.cameraStreakData.schoolZoneSpeedCameraViolations.streakStart
    const speedCameraLightCameraStreakEnd =
      vehicle.cameraStreakData.schoolZoneSpeedCameraViolations.streakEnd

    if (
      eligibleBySpeedCameraViolations &&
      speedCameraLightCameraStreakStart &&
      speedCameraLightCameraStreakEnd
    ) {
      return getStreakStringElement({
        minDate: new Date(speedCameraLightCameraStreakStart),
        maxDate: new Date(speedCameraLightCameraStreakEnd),
        streak: maxSpeedCameraViolationsStreak,
        threshold: SPEED_CAMERA_COUNT_THRESHOLD,
        type: 'school zone speed camera',
      })
    }

    return undefined
  }

  const redLightCameraBootingEligibilityString =
    getRedLightCameraBootingEligibilityText()
  const speedCameraBootingEligibilityString =
    getSpeedCameraBootingEligibilityText()

  if (
    !redLightCameraBootingEligibilityString &&
    !speedCameraBootingEligibilityString
  ) {
    throw 'Camera data does not conform to any known configuration.'
  }

  return (
    <li
      className={'list-group-item list-group-item-warning'}
      data-testid="dangerous-vehicle-abatement-act-notice"
    >
      <p>
        Under the
        <Link
          linkTarget={L10N.dangerousVehicleAbatementAct.legislationUrl}
          linkText={L10N.dangerousVehicleAbatementAct.legislationName}
        />
        &nbsp;this vehicle could have been booted or impounded for:
      </p>
      <ul>
        {getRedLightCameraBootingEligibilityText()}
        {getSpeedCameraBootingEligibilityText()}
      </ul>
    </li>
  )
}

DangerousVehicleAbatementAct.displayName =
  'VehicleResults.DangerousVehicleAbatementAct'

export default DangerousVehicleAbatementAct

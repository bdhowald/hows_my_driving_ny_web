import React from 'react'

import { USE_NEW_STYLE_DISPLAY_STORAGE_KEY } from 'constants/storage'
import L10N from 'constants/display'
import useSettings from 'hooks/useSettings/useSettings'
import Vehicle from 'models/Vehicle/Vehicle'

import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/Notices/Notices.css'

const RED_LIGHT_CAMERA_COUNT_THRESHOLD = 5
const SPEED_CAMERA_COUNT_THRESHOLD = 15

const DangerousVehicleAbatementActNotice = ({
  vehicle,
}: {
  vehicle: Vehicle
}) => {
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
    const minDateLocaleString = L10N.sitewide.dateFormat.format(minDate)
    const maxDateLocaleString = L10N.sitewide.dateFormat.format(maxDate)

    const streakAmountAndTypeString = ` ${type} violations`
    const streakThresholdString = `(>= ${threshold}/year)`
    const streakRangeString = `from ${minDateLocaleString} to ${maxDateLocaleString}`

    return (
      <li>
        <span className="streak-count-and-type text-bg-warning">
          <span className="streak-count">{streak}</span>
          {streakAmountAndTypeString}
        </span>
        <span className="streak-threshold">&nbsp;{streakThresholdString}</span>
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

  const { getSetting } = useSettings()
  const useNewStyleDisplay =
    getSetting(USE_NEW_STYLE_DISPLAY_STORAGE_KEY) === true

  const newStyleDisplayClassName = useNewStyleDisplay ? 'new-style' : ''

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
      className={`dangerous-vehicle-notice list-group-item list-group-item-warning ${newStyleDisplayClassName}`}
      data-testid="dangerous-vehicle-abatement-act-notice"
    >
      <p>
        Under the
        <Link
          linkTarget={
            L10N.legislation.dangerousVehicleAbatementAct.legislationUrl
          }
          linkText={
            L10N.legislation.dangerousVehicleAbatementAct.legislationName
          }
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

DangerousVehicleAbatementActNotice.displayName =
  'VehicleResults.DangerousVehicleAbatementActNotice'

export default DangerousVehicleAbatementActNotice

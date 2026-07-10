import React, { useContext } from 'react'

import { USER_SETTINGS_STORAGE_KEYS } from 'constants/userSettings'
import L10N from 'constants/display'
import { ApplicationContext } from 'context/ApplicationContext/ApplicationContext'
import useSettings from 'hooks/useSettings/useSettings'
import Vehicle from 'models/Vehicle/Vehicle'

import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/Notices/Notices.css'

const STOP_SUPER_SPEEDERS_ACT_SCHOOL_ZONE_SPEED_CAMERA_COUNT_THRESHOLD = 16

const StopSuperSpeedersActNotice = ({ vehicle }: { vehicle: Vehicle }) => {
  const Link = ({
    bold,
    linkTarget,
    linkText,
  }: {
    bold?: boolean
    linkTarget: string
    linkText: string
  }) => {
    // Get tracker
    const applicationContext = useContext(ApplicationContext)
    const { tracker } = applicationContext

    return (
      <a
        href={linkTarget}
        rel="noopener noreferrer"
        onClick={() => {
          tracker?.trackEvent('user_clicked_on_external_link', {
            destination: linkTarget,
            displayOfStopSuperSpeedersActNoticeEnabled: true,
            text: linkText,
            useNewStyleDisplay,
          })
        }}
        target="_blank"
      >
        {bold ? (
          <span style={{ fontWeight: 'bold' }}>{linkText}</span>
        ) : (
          <>{linkText}</>
        )}
      </a>
    )
  }

  const getStreakStringElement = ({
    minDate,
    maxDate,
    streak,
    threshold,
  }: {
    minDate: Date
    maxDate: Date
    streak: number
    threshold: number
  }): JSX.Element => {
    const minDateLocaleString = L10N.sitewide.dateFormat.format(minDate)
    const maxDateLocaleString = L10N.sitewide.dateFormat.format(maxDate)

    const streakAmountAndTypeString = ' speed camera violations'
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

  const getEligibilityText = (): JSX.Element | undefined => {
    const maxSchoolZoneSpeedCameraViolationsStreak =
      vehicle.cameraStreakData.schoolZoneSpeedCameraViolations.maxStreak

    const eligible =
      maxSchoolZoneSpeedCameraViolationsStreak >=
      STOP_SUPER_SPEEDERS_ACT_SCHOOL_ZONE_SPEED_CAMERA_COUNT_THRESHOLD

    const schoolZoneSpeedCameraStreakStart =
      vehicle.cameraStreakData.schoolZoneSpeedCameraViolations.streakStart
    const schoolZoneSpeedCameraStreakEnd =
      vehicle.cameraStreakData.schoolZoneSpeedCameraViolations.streakEnd

    if (
      eligible &&
      schoolZoneSpeedCameraStreakStart &&
      schoolZoneSpeedCameraStreakEnd
    ) {
      return getStreakStringElement({
        minDate: new Date(schoolZoneSpeedCameraStreakStart),
        maxDate: new Date(schoolZoneSpeedCameraStreakEnd),
        streak: maxSchoolZoneSpeedCameraViolationsStreak,
        threshold:
          STOP_SUPER_SPEEDERS_ACT_SCHOOL_ZONE_SPEED_CAMERA_COUNT_THRESHOLD,
      })
    }

    return undefined
  }

  const { getSetting } = useSettings()
  const useNewStyleDisplay =
    getSetting(USER_SETTINGS_STORAGE_KEYS.useNewStyleDisplay) === true

  const newStyleDisplayClassName = useNewStyleDisplay ? 'new-style' : ''

  const cameraEligibilityString = getEligibilityText()

  if (!cameraEligibilityString) {
    throw 'Camera data does not conform to any known configuration.'
  }

  return (
    <li
      className={`dangerous-vehicle-notice list-group-item list-group-item-primary ${newStyleDisplayClassName}`}
      data-testid="stop-super-speeders-act-notice"
    >
      <p>
        Under the
        <Link
          bold
          linkTarget={L10N.legislation.stopSuperSpeedersAct.legislationLink}
          linkText={L10N.legislation.stopSuperSpeedersAct.legislationName}
        />
        , this vehicle could be required to have
        <Link
          linkTarget={L10N.legislation.stopSuperSpeedersAct.learnMore.link}
          linkText={L10N.legislation.stopSuperSpeedersAct.learnMore.text}
        />
        &nbsp;installed for:
      </p>
      <ul>{getEligibilityText()}</ul>
    </li>
  )
}

StopSuperSpeedersActNotice.displayName = 'StopSuperSpeedersActNotice'

export default StopSuperSpeedersActNotice

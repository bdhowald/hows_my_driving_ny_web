import React from 'react'
import { useCookies } from 'react-cookie'

import { USE_NEW_STYLE_DISPLAY_COOKIE } from 'constants/cookies'
import L10N from 'constants/display'
import Vehicle from 'models/Vehicle/Vehicle'

const ISA_CAMERA_COUNT_THRESHOLD = 6

const IntelligentSpeedAssistanceNotice = ({
  vehicle,
}: {
  vehicle: Vehicle
}) => {
  const Link = ({
    bold,
    linkTarget,
    linkText,
  }: {
    bold?: boolean
    linkTarget: string
    linkText: string
  }) => (
    <a target="_blank" rel="noopener noreferrer" href={linkTarget}>
      {bold ? (
        <span style={{ fontWeight: 'bold' }}>{linkText}</span>
      ) : (
        <>{linkText}</>
      )}
    </a>
  )

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
    const minDateLocaleString = minDate.toLocaleDateString(
      'en-US',
      L10N.sitewide.dateFormat,
    )
    const maxDateLocateString = maxDate.toLocaleDateString(
      'en-US',
      L10N.sitewide.dateFormat,
    )

    const streakAmountAndTypeString = ' red light and speed camera violations'
    const streakThresholdString = `(>= ${threshold}/year)`
    const streakRangeString = `from ${minDateLocaleString} to ${maxDateLocateString}`

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
    const maxCameraViolationsStreak =
      vehicle.cameraStreakData.cameraViolations.maxStreak

    const eligible = maxCameraViolationsStreak >= ISA_CAMERA_COUNT_THRESHOLD

    const cameraStreakStart =
      vehicle.cameraStreakData.cameraViolations.streakStart
    const cameraStreakEnd = vehicle.cameraStreakData.cameraViolations.streakEnd

    if (eligible && cameraStreakStart && cameraStreakEnd) {
      return getStreakStringElement({
        minDate: new Date(cameraStreakStart),
        maxDate: new Date(cameraStreakEnd),
        streak: maxCameraViolationsStreak,
        threshold: ISA_CAMERA_COUNT_THRESHOLD,
      })
    }

    return undefined
  }

  const [cookies, _, __] = useCookies([USE_NEW_STYLE_DISPLAY_COOKIE])
  const useNewStyleDisplay = cookies[USE_NEW_STYLE_DISPLAY_COOKIE] === true

  const newStyleDisplayClassName = useNewStyleDisplay ? 'new-style' : ''

  const cameraEligibilityString = getEligibilityText()

  if (!cameraEligibilityString) {
    throw 'Camera data does not conform to any known configuration.'
  }

  return (
    <li
      className={`dangerous-vehicle-notice list-group-item list-group-item-primary ${newStyleDisplayClassName}`}
      data-testid="stop-super-speeders-notice"
    >
      <p>
        Under bills proposed by
        <Link
          linkTarget={
            L10N.legislation.speedLimitersForTheMostRecklessDrivers.sponsors[0]
              .link
          }
          linkText={
            L10N.legislation.speedLimitersForTheMostRecklessDrivers.sponsors[0]
              .name
          }
        />
        &nbsp;and
        <Link
          linkTarget={
            L10N.legislation.speedLimitersForTheMostRecklessDrivers.sponsors[1]
              .link
          }
          linkText={
            L10N.legislation.speedLimitersForTheMostRecklessDrivers.sponsors[1]
              .name
          }
        />
        ,&nbsp;
        <span style={{ fontWeight: 'bold' }}>
          {
            L10N.legislation.speedLimitersForTheMostRecklessDrivers
              .legislationName
          }
        </span>
        , this vehicle could be required to have
        <Link
          linkTarget={
            L10N.legislation.speedLimitersForTheMostRecklessDrivers.learnMore
              .link
          }
          linkText={
            L10N.legislation.speedLimitersForTheMostRecklessDrivers.learnMore
              .text
          }
        />
        &nbsp;installed for:
      </p>
      <ul>{getEligibilityText()}</ul>
      <p>
        Click
        <Link
          bold
          linkTarget={
            L10N.legislation.speedLimitersForTheMostRecklessDrivers.support.link
          }
          linkText={
            L10N.legislation.speedLimitersForTheMostRecklessDrivers.support.text
          }
        />
        &nbsp;to support this legislation
        <Link
          linkTarget={
            L10N.legislation.speedLimitersForTheMostRecklessDrivers
              .legislationLinks.assembly
          }
          linkText={'[Assembly]'}
        />
        <Link
          linkTarget={
            L10N.legislation.speedLimitersForTheMostRecklessDrivers
              .legislationLinks.senate
          }
          linkText={'[Senate]'}
        />
        .
      </p>
    </li>
  )
}

IntelligentSpeedAssistanceNotice.displayName =
  'IntelligentSpeedAssistanceNotice'

export default IntelligentSpeedAssistanceNotice

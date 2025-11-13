import React from 'react'
import { useCookies } from 'react-cookie'

import {
  DISPLAY_INTELLIGENT_SPEED_ASSISTANCE_NOTICE_COOKIE,
  USE_NEW_STYLE_DISPLAY_COOKIE,
} from 'constants/cookies'
import Vehicle from 'models/Vehicle/Vehicle'
import LookupInfo from 'view/VehicleResults/VehicleResult/LookupInfo/LookupInfo'
import DangerousVehicleAbatementActNotice from 'view/VehicleResults/VehicleResult/Notices/DangerousVehicleAbatementActNotice/DangerousVehicleAbatementActNotice'
import IntelligentSpeedAssistanceNotice from 'view/VehicleResults/VehicleResult/Notices/IntelligentSpeedAssistanceNotice/IntelligentSpeedAssistanceNotice'
import ViolationsInspector from 'view/VehicleResults/VehicleResult/ViolationsInspector/ViolationsInspector'

type BodyProps = {
  showViolationsList: boolean
  vehicle: Vehicle
}

const Body = ({ showViolationsList, vehicle }: BodyProps) => {
  const [cookies, _, __] = useCookies([
    DISPLAY_INTELLIGENT_SPEED_ASSISTANCE_NOTICE_COOKIE,
    USE_NEW_STYLE_DISPLAY_COOKIE,
  ])

  const displayOfIntelligentSpeedAssistanceNoticeEnabled =
    cookies[DISPLAY_INTELLIGENT_SPEED_ASSISTANCE_NOTICE_COOKIE] === true

  const useNewStyleDisplay = cookies[USE_NEW_STYLE_DISPLAY_COOKIE] === true

  const cameraStreakData = vehicle.cameraStreakData

  // Only show one notice or the other
  const showIntelligentSpeedAssistanceNotice =
    displayOfIntelligentSpeedAssistanceNoticeEnabled &&
    cameraStreakData?.cameraViolations?.maxStreak >= 6

  const showDangerousVehicleAbatementActNotice =
    !displayOfIntelligentSpeedAssistanceNoticeEnabled &&
    (cameraStreakData?.redLightCameraViolations?.maxStreak >= 5 ||
      cameraStreakData?.schoolZoneSpeedCameraViolations?.maxStreak >= 15)

  return (
    <ul className="list-group list-group-flush">
      <LookupInfo vehicle={vehicle} />
      {showIntelligentSpeedAssistanceNotice && (
        <IntelligentSpeedAssistanceNotice vehicle={vehicle} />
      )}
      {showDangerousVehicleAbatementActNotice && (
        <DangerousVehicleAbatementActNotice vehicle={vehicle} />
      )}
      <ViolationsInspector
        showViolationsList={showViolationsList}
        useNewStyleView={useNewStyleDisplay}
        vehicle={vehicle}
      />
    </ul>
  )
}

Body.displayName = 'VehicleResults.Body'

export default Body

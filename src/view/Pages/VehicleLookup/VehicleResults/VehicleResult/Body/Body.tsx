import React from 'react'
import { useCookies } from 'react-cookie'

import {
  DISPLAY_INTELLIGENT_SPEED_ASSISTANCE_NOTICE_STORAGE_KEY,
  USE_NEW_STYLE_DISPLAY_STORAGE_KEY,
} from 'constants/storage'
import Vehicle from 'models/Vehicle/Vehicle'
import useSettings from 'hooks/useSettings/useSettings'
import LookupInfo from 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/LookupInfo/LookupInfo'
import DangerousVehicleAbatementActNotice from 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/Notices/DangerousVehicleAbatementActNotice/DangerousVehicleAbatementActNotice'
import IntelligentSpeedAssistanceNotice from 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/Notices/IntelligentSpeedAssistanceNotice/IntelligentSpeedAssistanceNotice'
import ViolationsInspector from 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/ViolationsInspector/ViolationsInspector'

import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/Body/Body.css'

type BodyProps = {
  showViolationsList: boolean
  vehicle: Vehicle
}

const Body = ({ showViolationsList, vehicle }: BodyProps) => {
  const { getSetting } = useSettings()

  const [cookies, _, __] = useCookies([
    DISPLAY_INTELLIGENT_SPEED_ASSISTANCE_NOTICE_STORAGE_KEY,
  ])

  const displayOfIntelligentSpeedAssistanceNoticeEnabled =
    cookies[DISPLAY_INTELLIGENT_SPEED_ASSISTANCE_NOTICE_STORAGE_KEY] === true

  const useNewStyleDisplay =
    getSetting(USE_NEW_STYLE_DISPLAY_STORAGE_KEY) === true

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

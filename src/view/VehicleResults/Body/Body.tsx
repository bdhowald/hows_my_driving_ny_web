import React from 'react'
import { useCookies } from 'react-cookie'

import { USE_NEW_STYLE_DISPLAY_COOKIE } from 'constants/cookies'
import Vehicle from 'models/Vehicle/Vehicle'
import LookupInfo from 'view/VehicleResults/LookupInfo/LookupInfo'
import DangerousVehicleAbatementAct from 'view/VehicleResults/DangerousVehicleAbatementAct/DangerousVehicleAbatementAct'
import ViolationsInspector from 'view/VehicleResults/ViolationsInspector/ViolationsInspector'

type BodyProps = {
  showViolationsList: boolean
  vehicle: Vehicle
}

const Body = ({ showViolationsList, vehicle }: BodyProps) => {
  const [cookies, _, __] = useCookies([USE_NEW_STYLE_DISPLAY_COOKIE])

  const useNewStyleDisplay = cookies[USE_NEW_STYLE_DISPLAY_COOKIE] === true

  const cameraStreakData = vehicle.cameraStreakData

  const showDangerousVehicleAbatementActNotice =
    cameraStreakData?.redLightCameraViolations?.maxStreak >= 5 ||
    cameraStreakData?.schoolZoneSpeedCameraViolations?.maxStreak >= 15

  return (
    <ul className="list-group list-group-flush">
      <LookupInfo vehicle={vehicle} />
      {showDangerousVehicleAbatementActNotice && (
        <DangerousVehicleAbatementAct vehicle={vehicle} />
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

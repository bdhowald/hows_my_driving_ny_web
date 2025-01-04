import * as React from 'react'

import Vehicle from 'models/Vehicle/Vehicle'
import LookupInfo from 'view/VehicleResults/LookupInfo/LookupInfo'
import DangerousVehicleAbatementAct from 'view/VehicleResults/DangerousVehicleAbatementAct/DangerousVehicleAbatementAct'
import ViolationsInspector from 'view/VehicleResults/ViolationsInspector/ViolationsInspector'

type BodyProps = {
  showViolationsList: boolean
  vehicle: Vehicle
}

const Body = ({ showViolationsList, vehicle }: BodyProps) => {
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
        vehicle={vehicle}
        showViolationsList={showViolationsList}
      />
    </ul>
  )
}

Body.displayName = 'VehicleResults.Body'

export default Body

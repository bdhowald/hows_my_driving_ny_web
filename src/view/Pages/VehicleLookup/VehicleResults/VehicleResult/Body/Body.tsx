import React from 'react'

import { USER_SETTINGS_STORAGE_KEYS } from 'constants/userSettings'
import Vehicle from 'models/Vehicle/Vehicle'
import useSettings from 'hooks/useSettings/useSettings'
import LookupInfo from 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/LookupInfo/LookupInfo'
import StopSuperSpeedersActNotice from 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/Notices/StopSuperSpeedersActNotice/StopSuperSpeedersActNotice'
import ViolationsInspector from 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/ViolationsInspector/ViolationsInspector'

import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/Body/Body.css'

type BodyProps = {
  showViolationsList: boolean
  vehicle: Vehicle
}

const Body = React.forwardRef(
  (
    { showViolationsList, vehicle }: BodyProps,
    ref: React.ForwardedRef<HTMLUListElement>,
  ) => {
    const { getSetting } = useSettings()

    const useNewStyleDisplay =
      getSetting(USER_SETTINGS_STORAGE_KEYS.useNewStyleDisplay) === true

    const cameraStreakData = vehicle.cameraStreakData

    // Only show one notice or the other
    const showStopSuperSpeedersActNotice =
      cameraStreakData?.schoolZoneSpeedCameraViolations?.maxStreak >= 16

    return (
      <ul className="list-group list-group-flush" ref={ref}>
        <LookupInfo vehicle={vehicle} />
        {showStopSuperSpeedersActNotice && (
          <StopSuperSpeedersActNotice vehicle={vehicle} />
        )}
        <ViolationsInspector
          showViolationsList={showViolationsList}
          useNewStyleView={useNewStyleDisplay}
          vehicle={vehicle}
        />
      </ul>
    )
  },
)

Body.displayName = 'VehicleResults.Body'

export default Body

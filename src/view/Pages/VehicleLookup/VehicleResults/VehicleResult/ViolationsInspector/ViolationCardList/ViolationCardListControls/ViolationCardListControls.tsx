import React from 'react'

import Vehicle from 'models/Vehicle/Vehicle'

import ShowFineDetailsButton from './ShowFineDetailsButton/ShowFineDetailsButton'
import ShowFullLocationDataButton from './ShowFullLocationDataButton/ShowFullLocationDataButton'
import ShowViolationsButton from './ShowViolationsButton/ShowViolationsButton'

import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/ViolationsInspector/ViolationCardList/ViolationCardListControls/ViolationCardListControls.css'

type ViolationCardListControlProps = {
  setViolationsListVisibilityFunction: (arg1: boolean) => void
  showFullFineData: boolean
  showFullLocationData: boolean
  toggleShowFullFineDataFunction: () => void
  toggleShowFullLocationDataFunction: () => void
  vehicle: Vehicle
  violationsListIsVisible: boolean
}

const ViolationCardListControls = ({
  setViolationsListVisibilityFunction,
  showFullFineData,
  showFullLocationData,
  toggleShowFullFineDataFunction,
  toggleShowFullLocationDataFunction,
  vehicle,
  violationsListIsVisible,
}: ViolationCardListControlProps) => {
  return (
    <div
      className="violation-card-list-controls"
      data-testid="vehicle-violation-card-list-controls"
    >
      <div className="row">
        <div className={'d-grid gap-2'}>
          <ShowViolationsButton
            setViolationsListVisibilityFunction={
              setViolationsListVisibilityFunction
            }
            vehicle={vehicle}
            violationsListIsVisible={violationsListIsVisible}
          />
          <ShowFineDetailsButton
            showFullFineData={showFullFineData}
            toggleShowFullFineDataFunction={toggleShowFullFineDataFunction}
            violationsCount={vehicle.violationsCount}
            violationsListIsVisible={violationsListIsVisible}
          />
          <ShowFullLocationDataButton
            showFullLocationData={showFullLocationData}
            toggleShowFullLocationDataFunction={
              toggleShowFullLocationDataFunction
            }
            violationsCount={vehicle.violationsCount}
            violationsListIsVisible={violationsListIsVisible}
          />
        </div>
      </div>
    </div>
  )
}

export default ViolationCardListControls

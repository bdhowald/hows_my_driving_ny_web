import React from 'react'

import Vehicle from 'models/Vehicle/Vehicle'

import ShowFullFineDataButton from './ShowFullFineDataButton/ShowFullFineDataButton'
import ShowFullViolationTextButton from './ShowFullViolationTextButton/ShowFullViolationTextButton'
import ShowViolationsButton from './ShowViolationsButton/ShowViolationsButton'

import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/ViolationsInspector/ViolationsListControls/ViolationsListControls.css'

type ViolationsListControlProps = {
  setShowFullFineDataFunction: (arg1: boolean) => void
  setShowFullViolationTextFunction: (arg1: boolean) => void
  setViolationsListVisibilityFunction: (arg1: boolean) => void
  showFullFineData: boolean
  showFullViolationText: boolean
  vehicle: Vehicle
  violationsListIsVisible: boolean
}

const ViolationsListControls = ({
  setShowFullFineDataFunction,
  setShowFullViolationTextFunction,
  setViolationsListVisibilityFunction,
  showFullFineData,
  showFullViolationText,
  vehicle,
  violationsListIsVisible,
}: ViolationsListControlProps) => {
  const violationsCount = vehicle.violationsCount
  const vehicleHasViolations = violationsCount > 0

  const additionalButtonGroupStyling =
    vehicleHasViolations && violationsListIsVisible
      ? 'd-md-flex justify-content-md-between'
      : ''

  return (
    <div
      className="violations-table-header"
      data-testid="vehicle-violations-controls"
    >
      <div className="row">
        <div className={`d-grid gap-2 ${additionalButtonGroupStyling}`}>
          <ShowViolationsButton
            setViolationsListVisibilityFunction={
              setViolationsListVisibilityFunction
            }
            vehicle={vehicle}
            violationsListIsVisible={violationsListIsVisible}
          />
          <ShowFullFineDataButton
            setShowFullFineDataFunction={setShowFullFineDataFunction}
            showFullFineData={showFullFineData}
            violationsCount={vehicle.violationsCount}
            violationsListIsVisible={violationsListIsVisible}
          />
          <ShowFullViolationTextButton
            setShowFullViolationTextFunction={setShowFullViolationTextFunction}
            showFullViolationText={showFullViolationText}
            violationsCount={vehicle.violationsCount}
            violationsListIsVisible={violationsListIsVisible}
          />
        </div>
      </div>
    </div>
  )
}

export default ViolationsListControls

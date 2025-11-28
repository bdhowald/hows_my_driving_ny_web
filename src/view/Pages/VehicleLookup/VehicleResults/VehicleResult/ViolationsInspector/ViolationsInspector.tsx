import React, { useState } from 'react'

import Vehicle from 'models/Vehicle/Vehicle'

import ViolationCardList from './ViolationCardList/ViolationCardList'
import ViolationsList from './ViolationsList/ViolationsList'
import ViolationsListControls from './ViolationsListControls/ViolationsListControls'

import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/ViolationsInspector/ViolationsInspector.css'

const MAX_WIDTH_TO_HIDE_FULL_VIOLATION_TEXT_BY_DEFAULT = 768

type ViolationsInspectorProps = {
  showViolationsList: boolean
  useNewStyleView?: boolean
  vehicle: Vehicle
}

const ViolationsInspector = ({
  showViolationsList,
  useNewStyleView,
  vehicle,
}: ViolationsInspectorProps) => {
  const [violationsListIsVisible, setViolationsListVisibility] =
    useState(showViolationsList)

  const [showFullViolationText, setShowFullViolationText] = useState(
    window.innerWidth > MAX_WIDTH_TO_HIDE_FULL_VIOLATION_TEXT_BY_DEFAULT,
  )
  const [showFullFineData, setShowFullFineData] = useState(false)

  const violationsCount = vehicle.violationsCount
  const vehicleHasViolations = violationsCount > 0

  if (useNewStyleView) {
    return (
      <li className="list-group-item">
        <div className="violation-card-list-wrapper">
          <ViolationCardList
            setViolationsListVisibilityFunction={setViolationsListVisibility}
            vehicle={vehicle}
            violationsListIsVisible={violationsListIsVisible}
          />
        </div>
      </li>
    )
  }

  return (
    <li className="list-group-item">
      <div className="violations-table-wrapper">
        <ViolationsListControls
          setShowFullFineDataFunction={setShowFullFineData}
          setShowFullViolationTextFunction={setShowFullViolationText}
          setViolationsListVisibilityFunction={setViolationsListVisibility}
          showFullFineData={showFullFineData}
          showFullViolationText={showFullViolationText}
          vehicle={vehicle}
          violationsListIsVisible={violationsListIsVisible}
        />
        {vehicleHasViolations && violationsListIsVisible && (
          <ViolationsList
            showFullFineData={showFullFineData}
            showFullText={showFullViolationText}
            vehicle={vehicle}
          />
        )}
      </div>
    </li>
  )
}

ViolationsInspector.displayName = 'ViolationsInspector'

export default ViolationsInspector

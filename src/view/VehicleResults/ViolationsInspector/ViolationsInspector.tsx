import React from 'react'
import { useState } from 'react'

import Vehicle from 'models/Vehicle/Vehicle'

import ViolationsList from './ViolationsList/ViolationsList'
import ViolationsListControls from './ViolationsListControls/ViolationsListControls'

const MAX_WIDTH_TO_HIDE_FULL_VIOLATION_TEXT_BY_DEFAULT = 768

type ViolationsInspectorProps = {
  showViolationsList: boolean
  vehicle: Vehicle
}

const ViolationsInspector = ({
  showViolationsList,
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

  return (
    <li className="list-group-item">
      <div className="violations-table-wrapper" style={{ width: '100%' }}>
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

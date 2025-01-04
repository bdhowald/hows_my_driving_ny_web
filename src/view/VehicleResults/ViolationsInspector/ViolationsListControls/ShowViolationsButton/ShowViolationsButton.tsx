import * as React from 'react'

import L10N from 'constants/display'
import Vehicle from 'models/Vehicle/Vehicle'

type ShowViolationsButtonProps = {
  setViolationsListVisibilityFunction: (arg1: boolean) => void
  vehicle: Vehicle
  violationsListIsVisible: boolean
}

const ShowViolationsButton = ({
  setViolationsListVisibilityFunction,
  vehicle,
  violationsListIsVisible,
}: ShowViolationsButtonProps) => {
  const violationsCount = vehicle.violationsCount
  const vehicleHasViolations = violationsCount > 0

  // If vehicle has violations...
  //   - if the violations list is visible, show the text to hide it
  //   - if the violations list is not visible, show 'show X violations'
  // If the vehicle doesn't have violations, show the 'no violations' text

  const getButtonText = () => {
    if (!vehicleHasViolations) {
      return L10N.lookups.toggleViolationsView.noViolations
    }
    if (violationsListIsVisible) {
      return L10N.lookups.toggleViolationsView.hide
    }
    if (violationsCount === 1) {
      return 'show 1 violation'
    }
    return `show ${violationsCount} violations`
  }

  const buttonOutlineStyle = vehicleHasViolations
    ? 'btn-outline-primary'
    : 'btn-outline-secondary'

  return (
    <button
      aria-controls={`violations-table-${vehicle.uniqueIdentifier}`}
      aria-expanded="false"
      className={`btn btn-block w-100 ${buttonOutlineStyle}`}
      disabled={!vehicleHasViolations}
      onClick={(e) => {
        e.stopPropagation()
        setViolationsListVisibilityFunction(!violationsListIsVisible)
      }}
      type="button"
    >
      {getButtonText()}
    </button>
  )
}

export default ShowViolationsButton

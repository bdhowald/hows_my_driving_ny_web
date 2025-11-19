import React from 'react'

import L10N from 'constants/display'

type ShowFullFineDataButtonProps = {
  setShowFullFineDataFunction: (arg1: boolean) => void
  showFullFineData: boolean
  violationsCount: number
  violationsListIsVisible: boolean
}

const ShowFullFineDataButton = ({
  setShowFullFineDataFunction,
  showFullFineData,
  violationsCount,
  violationsListIsVisible,
}: ShowFullFineDataButtonProps) => {
  const vehicleHasViolations = violationsCount > 0

  const getButtonText = () => {
    if (showFullFineData) {
      return L10N.lookups.toggleFullFinesView.hide
    }
    if (vehicleHasViolations) {
      return L10N.lookups.toggleFullFinesView.show
    }
    return ''
  }

  if (!vehicleHasViolations || !violationsListIsVisible) {
    return <></>
  }

  return (
    <button
      className="btn btn-outline-primary btn-block w-100"
      onClick={(e) => {
        e.stopPropagation()
        setShowFullFineDataFunction(!showFullFineData)
      }}
      type="button"
    >
      {getButtonText()}
    </button>
  )
}

export default ShowFullFineDataButton

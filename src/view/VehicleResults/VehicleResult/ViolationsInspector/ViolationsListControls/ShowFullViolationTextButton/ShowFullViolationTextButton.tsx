import React from 'react'

import L10N from 'constants/display'

type ShowFullViolationTextButtonProps = {
  setShowFullViolationTextFunction: (arg1: boolean) => void
  showFullViolationText: boolean
  violationsCount: number
  violationsListIsVisible: boolean
}

const ShowFullViolationTextButton = ({
  setShowFullViolationTextFunction,
  showFullViolationText,
  violationsCount,
  violationsListIsVisible,
}: ShowFullViolationTextButtonProps) => {
  const vehicleHasViolations = violationsCount > 0

  const getButtonText = () => {
    if (showFullViolationText) {
      return L10N.lookups.toggleFullViolationText.hide
    }
    if (vehicleHasViolations) {
      return L10N.lookups.toggleFullViolationText.show
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
        setShowFullViolationTextFunction(!showFullViolationText)
      }}
      type="button"
    >
      {getButtonText()}
    </button>
  )
}

export default ShowFullViolationTextButton

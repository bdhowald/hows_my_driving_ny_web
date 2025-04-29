import * as React from 'react'

import { SMALL_BREAKPOINT } from 'constants/breakpoints'
import L10N from 'constants/display'

const ShowFullViolationFineAndLocationDataButton = ({
  showFullLocationData,
  toggleShowFullLocationDataFunction,
  violationsCount,
  violationsListIsVisible,
}: {
  showFullLocationData: boolean
  toggleShowFullLocationDataFunction: () => void
  violationsCount: number
  violationsListIsVisible: boolean
}) => {
  const pageWidth = window.innerWidth
  const pageIsWideEnoughToShowExpandedDetailsButtons =
    pageWidth >= SMALL_BREAKPOINT

  const vehicleHasViolations = violationsCount > 0
  const buttonIsDisabled = !vehicleHasViolations

  const buttonOutlineStyle = !buttonIsDisabled
    ? 'btn-outline-primary'
    : 'btn-outline-secondary'

  const getButtonText = () => {
    if (buttonIsDisabled) {
      return L10N.lookups.toggleFullLocationView.show
    }
    if (showFullLocationData) {
      return L10N.lookups.toggleFullLocationView.hide
    }
    return L10N.lookups.toggleFullLocationView.show
  }

  if (
    !vehicleHasViolations ||
    !violationsListIsVisible ||
    !pageIsWideEnoughToShowExpandedDetailsButtons
  ) {
    return <></>
  }

  return (
    <React.Fragment>
      {violationsListIsVisible && (
        <button
          className={`btn btn-block ${buttonOutlineStyle}`}
          disabled={buttonIsDisabled}
          onClick={(e) => {
            e.stopPropagation()
            toggleShowFullLocationDataFunction()
          }}
          type="button"
        >
          {getButtonText()}
        </button>
      )}
    </React.Fragment>
  )
}

export default ShowFullViolationFineAndLocationDataButton

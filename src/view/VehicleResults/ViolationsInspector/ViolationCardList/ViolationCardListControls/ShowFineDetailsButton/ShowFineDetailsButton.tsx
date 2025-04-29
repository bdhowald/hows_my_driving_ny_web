import * as React from 'react'

import { SMALL_BREAKPOINT } from 'constants/breakpoints'
import L10N from 'constants/display'

type ShowFineDetailsButtonProps = {
  showFullFineData: boolean
  toggleShowFullFineDataFunction: () => void
  violationsCount: number
  violationsListIsVisible: boolean
}

const ShowFineDetailsButton = ({
  showFullFineData,
  toggleShowFullFineDataFunction,
  violationsCount,
  violationsListIsVisible,
}: ShowFineDetailsButtonProps) => {
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
      return L10N.lookups.toggleFullFinesView.show
    }
    if (showFullFineData) {
      return L10N.lookups.toggleFullFinesView.hide
    }
    return L10N.lookups.toggleFullFinesView.show
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
            toggleShowFullFineDataFunction()
          }}
          type="button"
        >
          {getButtonText()}
        </button>
      )}
    </React.Fragment>
  )
}

export default ShowFineDetailsButton

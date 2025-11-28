import React from 'react'
import { IconDefinition, library } from '@fortawesome/fontawesome-svg-core'
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons'
import { faArrowRotateRight, faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/Header/RefreshLookupButton/RefreshLookupButton.css'

// Add Font Awesome icons
library.add(faArrowRotateRight, faCircle, farCircle as IconDefinition)

type RefreshLookupButtonProps = {
  refreshLookupFunction: () => void
}

const RefreshLookupButton = ({
  refreshLookupFunction,
}: RefreshLookupButtonProps) => {
  return (
    <button
      aria-label="refresh lookup"
      className="refresh-lookup-button"
      data-testid="refresh-lookup-button"
      onClick={() => {
        refreshLookupFunction()
      }}
      type="button"
    >
      <span className="fa-layers fa-fw">
        <FontAwesomeIcon
          color="dimgrey"
          icon="circle"
          transform="grow-6"
          className="circle"
        />
        <FontAwesomeIcon
          color="white"
          icon="arrow-rotate-right"
          className="circle"
        />
      </span>
    </button>
  )
}

export default RefreshLookupButton

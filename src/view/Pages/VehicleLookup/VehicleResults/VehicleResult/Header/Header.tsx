import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  IconDefinition,
  IconProp,
  library,
} from '@fortawesome/fontawesome-svg-core'
import {
  faCircle as farCircle,
  faCircleXmark as farCircleXmark,
} from '@fortawesome/free-regular-svg-icons'
import { faCircle, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Card from 'react-bootstrap/Card'

// import RefreshLookupButton from 'view/VehicleResults/Header/RefreshLookupButton/RefreshLookupButton'

import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/Header/Header.css'

// Add Font Awesome icons
library.add(
  faCircle,
  faCircleXmark,
  farCircle as IconDefinition,
  farCircleXmark as IconDefinition,
)

const RemoveLookupButton = ({
  removeLookupFunction,
}: {
  removeLookupFunction: () => void
}) => {
  const [iconClass, setIconClass] = useState(['fa', 'circle-xmark'])

  const setButtonToPressed = () => {
    setIconClass(['far', 'circle-xmark'])
  }

  const setButtonToUnpressed = () => {
    setIconClass(['fa', 'circle-xmark'])
  }

  return (
    <button
      aria-label="remove lookup"
      className="remove-lookup-button"
      data-testid="remove-lookup-button"
      onClick={() => {
        removeLookupFunction()
      }}
      onMouseDown={() => {
        setButtonToPressed()
      }}
      onMouseEnter={(e) => {
        if (e.buttons === 1) {
          setButtonToPressed()
        }
      }}
      onMouseLeave={(e) => {
        if (e.buttons === 1) {
          setButtonToUnpressed()
        }
      }}
      onMouseUp={() => {
        setButtonToUnpressed()
      }}
      type="button"
    >
      <FontAwesomeIcon
        icon={iconClass as IconProp}
        transform="grow-6"
        className="circle"
      />
    </button>
  )
}

const Header = ({
  fromPreviousLookupUniqueIdentifier,
  // refreshLookupFunction,
  removeLookupFunction,
}: {
  fromPreviousLookupUniqueIdentifier: boolean
  refreshLookupFunction: () => void
  removeLookupFunction: () => void
}) => {
  if (fromPreviousLookupUniqueIdentifier) {
    return <PreviousLookupHeader />
  }

  return (
    <Card.Header className="lookup-controls">
      <RemoveLookupButton removeLookupFunction={removeLookupFunction} />
    </Card.Header>
  )
}

const PreviousLookupHeader = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  return (
    <Card.Header className="lookup-controls from-previous-lookup">
      <div>Shared via link</div>
      <RemoveLookupButton
        removeLookupFunction={() => navigate(`/?${searchParams.toString()}`)}
      />
    </Card.Header>
  )
}

Header.displayName = 'VehicleResults.Header'

export default Header

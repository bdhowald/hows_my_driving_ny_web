import React, { useState } from 'react'

import {
  IconDefinition,
  IconPrefix,
  IconProp,
  library,
} from '@fortawesome/fontawesome-svg-core'
import {
  faCircle as farCircle,
  faCircleXmark as farCircleXmark,
  faCopy as farCopy,
} from '@fortawesome/free-regular-svg-icons'
import {
  faCircle,
  faCircleXmark,
  faCopy,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Card from 'react-bootstrap/Card'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import SocialShareButton from 'view/components/SocialShareButton/SocialShareButton'
import L10N from 'constants/display'
import Vehicle from 'models/Vehicle/Vehicle'
// import RefreshLookupButton from 'view/VehicleResults/Header/RefreshLookupButton/RefreshLookupButton'

// Add Font Awesome icons
library.add(
  faCircle,
  faCircleXmark,
  farCircle as IconDefinition,
  farCircleXmark as IconDefinition,
  faCopy,
  farCopy as IconDefinition,
)

const CopyButton = ({
  vehicleUniqueIdentifier,
}: {
  vehicleUniqueIdentifier: string
}) => {
  const [buttonPressedClass, setButtonPressedClass] = useState('')
  const [iconClass, setIconClass] = useState('fa')

  const [showTooltip, setShowTooltip] = useState(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const hideTooltipAfterClick = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    setTimeoutId(setTimeout(() => setShowTooltip(false), 1500))
  }

  const setButtonToPressed = () => {
    setIconClass('far')
  }

  const setButtonToUnpressed = () => {
    setIconClass('fa')
  }

  return (
    <button
      aria-label="copy link to lookup"
      className="copy-button"
      data-testid="copy-button"
      onClick={() => {
        navigator.clipboard.writeText(
          `${L10N.sitewide.url}/${vehicleUniqueIdentifier}`,
        )
        setShowTooltip(true)
      }}
      onMouseDown={() => {
        setButtonToPressed()
        setButtonPressedClass('pressed')
      }}
      onMouseEnter={(e) => {
        if (e.buttons === 1) {
          setButtonToPressed()
          setButtonPressedClass('pressed')
        }
      }}
      onMouseLeave={(e) => {
        if (e.buttons === 1) {
          setButtonToUnpressed()
          setButtonPressedClass('')
        }
      }}
      onMouseUp={() => {
        setButtonToUnpressed()
        setButtonPressedClass('')
      }}
    >
      <OverlayTrigger
        offset={[0, 12]}
        onToggle={hideTooltipAfterClick}
        overlay={showTooltip ? <Tooltip>Link Copied</Tooltip> : <></>}
        show={showTooltip}
        trigger={'click'}
      >
        <span className="fa-layers fa-fw">
          <FontAwesomeIcon
            icon={[iconClass as IconPrefix, 'circle']}
            transform="grow-6"
            className={`circle ${buttonPressedClass}`}
          />
          <FontAwesomeIcon
            className={`copy ${buttonPressedClass}`}
            icon={['fas', 'copy']}
            transform="shrink-4"
          />
        </span>
      </OverlayTrigger>
    </button>
  )
}

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
  // refreshLookupFunction,
  removeLookupFunction,
  vehicle,
}: {
  refreshLookupFunction: () => void
  removeLookupFunction: () => void
  vehicle: Vehicle
}) => (
  <Card.Header>
    <div className="share-icons">
      <CopyButton vehicleUniqueIdentifier={vehicle.uniqueIdentifier} />
      <SocialShareButton.Twitter vehicle={vehicle} />
      <SocialShareButton.Bluesky vehicle={vehicle} />
    </div>
    {/* <RefreshLookupButton refreshLookupFunction={refreshLookupFunction} /> */}
    <RemoveLookupButton removeLookupFunction={removeLookupFunction} />
  </Card.Header>
)

Header.displayName = 'VehicleResults.Header'

export default Header

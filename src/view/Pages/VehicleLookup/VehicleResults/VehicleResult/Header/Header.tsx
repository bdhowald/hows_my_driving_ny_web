import React, { useContext, useState } from 'react'
import * as htmlToImage from 'html-to-image'
import { useCookies } from 'react-cookie'
import { useNavigate, useSearchParams } from 'react-router-dom'

import {
  IconDefinition,
  IconName,
  IconPrefix,
  IconProp,
  library,
} from '@fortawesome/fontawesome-svg-core'
import {
  faCamera as farCamera,
  faCircle as farCircle,
  faCircleXmark as farCircleXmark,
  faCopy as farCopy,
} from '@fortawesome/free-regular-svg-icons'
import {
  faCamera,
  faCircle,
  faCircleXmark,
  faCopy,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Card from 'react-bootstrap/Card'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import { USE_SEARCH_FILTERS_STORAGE_KEY } from 'constants/storage'
import { USER_SETTINGS_STORAGE_KEYS } from 'constants/userSettings'
import L10N from 'constants/display'
import { ApplicationContext } from 'context/ApplicationContext/ApplicationContext'
import useSettings from 'hooks/useSettings/useSettings'
import Vehicle from 'models/Vehicle/Vehicle'
import SocialShareButton from 'view/components/SocialShareButton/SocialShareButton'
// import RefreshLookupButton from 'view/VehicleResults/Header/RefreshLookupButton/RefreshLookupButton'

import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/Header/Header.css'

// Add Font Awesome icons
library.add(
  faCamera,
  farCamera as IconDefinition,
  faCircle,
  faCircleXmark,
  farCircle as IconDefinition,
  farCircleXmark as IconDefinition,
  faCopy,
  farCopy as IconDefinition,
)

const HeaderButtonWithLogo = ({
  buttonHtmlClassName,
  dataTestId,
  iconName,
  labelText,
  onClickFunction,
  tooltipOnActionText,
}: {
  buttonHtmlClassName: string
  dataTestId: string
  iconName: string
  labelText: string
  onClickFunction: () => void
  tooltipOnActionText: string
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
      aria-label={labelText}
      className={buttonHtmlClassName}
      data-testid={dataTestId}
      onClick={() => {
        onClickFunction()
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
        overlay={showTooltip ? <Tooltip>{tooltipOnActionText}</Tooltip> : <></>}
        show={showTooltip}
        trigger={'click'}
      >
        <span className="fa-layers fa-fw">
          <FontAwesomeIcon
            className={`circle ${buttonPressedClass}`}
            icon={[iconClass as IconPrefix, 'circle']}
            transform="grow-5"
          />
          <FontAwesomeIcon
            className={`logo ${buttonPressedClass}`}
            icon={['fas', iconName as IconName]}
            transform="shrink-4"
          />
        </span>
      </OverlayTrigger>
    </button>
  )
}

const CopyLinkButton = ({
  vehicleUniqueIdentifier,
}: {
  vehicleUniqueIdentifier: string
}) => {
  const { getSetting } = useSettings()
  const [cookies, _] = useCookies([USE_SEARCH_FILTERS_STORAGE_KEY])

  const applicationContext = useContext(ApplicationContext)
  const { tracker } = applicationContext

  return (
    <HeaderButtonWithLogo
      buttonHtmlClassName="header-logo-button"
      dataTestId="copy-link-button"
      iconName="copy"
      labelText="copy link to lookup"
      onClickFunction={() => {
        tracker?.trackEvent('user_copied_link_to_lookup', {
          uniqueIdentifier: vehicleUniqueIdentifier,
          useNewStyleDisplay:
            getSetting(USER_SETTINGS_STORAGE_KEYS.useNewStyleDisplay) === true,
          useSearchFilters: cookies[USE_SEARCH_FILTERS_STORAGE_KEY] === true,
        })

        navigator.clipboard.writeText(
          `${L10N.sitewide.url}/${vehicleUniqueIdentifier}`,
        )
      }}
      tooltipOnActionText="Link Copied"
    />
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

const CopyPhotoButton = ({
  bodyRef,
  vehicle,
}: {
  bodyRef: React.RefObject<HTMLUListElement>
  vehicle: Vehicle
}) => {
  const { getSetting } = useSettings()
  const [cookies, _] = useCookies([USE_SEARCH_FILTERS_STORAGE_KEY])

  const applicationContext = useContext(ApplicationContext)
  const { tracker } = applicationContext

  const onClickFunction = async () => {
    if (!bodyRef.current) {
      return
    }

    tracker?.trackEvent('user_copied_photo_and_link_to_lookup', {
      uniqueIdentifier: vehicle.uniqueIdentifier,
      useNewStyleDisplay:
        getSetting(USER_SETTINGS_STORAGE_KEYS.useNewStyleDisplay) === true,
      useSearchFilters: cookies[USE_SEARCH_FILTERS_STORAGE_KEY] === true,
    })

    const svgDataUrl = await htmlToImage.toPng(bodyRef.current, {
      filter: (node: HTMLElement) => {
        if (!node.classList) {
          return true
        }
        return !node.classList.contains(
          L10N.lookups.share.copyPhotoExcludeClass,
        )
      },
    })

    const fetched = await fetch(svgDataUrl)
    const imgBlob = await fetched.blob()

    const linkToLookup = `${L10N.sitewide.url}/${vehicle.uniqueIdentifier}`

    navigator.clipboard.write([
      new ClipboardItem({
        'image/png': imgBlob,
        'text/plain': new Blob([linkToLookup], { type: 'text/plain' }),
      }),
    ])
  }

  return (
    <HeaderButtonWithLogo
      buttonHtmlClassName="header-logo-button"
      dataTestId="copy-image-button"
      iconName="camera"
      labelText="copy image of lookup"
      onClickFunction={onClickFunction}
      tooltipOnActionText="Lookup image copied"
    />
  )
}

const Header = ({
  bodyRef,
  fromPreviousLookupUniqueIdentifier,
  // refreshLookupFunction,
  removeLookupFunction,
  vehicle,
}: {
  bodyRef: React.RefObject<HTMLUListElement>
  fromPreviousLookupUniqueIdentifier: boolean
  refreshLookupFunction: () => void
  removeLookupFunction: () => void
  vehicle: Vehicle
}) => (
  <>
    <Card.Header>
      <div className="share-icons">
        <CopyLinkButton vehicleUniqueIdentifier={vehicle.uniqueIdentifier} />
        <CopyPhotoButton bodyRef={bodyRef} vehicle={vehicle} />
        <SocialShareButton.Twitter vehicle={vehicle} />
        <SocialShareButton.Bluesky vehicle={vehicle} />
      </div>
      {/* <RefreshLookupButton refreshLookupFunction={refreshLookupFunction} /> */}
      {!fromPreviousLookupUniqueIdentifier && (
        <RemoveLookupButton removeLookupFunction={removeLookupFunction} />
      )}
    </Card.Header>
    {fromPreviousLookupUniqueIdentifier && <PreviousLookupSubheader />}
  </>
)

const PreviousLookupSubheader = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  return (
    <div className="card-subheader">
      <ul className="list-group list-group-flush card-subheader from-previous-lookup">
        <li className="list-group-item">
          <div>Shared via link</div>
          <RemoveLookupButton
            removeLookupFunction={() =>
              navigate(`/?${searchParams.toString()}`)
            }
          />
        </li>
      </ul>
    </div>
  )
}

Header.displayName = 'VehicleResults.Header'

export default Header

import React, { useState } from 'react'

import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import TwitterShare from 'components/TwitterShare'
import L10N from 'constants/display'
import { Vehicle } from 'utils/types/responses'

const Header = ({
  removeLookupFn, vehicle
}: {
  removeLookupFn: () => void, vehicle: Vehicle
}) => {
  const CopyButton = () => {
    const [buttonPressedClass, setButtonPressedClass] = useState('')

    return (
      <button
        aria-label='copy link to lookup'
        className='copy-button'
        onClick={() => {
          navigator.clipboard.writeText(`${L10N.sitewide.url}/${vehicle.uniqueIdentifier}`)
          setButtonPressedClass('')
        }}
        onMouseDown={() => setButtonPressedClass('pressed')}
        onMouseOut={() => {
          setButtonPressedClass('')
        }}
      >
        <span className="fa-layers fa-fw">
          <FontAwesomeIcon icon='circle' transform="grow-6" className={`circle ${buttonPressedClass}`}/>
          <FontAwesomeIcon icon='copy' transform='shrink-4' className='copy' />
        </span>
      </button>
    )
  }

  const RemoveLookupButton = () => {
    const [buttonPressedClass, setButtonPressedClass] = useState('')

    return (
      <button
        aria-label='remove lookup'
        className='remove-lookup-button'
        onClick={() => {
          removeLookupFn()
          setButtonPressedClass('')
        }}
        onMouseDown={() => setButtonPressedClass('pressed')}
        onMouseOut={() => {
          setButtonPressedClass('')
        }}
      >
        <FontAwesomeIcon
          className={`circle ${buttonPressedClass}`}
          icon='times-circle'
          transform="grow-6"
        />
      </button>
    )
  }

  return (
    <Card.Header>
      <div className='share-icons'>
        <CopyButton />
        <TwitterShare vehicle={vehicle}/>
      </div>
      <RemoveLookupButton />
    </Card.Header>
  )
}

Header.displayName = 'VehicleResults.Header'

export default Header
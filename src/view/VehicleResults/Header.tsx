import React, { useState } from 'react'

import Card from 'react-bootstrap/Card'
import Toast from 'react-bootstrap/Toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import TwitterShare from 'components/TwitterShare'
import L10N from 'constants/display'
import { Vehicle } from 'utils/types/responses'


const CopyButton = (
  { setShowCopyToast, vehicleUniqueIdentifier }: { setShowCopyToast: (arg0: boolean) => void, vehicleUniqueIdentifier: string }
) => {
  const [buttonPressedClass, setButtonPressedClass] = useState('')

  return (
    <button
      aria-label='copy link to lookup'
      className='copy-button'
      onClick={() => {
        navigator.clipboard.writeText(`${L10N.sitewide.url}/${vehicleUniqueIdentifier}`)
        setButtonPressedClass('')
        setShowCopyToast(true)
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

const CopyToast = React.memo((
  { setShowCopyToast, showCopyToast }: { setShowCopyToast: (arg0: boolean) => void, showCopyToast: boolean }
) => (
  <div className='toast-container'>
    <Toast
      autohide
      className='primary'
      delay={3000}
      onClose={() => setShowCopyToast(false)}
      show={showCopyToast}
    >
      <Toast.Body>Link copied</Toast.Body>
    </Toast>
  </div>
))
CopyToast.displayName = 'CopyToast'

const RemoveLookupButton = ({ removeLookupFn }: { removeLookupFn: () => void}) => {
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

const Header = ({
  removeLookupFn, vehicle
}: {
  removeLookupFn: () => void, vehicle: Vehicle
}) => {
  const [showCopyToast, setShowCopyToast] = useState(false);

  return (
    <Card.Header>
      <div className='share-icons'>
        <CopyToast
          setShowCopyToast={setShowCopyToast}
          showCopyToast={showCopyToast}
        />
        <CopyButton
          setShowCopyToast={setShowCopyToast}
          vehicleUniqueIdentifier={vehicle.uniqueIdentifier}
        />
        <TwitterShare vehicle={vehicle}/>
      </div>
      <RemoveLookupButton removeLookupFn={removeLookupFn}/>
    </Card.Header>
  )
}

Header.displayName = 'VehicleResults.Header'

export default Header
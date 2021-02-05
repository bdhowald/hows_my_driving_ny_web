import React from 'react'

import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import TwitterShare from 'components/TwitterShare'
import L10N from 'constants/display'
import plateTypes from 'constants/plateTypes'
import { Vehicle } from 'utils/types/responses'

export default ({vehicle}: {vehicle: Vehicle}) => {

  const getCardHeader = (vehicle: Vehicle) => {
    let plateCategory: string | undefined = undefined
    Object.entries(plateTypes).forEach(([_, type]) => {
      if (vehicle.plateTypes?.sort().toString() === type.codes?.sort().toString()) {
        plateCategory = type.displayName
      }
    })
    const plateTypesString: string | undefined = vehicle.plateTypes ? `(${plateCategory})` : ''
    return `${vehicle.state}:${vehicle.plate} ${plateTypesString}`
  }

  return (
    <Card.Header>
      {getCardHeader(vehicle)}
      <div className='share-icons'>
        <button
          className='copy-button'
          onClick={() => {
            navigator.clipboard.writeText(`${L10N.sitewide.url}/${vehicle.uniqueIdentifier}`)
          }}>
          <span className="fa-layers fa-fw">
            <FontAwesomeIcon icon='circle' transform="grow-6" className='circle'/>
            <FontAwesomeIcon icon='copy' transform='shrink-4' className='copy' />
          </span>
        </button>
        <TwitterShare vehicle={vehicle}/>
      </div>
    </Card.Header>
  )
}

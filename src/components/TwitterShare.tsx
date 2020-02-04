import React from 'react'

import { TwitterShareButton, TwitterIcon } from 'react-share'

import L10N from 'constants/display'
import { Vehicle } from 'utils/types/responses'

export default ({ vehicle }: { vehicle: Vehicle }) => {
  const vehicleHashtag = `${vehicle.state}_${vehicle.plate}`
  const violationsString = `${vehicle.violationsCount} violation${vehicle.violationsCount === 1 ? '' : 's'}`

  return (
    <TwitterShareButton
      url={L10N.sitewide.url}
      title={`I just looked up #${vehicleHashtag}'s ${violationsString} using @HowsMyDrivingNY: `}
      className="Demo__some-network__share-button"
    >
      <TwitterIcon
        size={32}
        round={true} 
        crossOrigin=""
      />
    </TwitterShareButton>
  )
}
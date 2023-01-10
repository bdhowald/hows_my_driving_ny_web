import React from 'react'

import { TwitterShareButton, TwitterIcon } from 'react-share'

import L10N from 'constants/display'
import { Vehicle } from 'utils/types/responses'

const TwitterShare = ({ vehicle }: { vehicle: Vehicle }) => {
  const vehicleHashtag = `${vehicle.state}_${vehicle.plate}`
  const violationsString = `${vehicle.violationsCount} violation${vehicle.violationsCount === 1 ? '' : 's'}`

  return (
    <TwitterShareButton
      url={`${L10N.sitewide.url}/${vehicle.uniqueIdentifier}`}
      title={`I just looked up #${vehicleHashtag}'s ${violationsString} using @HowsMyDrivingNY: `}
      className="twitter-share-button"
      resetButtonStyle={false}
    >
      <TwitterIcon
        crossOrigin=""
        round
        size={32}
      />
    </TwitterShareButton>
  )
}

TwitterShare.displayName = 'TwitterShare'

export default TwitterShare
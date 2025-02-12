import React from 'react'
import SocialMediaService from 'constants/socialMedia'

import {
  BlueskyIcon,
  BlueskyShareButton,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share'

import L10N from 'constants/display'
import Vehicle from 'models/Vehicle/Vehicle'

const components = {
  [SocialMediaService.Bluesky]: {
    accountHandle: '@howsmydrivingny.bsky.social',
    htmlElementName: 'bluesky-share-button',
    icon: BlueskyIcon,
    serviceName: 'Bluesky',
    shareButton: BlueskyShareButton,
  },
  [SocialMediaService.Twitter]: {
    accountHandle: '@HowsMyDrivingNY',
    htmlElementName: 'twitter-share-button',
    icon: TwitterIcon,
    serviceName: 'Twitter',
    shareButton: TwitterShareButton,
  },
}

const ShareButton = ({
  socialMediaService,
  vehicle,
}: {
  socialMediaService: SocialMediaService
  vehicle: Vehicle
}) => {
  const vehicleHashtag = `${vehicle.state}_${vehicle.plate}`
  const violationsString = `${vehicle.violationsCount} violation${vehicle.violationsCount === 1 ? '' : 's'}`

  const IconClass = components[socialMediaService].icon
  const ShareButtonClass = components[socialMediaService].shareButton

  const serviceName = components[socialMediaService].serviceName
  const elementName = components[socialMediaService].htmlElementName

  const accountHandle = components[socialMediaService].accountHandle

  return (
    <ShareButtonClass
      aria-label={`share lookup to ${serviceName}`}
      data-testid={elementName}
      url={`${L10N.sitewide.url}/${vehicle.uniqueIdentifier}`}
      title={`I just looked up #${vehicleHashtag}'s ${violationsString} using ${accountHandle}: `}
      className={elementName}
      resetButtonStyle={false}
    >
      <IconClass crossOrigin="" round size={32} />
    </ShareButtonClass>
  )
}

const BlueskySocialShareButton = ({ vehicle }: { vehicle: Vehicle }) => {
  return (
    <ShareButton
      socialMediaService={SocialMediaService.Bluesky}
      vehicle={vehicle}
    />
  )
}
BlueskySocialShareButton.displayName = 'BlueskyShareButton'

const TwitterSocialShareButton = ({ vehicle }: { vehicle: Vehicle }) => {
  return (
    <ShareButton
      socialMediaService={SocialMediaService.Twitter}
      vehicle={vehicle}
    />
  )
}
TwitterSocialShareButton.displayName = 'TwitterShareButton'

export default {
  Bluesky: BlueskySocialShareButton,
  Twitter: TwitterSocialShareButton,
}

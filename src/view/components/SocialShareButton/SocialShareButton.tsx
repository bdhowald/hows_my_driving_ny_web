import React, { useContext } from 'react'
import { useCookies } from 'react-cookie'
import {
  BlueskyIcon,
  BlueskyShareButton,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share'

import {
  USE_NEW_STYLE_DISPLAY_STORAGE_KEY,
  USE_SEARCH_FILTERS_STORAGE_KEY,
} from 'constants/storage'
import L10N from 'constants/display'
import SocialMediaService from 'constants/socialMedia'
import { ApplicationContext } from 'context/ApplicationContext/ApplicationContext'
import useSettings from 'hooks/useSettings/useSettings'
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
  const [cookies, _] = useCookies([USE_SEARCH_FILTERS_STORAGE_KEY])

  const vehicleHashtag = `${vehicle.state}_${vehicle.plate}`
  const violationsString = `${vehicle.violationsCount} violation${vehicle.violationsCount === 1 ? '' : 's'}`

  const IconClass = components[socialMediaService].icon
  const ShareButtonClass = components[socialMediaService].shareButton

  const serviceName = components[socialMediaService].serviceName
  const elementName = components[socialMediaService].htmlElementName

  const accountHandle = components[socialMediaService].accountHandle

  const applicationContext = useContext(ApplicationContext)
  const { tracker } = applicationContext

  const { getSetting } = useSettings()

  return (
    <ShareButtonClass
      aria-label={`share lookup to ${serviceName}`}
      data-testid={elementName}
      onClick={() => {
        tracker?.trackEvent('user_shared_lookup_to_social_media', {
          socialMediaService: serviceName,
          uniqueIdentifier: vehicle.uniqueIdentifier,
          useNewStyleDisplay:
            getSetting(USE_NEW_STYLE_DISPLAY_STORAGE_KEY) === true,
          useSearchFilters: cookies[USE_SEARCH_FILTERS_STORAGE_KEY] === true,
        })
      }}
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

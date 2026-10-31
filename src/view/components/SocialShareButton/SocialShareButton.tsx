import { useContext } from 'react'
import {
  BlueskyIcon,
  BlueskyShareButton,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share'
import { RedditIcon, RedditShareButton } from 'react-share-v5.1.0'

import L10N from 'constants/display'
import SocialMediaService from 'constants/socialMedia'
import { USER_SETTINGS_STORAGE_KEYS } from 'constants/userSettings'
import { ApplicationContext } from 'context/ApplicationContext/ApplicationContext'
import useSearchFiltersHook from 'hooks/useSearchFilters/useSearchFilters'
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
  [SocialMediaService.Reddit]: {
    accountHandle: 'u/HowsMyDrivingNY',
    htmlElementName: 'reddit-share-button',
    icon: RedditIcon,
    serviceName: 'Reddit',
    shareButton: RedditShareButton,
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

  const applicationContext = useContext(ApplicationContext)
  const { tracker } = applicationContext

  const { searchFiltersState } = useSearchFiltersHook()
  const useSearchFiltersCookieRawValue = searchFiltersState()
  const useSearchFilters = useSearchFiltersCookieRawValue === true

  const { getSetting } = useSettings()

  return (
    <ShareButtonClass
      aria-label={`share lookup to ${serviceName}`}
      className={`${elementName} share-button`}
      data-testid={elementName}
      onClick={() => {
        tracker?.trackEvent('user_shared_lookup_to_social_media', {
          socialMediaService: serviceName,
          uniqueIdentifier: vehicle.uniqueIdentifier,
          useNewStyleDisplay:
            getSetting(USER_SETTINGS_STORAGE_KEYS.useNewStyleDisplay) === true,
          useSearchFilters,
        })
      }}
      resetButtonStyle={false}
      title={`I just looked up #${vehicleHashtag}'s ${violationsString} using ${accountHandle}: `}
      url={`${L10N.sitewide.url}/${vehicle.uniqueIdentifier}`}
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

const RedditSocialShareButton = ({ vehicle }: { vehicle: Vehicle }) => {
  return (
    <ShareButton
      socialMediaService={SocialMediaService.Reddit}
      vehicle={vehicle}
    />
  )
}
RedditSocialShareButton.displayName = 'RedditShareButton'

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
  Reddit: RedditSocialShareButton,
  Twitter: TwitterSocialShareButton,
}

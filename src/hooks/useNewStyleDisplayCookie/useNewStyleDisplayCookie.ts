import { useCookies } from 'react-cookie'

import {
  COOKIE_DEFAULT_PATH,
  COOKIE_MAX_AGE,
  USE_NEW_STYLE_DISPLAY_STORAGE_KEY,
} from 'constants/storage'

const useNewStyleDisplayCookie = () => {
  const [cookies, setCookie, _] = useCookies([
    USE_NEW_STYLE_DISPLAY_STORAGE_KEY,
  ])

  const newStyleDisplayActive = () => {
    const useNewStyleDisplayCookiePresent =
      cookies[USE_NEW_STYLE_DISPLAY_STORAGE_KEY] !== null &&
      cookies[USE_NEW_STYLE_DISPLAY_STORAGE_KEY] !== undefined

    if (!useNewStyleDisplayCookiePresent) {
      setNewStyleDisplayCookie()
    }

    const queryParameters = new URLSearchParams(document.location.search)
    const useNewStyleDisplay =
      cookies[USE_NEW_STYLE_DISPLAY_STORAGE_KEY] === true

    const queryParamFeatureFlagEnabled =
      queryParameters.get(USE_NEW_STYLE_DISPLAY_STORAGE_KEY) === 'true'

    const queryParamFeatureFlagDisabled =
      queryParameters.get(USE_NEW_STYLE_DISPLAY_STORAGE_KEY) === 'false'

    if (queryParamFeatureFlagDisabled) {
      return false
    }
    if (queryParamFeatureFlagEnabled || useNewStyleDisplay) {
      return true
    }
    return false
  }

  const setNewStyleDisplayCookie = () => {
    const queryParameters = new URLSearchParams(document.location.search)

    const useNewStyleDisplay =
      cookies[USE_NEW_STYLE_DISPLAY_STORAGE_KEY] === true

    const useNewStyleDisplayCookiePresent =
      cookies[USE_NEW_STYLE_DISPLAY_STORAGE_KEY] !== null &&
      cookies[USE_NEW_STYLE_DISPLAY_STORAGE_KEY] !== undefined

    const queryParamFeatureFlagEnabled =
      queryParameters.get(USE_NEW_STYLE_DISPLAY_STORAGE_KEY) === 'true'

    const queryParamFeatureFlagDisabled =
      queryParameters.get(USE_NEW_STYLE_DISPLAY_STORAGE_KEY) === 'false'

    if (
      !useNewStyleDisplayCookiePresent ||
      !useNewStyleDisplay ||
      queryParamFeatureFlagEnabled ||
      queryParamFeatureFlagDisabled
    ) {
      // 25% of sessions are in experimental group
      // 25% of sessions are in control group
      // 50% of sessions are available for progressive rollout
      const randomVariable = Math.random()

      const inExperimentalGroup =
        randomVariable * 10 > 7.5 || queryParamFeatureFlagEnabled
      const inControlGroup =
        (randomVariable * 10 <= 2.5 && !queryParamFeatureFlagEnabled) ||
        queryParamFeatureFlagDisabled

      const inReserveGroup = !inControlGroup && !inExperimentalGroup

      if (inExperimentalGroup) {
        setCookie(USE_NEW_STYLE_DISPLAY_STORAGE_KEY, 'true', {
          maxAge: COOKIE_MAX_AGE,
          path: COOKIE_DEFAULT_PATH,
        })
      }

      if (inControlGroup) {
        setCookie(USE_NEW_STYLE_DISPLAY_STORAGE_KEY, 'false', {
          maxAge: COOKIE_MAX_AGE,
          path: COOKIE_DEFAULT_PATH,
        })
      }

      if (inReserveGroup) {
        setCookie(USE_NEW_STYLE_DISPLAY_STORAGE_KEY, 'none', {
          maxAge: COOKIE_MAX_AGE,
          path: COOKIE_DEFAULT_PATH,
        })
      }
    }
  }

  return {
    newStyleDisplayActive,
  }
}

export default useNewStyleDisplayCookie

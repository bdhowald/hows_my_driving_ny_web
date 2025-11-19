import { useCookies } from 'react-cookie'

import {
  DEFAULT_COOKIE_PATH,
  MAX_AGE,
  USE_NEW_STYLE_DISPLAY_COOKIE,
} from 'constants/cookies'

const useNewStyleDisplayCookie = () => {
  const [cookies, setCookie, _] = useCookies([USE_NEW_STYLE_DISPLAY_COOKIE])

  const newStyleDisplayActive = () => {
    const useNewStyleDisplayCookiePresent =
      cookies[USE_NEW_STYLE_DISPLAY_COOKIE] !== null &&
      cookies[USE_NEW_STYLE_DISPLAY_COOKIE] !== undefined

    if (!useNewStyleDisplayCookiePresent) {
      setNewStyleDisplayCookie()
    }

    const queryParameters = new URLSearchParams(document.location.search)
    const useNewStyleDisplay = cookies[USE_NEW_STYLE_DISPLAY_COOKIE] === true

    const queryParamFeatureFlagEnabled =
      queryParameters.get(USE_NEW_STYLE_DISPLAY_COOKIE) === 'true'

    const queryParamFeatureFlagDisabled =
      queryParameters.get(USE_NEW_STYLE_DISPLAY_COOKIE) === 'false'

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

    const useNewStyleDisplay = cookies[USE_NEW_STYLE_DISPLAY_COOKIE] === true

    const useNewStyleDisplayCookiePresent =
      cookies[USE_NEW_STYLE_DISPLAY_COOKIE] !== null &&
      cookies[USE_NEW_STYLE_DISPLAY_COOKIE] !== undefined

    const queryParamFeatureFlagEnabled =
      queryParameters.get(USE_NEW_STYLE_DISPLAY_COOKIE) === 'true'

    const queryParamFeatureFlagDisabled =
      queryParameters.get(USE_NEW_STYLE_DISPLAY_COOKIE) === 'false'

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
        setCookie(USE_NEW_STYLE_DISPLAY_COOKIE, 'true', {
          maxAge: MAX_AGE,
          path: DEFAULT_COOKIE_PATH,
        })
      }

      if (inControlGroup) {
        setCookie(USE_NEW_STYLE_DISPLAY_COOKIE, 'false', {
          maxAge: MAX_AGE,
          path: DEFAULT_COOKIE_PATH,
        })
      }

      if (inReserveGroup) {
        setCookie(USE_NEW_STYLE_DISPLAY_COOKIE, 'none', {
          maxAge: MAX_AGE,
          path: DEFAULT_COOKIE_PATH,
        })
      }
    }
  }

  return {
    newStyleDisplayActive,
  }
}

export default useNewStyleDisplayCookie
